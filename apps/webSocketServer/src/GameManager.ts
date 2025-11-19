import Game from "./Game";
import WebSocket from "ws";
import User from "./User";
import { addIdToQuestion, sendJson, simplifyPlayer } from "./utils/helperFn";
import { GAME_PIN, QUESTION_SENT, QUIZ_READY } from "./events";
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
      console.log("host user :", user);
      console.log("host game : ", game);
      ws.send(
        sendJson(GAME_PIN, "Host has been successfully created", {
          userId: user.id,
          gamePin: game.gameId,
        })
      );
      console.log("host end point");
    }
    //create new user (if user is player)
    if (type === "player" && themeIdOrGame instanceof Game) {
      const game = themeIdOrGame;
      const user = new User(ws, name, type);
      this.users.set(user.id, user);
      // add player to game object
      game.addPlayer(user);
      console.log("player user :", user);
      console.log("player game : ", game);
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
      console.log(user);
      console.log(game);
      // if quiz data sended by host
      if (game && user && game.host.id === user.id) {
        // store quiz data into game
        console.log("quiz data from client side : ", parsedMessage.data.quiz);
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
        // if user and game is valid then send first question to all players and host also
        if (game.quizData && game.currentQuestionIndex) {
          const question = game.quizData.questions[game.currentQuestionIndex];
          // if that questionIndex exist in quizData.questions
          if (question) {
            const data = sendJson(
              QUESTION_SENT,
              `here is your ${game.currentQuestionIndex} question`,
              { question: question, players: simplifyPlayer(game.players) }
            );
            game.broadcasting(data);
            game.currentQuestionIndex += 1;
          }
        }
      }
    }
  }
}
