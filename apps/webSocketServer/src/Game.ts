import User from "./User";
import { v4 as uuidv4 } from "uuid";
import { ERROR, JOINED_PLAYER, PLAYER_JOIN } from "./events";
import { sendJson, simplifyPlayer } from "./utils/helperFn";
import { PlayersData, Quiz, QuizData } from "./types";
export default class Game {
  gameId: string;
  themeId: string;
  host: User;
  quizData: Quiz | null;
  currentQuestionIndex: number | null;
  countDown: string;
  players: Map<string, User>;
  questionTimer : NodeJS.Timeout | null;
  hostedQuizId : string | null;
  //when host initialize a game
  constructor(host: User, themeId: string) {
    this.gameId = uuidv4();
    this.host = host;
    this.quizData = null;
    this.currentQuestionIndex = 0;
    this.countDown = "10";
    this.players = new Map();
    this.themeId = themeId;
    this.questionTimer = null;
    this.hostedQuizId = null;
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
      //send player data to that player
      const response = sendJson(PLAYER_JOIN, "player auth passed", {
        userId: player.id,
        fullName: player.fullName,
        gameId: this.gameId,
        themeId: this.themeId,
      });
      console.log(response)
      // send data if new player added in game
      player.socket.send(response);

      // now brodcast the message that new player has joined
      // send all the players data
      const players = simplifyPlayer(this.players);
      const data = sendJson(JOINED_PLAYER, "all joined players data", {
        playerJoined: players,
      });
      this.broadcasting(data);
    }
  }

  // broadcasting message to all the players and hosts
  broadcasting(data: any) {
    this.players.forEach((player) => {
      player.socket.send(data);
    });
    this.host.socket.send(data);
  }
}
