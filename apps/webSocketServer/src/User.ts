import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
export default class User {
  id: string;
  socket: WebSocket;
  fullName: string;
  type: "host" | "player";
  score?: number;
  // if first time user join game
  constructor(
    socket: WebSocket,
    fullName: string,
    type: "host" | "player",
    hostId?: string
  ) {
    this.socket = socket;
    this.fullName = fullName;
    this.type = type;
    if (type === "host") {
      this.id = hostId as string;
    } else {
      this.id = uuidv4();
      this.score = 0;
    }
  }
}
