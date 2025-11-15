import dotenv from "dotenv";
dotenv.config();
import WebSocket from "ws";
import jwt from "jsonwebtoken";
import url from "url";
import GameManager from "./GameManager";
const wss = new WebSocket.Server({ port: 3001 });

// create new instance of game manager
const newGame = new GameManager();
wss.on("connection", (ws, req) => {
  const parsedUrl = url.parse(req.url as string, true).query;
  try {
    // if there is a host
    if (parsedUrl.token) {
      const decodedToken = jwt.verify(
        parsedUrl.token as string,
        process.env.ACCESS_TOKEN_KEY as string
      ) as jwt.JwtPayload;
      console.log("decoded user data : ", decodedToken);
      ws.send("Authentication Successfull");
      newGame.addPlayer("host", decodedToken.email.split("@")[0],ws);
    }
  } catch (err) {
    ws.close(1008, "Inavlid Token");
  }
  ws.on("close", () => {
    console.log("someone is left the connection");
  });
});
