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
  addPlayer(type: "host" | "player", name: string, ws: WebSocket) {
    // do something
    // create new user (if user is host)
    if (type === "host") {
      const user = new User(ws, name, type); // create new user
      this.users.set(user.id, user); // store in global gameManager users property
      // initialize new game
      const game = new Game(user); // start a new game
      this.games.set(game.gameId, game); // store game in global gameManager games property
    }
    //create new user (if user is player)
    if (type === "player") {
    }
    // add player to that game
    // if server got message from client
    ws.on("message", (data) => {
      this.handleMessage(ws, data.toString());
    });
  }

  private handleMessage(ws: WebSocket, data: string) {
    const parsedMessage = JSON.parse(data); // parsed the client message
  }
}
