import Game from "./Game";
import WebSocket from "ws";
import User from "./User";
export default class GameManager {
  games: Map<string, Game>;
  users: Map<string, User>;

  constructor() {
    this.users = new Map();
    this.games = new Map();
  }

  // add host or player
  addPlayer(type: "host" | "player", name: string, ws: WebSocket, game?: Game) {
    // do something
    // create new user (if user is host)
    if (type === "host") {
      const user = new User(ws, name, type); // create new user
      this.users.set(user.id, user); // store in global gameManager users property
      // initialize new game
      const game = new Game(user); // start a new game
      this.games.set(game.gameId, game); // store game in global gameManager games property
      console.log("host user :", user);
      console.log("host game : ", game);
    }
    //create new user (if user is player)
    if (type === "player" && game) {
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

  //write function to  handle server messages
  handleMessage(ws: WebSocket, data: string) {
    const parsedMessage = JSON.parse(data); // parsed the client message
  }
}
