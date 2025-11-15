import User from "./User";
import { v4 as uuidv4 } from "uuid";
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
}
