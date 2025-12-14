import Game from "./Game"; // import Game class
import WebSocket from "ws"; // import WebSocket library
import User from "./User"; // import User class
import {
  addIdToQuestion,
  findQuestion,
  sendJson,
  sendNextQuestion,
  simplifyPlayer,
} from "./utils/helperFn";
import {
  ANSWER_CHECKED,
  GAME_PIN,
  HOST_LEFT,
  HOST_RECONNECT_FAILED,
  PLAYER_LEFT,
  PLAYERS_SCORE,
  QUIZ_READY,
  RECONNECT_HOST,
  RECONNECT_MSG,
  RECONNECT_PLAYER,
} from "./events"; // import events types
import { createHostedQuizEntry } from "./models/game";

// GameManager class to manage all games and users
export default class GameManager {
  games: Map<string, Game>; // games map to store all active games
  users: Map<string, User>; // users map to store all connected users

  // write constructor to initialize the games and users map
  constructor() {
    this.users = new Map();
    this.games = new Map();
  }

  // add host in game
  addHost(
    type: "host",
    hostId: string,
    name: string,
    ws: WebSocket,
    themeId: string
  ) {
    // do something
    // create new user (if user is host)
    if (type === "host" && typeof themeId === "string") {
      const user = new User(ws, name, type, hostId); // create new user
      this.users.set(user.id, user); // store in global gameManager users property
      // initialize new game
      const game = new Game(user, themeId); // start a new game
      this.games.set(game.gameId, game); // store game in global gameManager games property
      //  console .log("host user :", user);
      //   console.log("host game : ", game);
      ws.send(
        sendJson(GAME_PIN, "Host has been successfully created", {
          userId: user.id,
          role: user.type,
          gamePin: game.gameId,
          gameStatus: game.gameStatus,
          tik_tik: game.tik_tik,
          fullName: user.fullName,
        })
      );
      // console.log("host end point");
    }
  }

  // add player in game
  addPlayer(type: "player", name: string, ws: WebSocket, game: Game) {
    //create new user (if user is player)
    if (type === "player" && game instanceof Game) {
      const user = new User(ws, name, type);
      console.log("new player data : ", user.fullName);
      this.users.set(user.id, user);
      // console.log("player user :", user);
      // add player to game object
      game.addPlayer(user);
      // console.log("player game : ", game);
    }
  }

  // check if that gameId exist or not if yes then return Game object
  checkGameId(id: string) {
    const game = this.games.get(id);
    if (game) return game;
  }

  // check  if user exist or not if exist then return User object
  checkUserId(id: string) {
    const user = this.users.get(id);
    if (user) return user;
  }

  //write function to  handle server messages (if client send message)
  async handleMessage(ws: WebSocket, data: string) {
    const parsedMessage = JSON.parse(data); // parsed the client message
    console.log("parsed message from client side : ", parsedMessage);

    //host client send quiz data to server
    if (parsedMessage.type === "send-quiz") {
      const user = this.users.get(parsedMessage.data.userId);
      const game = this.games.get(parsedMessage.data.gameId);
      // console.log(user);
      // console.log(game);
      // if quiz data sended by host
      if (game && user && game.host.id === user.id) {
        // store quiz data into game
        // console.log("quiz data from client side : ", parsedMessage.data.quiz);
        game.quizData = addIdToQuestion(parsedMessage.data.quiz);
        game.gameStatus = "ready";
        const data = sendJson(QUIZ_READY, "quizz is ready", {
          gameStatus: game.gameStatus,
        });
        game.broadcasting(data);

        // call the database and save hostedQuiz data in hostedQuizzes table
        const result = await createHostedQuizEntry({
          quiz_id: parsedMessage.data.quiz.id,
          hostId: user.id,
        });
        if (result) {
          game.hostedQuizId = result.id;
        }
        // console.log("result after performing query ", result);
      }
    }

    // host client send event to start the quiz
    if (parsedMessage.type === "start-game") {
      const user = this.checkUserId(parsedMessage.data.userId);
      const game = this.checkGameId(parsedMessage.data.gameId);
      if (user && game) {
        // console.log("quiz data on start-game event : ", game.quizData);
        // console.log(
        //   "quiz index on start-game event : ",
        //   game.currentQuestionIndex
        // );
        sendNextQuestion(game);
      }
    }

    // if player client send selected answer to websocket server
    if (parsedMessage.type === "send-response") {
      // do something
      // console.log("store into send-response event");
      const user = this.checkUserId(parsedMessage.data.userId);
      const game = this.checkGameId(parsedMessage.data.gameId);
      if (user && game && game.quizData && user.score !== undefined) {
        // console.log("store into send-response condition");
        // find question by questionId
        const validQuestion = findQuestion(
          game.quizData,
          parsedMessage.data.questionId
        );
        // console.log(
        //   "valid question data on send-response event : ",
        //   validQuestion
        // );
        // if questionId is valid
        if (validQuestion) {
          //check answer
          const findIndex = validQuestion.options.findIndex(
            (q) => q.text === parsedMessage.data.selectOption
          );
          // console.log(
          //   "valid question selected optio object on send-response event : ",
          //   validQuestion.options[findIndex]
          // );
          // if selected option is correct then add score to that player
          if (validQuestion.options[findIndex]?.isCorrect) {
            user.score += validQuestion.points; //  add points to that player score
            // now send the message to that user to notify wheather he choose correct option or not
            user.socket.send(
              JSON.stringify({
                type: ANSWER_CHECKED,
                data: {
                  selectedOption: true,
                },
                message: "here is your selected option status",
              })
            );
            // and send updated score of all players to everyone
            const players = simplifyPlayer(game.players);
            // console.log(
            //   "players data after sending updated score to everyone : ",
            //   players
            // );
            const data = sendJson(
              PLAYERS_SCORE,
              "here are the updated score of all players",
              { players: players }
            );
            game.broadcasting(data);
          } else if (!validQuestion.options[findIndex]?.isCorrect) {
            // if selected option is wrong
            user.socket.send(
              JSON.stringify({
                type: ANSWER_CHECKED,
                data: {
                  selectedOption: false,
                },
                message: "here is your selected option status",
              })
            );
          }
        }
      }
    }
  }

  // write function to remove the player
  removePlayer(ws: WebSocket) {
    let user: User | null = null;

    // find that user
    for (const value of this.users.values()) {
      if (value.socket === ws) {
        user = value;
        break;
      }
    }

    if (user !== null) {
      for (const game of this.games.values()) {
        // if left user is host
        if (game.host.socket === user.socket) {
          game.hostDisconnected = true;
          const data = sendJson(
            HOST_LEFT,
            "Host left the game. Waiting for host to reconnect..."
          );
          game.broadcasting(data); // broadcast this message to everyone
          // set timeout to delete game after 15 seconds if host doesn't reconnect
          game.hostReconnectTimeout = setTimeout(() => {
            if (game.hostDisconnected) {
              const data = sendJson(
                HOST_RECONNECT_FAILED,
                "Host left the game."
              );
              game.broadcasting(data); // broadcast this message to everyone
              this.games.delete(game.gameId);
            }
          }, 15000);
        } else if (game.players.get(user.id)) {
          // if left user is player
          const player = game.players.get(user.id);
          if (player) {
            const data = sendJson(
              PLAYER_LEFT,
              `Player ${player.fullName} left the game`
            );
            game.broadcasting(data); // broadcast this to all game players and host
          }
        }
      }
    }
  }

  // player try to reconnect with server
  reConnectPlayer(
    roomId: string,
    fullName: string,
    userId: string,
    socket: WebSocket
  ) {
    const game = this.checkGameId(roomId);
    console.log("game data : ", game);
    const user = this.checkUserId(userId);
    // console.log("user data : ", user);
    if (game && user) {
      // first check that user is present in that game or not
      const player = game.players.get(user.id);
      // console.log("player data : ", player);
      // if user provide correct game id and present in players data
      if (player) {
        // change user socket instance
        player.socket = socket; // change the socket
        const data = sendJson(
          RECONNECT_PLAYER,
          "Here you have current status of game",
          {
            id: player.id,
            role: player.type,
            fullName: player.fullName,
            gameId: game.gameId,
            themeId: game.themeId,
            playerJoined: simplifyPlayer(game.players),
            tik_tik: game.tik_tik,
            gameStatus: game.gameStatus,
          }
        );
        console.log("data send to player ; ", data);
        player.socket.send(data);
        const msg = sendJson(
          RECONNECT_MSG,
          `${player.fullName} reconnect to the game`
        );
        game.broadcasting(msg);
      }
      // then create json object with current status
      // fire the reconnect event
    }
  }

  // host try to reconnect with server
  reConnectHost(
    type: "host",
    roomId: string,
    fullName: string,
    userId: string,
    socket: WebSocket
  ) {
    const game = this.games.get(roomId);
    const user = this.users.get(userId);

    console.log("game check : ", game?.gameId);
    console.log("user check : ", user?.type, "and", user?.fullName);
    // if game is valid
    // if user is valid
    // if given type match with User type
    // check socket instance
    // check fullName
    if (game && user && user.type === type && user.fullName === fullName) {
      if (game.host.id === user.id) {
        // clear the reconnect timeout since host is back
        if (game.hostReconnectTimeout) {
          clearTimeout(game.hostReconnectTimeout);
          game.hostReconnectTimeout = null;
        }
        game.hostDisconnected = false;
        user.socket = socket; // replace with new socket
        const data = sendJson(RECONNECT_HOST, "host joined the game", {
          id: user.id,
          role: user.type,
          fullName: user.fullName,
          gameId: game.gameId,
          themeId: game.themeId,
          player_joined: simplifyPlayer(game.players),
          tik_tik: game.tik_tik,
          gameStatus: game.gameStatus,
        });
        user.socket.send(data);
        console.log("data sent to host on reconnect : ", data);
        // now broadcast the reconnect msg to everyone
        const msg = sendJson(
          RECONNECT_MSG,
          `Host ${user.fullName} reconnect to the game`
        );
        game.broadcasting(msg);
      }
    }
  }
}
