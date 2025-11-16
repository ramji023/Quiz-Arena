import User from "./User";
import { v4 as uuidv4 } from "uuid";
import { ERROR } from "./events";
import { sendJson } from "./utils/helperFn";
export default class Game {
  gameId: string;
  host: User;
  quizData: any;
  countDown: string;
  players: Map<string, User>;

  //when host initialize a game
  constructor(host: User) {
    this.gameId = uuidv4();
    this.host = host;
    this.quizData = {};
    this.countDown = "05";
    this.players = new Map();
  }

  // add player in Game object
  addPlayer(player: User) {
    //first check if user is already join the game or not
    const existedPlayer = this.players.get(player.id);
    if (existedPlayer) {
      existedPlayer.socket.send(
        sendJson(ERROR, "You already joined this game")
      ); // if player is already join the game
    } else {
      this.players.set(player.id, player); // if not joined then add
    }
  }
}
