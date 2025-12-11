import Game from "./Game";
import WebSocket from "ws";
import User from "./User";
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
  PLAYER_LEFT,
  PLAYERS_SCORE,
  QUESTION_SENT,
  QUIZ_READY,
} from "./events";
export default class GameManager {
  games: Map<string, Game>;
  users: Map<string, User>;

  constructor() {
    this.users = new Map();
    this.games = new Map();
  }

  // Overload
  addPlayer(type: "host", name: string, ws: WebSocket, themeId: string): void;
  addPlayer(type: "player", name: string, ws: WebSocket, game: Game): void;

  // add host or player
  addPlayer(
    type: "host" | "player",
    name: string,
    ws: WebSocket,
    themeIdOrGame: string | Game
  ) {
    // do something
    // create new user (if user is host)
    if (type === "host" && typeof themeIdOrGame === "string") {
      const themeId = themeIdOrGame;
      const user = new User(ws, name, type); // create new user
      this.users.set(user.id, user); // store in global gameManager users property
      // initialize new game
      const game = new Game(user, themeId); // start a new game
      this.games.set(game.gameId, game); // store game in global gameManager games property
      //  console .log("host user :", user);
      //   console.log("host game : ", game);
      ws.send(
        sendJson(GAME_PIN, "Host has been successfully created", {
          userId: user.id,
          gamePin: game.gameId,
        })
      );
      // console.log("host end point");
    }
    //create new user (if user is player)
    if (type === "player" && themeIdOrGame instanceof Game) {
      const game = themeIdOrGame;
      const user = new User(ws, name, type);
      this.users.set(user.id, user);
      // add player to game object
      game.addPlayer(user);
      // console.log("player user :", user);
      // console.log("player game : ", game);
    }
  }

  // check if that gameId exist or not
  checkGameId(id: string) {
    const game = this.games.get(id);
    if (game) return game;
  }

  // check  if user exist or not
  checkUserId(id: string) {
    const user = this.users.get(id);
    if (user) return user;
  }

  //write function to  handle server messages
  handleMessage(ws: WebSocket, data: string) {
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
        const data = sendJson(QUIZ_READY, "quizz is ready");
        game.broadcasting(data);
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
      console.log("store into send-response event");
      const user = this.checkUserId(parsedMessage.data.userId);
      const game = this.checkGameId(parsedMessage.data.gameId);
      if (user && game && game.quizData && user.score !== undefined) {
        console.log("store into send-response condition");
        // find question by questionId
        const validQuestion = findQuestion(
          game.quizData,
          parsedMessage.data.questionId
        );
        console.log(
          "valid question data on send-response event : ",
          validQuestion
        );
        // if questionId is valid
        if (validQuestion) {
          //check answer
          const findIndex = validQuestion.options.findIndex(
            (q) => q.text === parsedMessage.data.selectOption
          );
          console.log(
            "valid question selected optio object on send-response event : ",
            validQuestion.options[findIndex]
          );
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
            console.log(
              "players data after sending updated score to everyone : ",
              players
            );
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
          const data = sendJson(HOST_LEFT, "Game host left the game");
          game.broadcasting(data); // broadcast this message to everyone
          // remove that game from gameManager
          this.games.delete(game.gameId);
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
}
