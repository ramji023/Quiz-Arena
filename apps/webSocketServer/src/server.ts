import dotenv from "dotenv";
dotenv.config();
import WebSocket from "ws";
import jwt from "jsonwebtoken";
import url from "url";
import GameManager from "./GameManager";
import Game from "./Game";
const wss = new WebSocket.Server({ port: 3001 });

// create new instance of game manager
const newGameManager = new GameManager();
wss.on("connection", (ws, req) => {
  const parsedUrl = url.parse(req.url as string, true).query;
  try {
    // if there is a host
    if (parsedUrl.token && parsedUrl.themeId) {
      const decodedToken = jwt.verify(
        parsedUrl.token as string,
        process.env.ACCESS_TOKEN_KEY as string
      ) as jwt.JwtPayload;
      // console.log("decoded user data : ", decodedToken);
      // ws.send("host Authentication Successfull");
      newGameManager.addPlayer(
        "host",
        decodedToken.email.split("@")[0],
        ws,
        parsedUrl.themeId as string
      );
    } else if (parsedUrl.roomId && parsedUrl.fullName) {
      ws.send("Player joined the room successfully");
      // check if that room id is  exist or not
      const game = newGameManager.checkGameId(parsedUrl.roomId as string);
      if (!game) {
        ws.close(1008, "Game id is Invalid");
        return;
      }
      // create player and add in that game
      newGameManager.addPlayer(
        "player",
        parsedUrl.fullName as string,
        ws,
        game
      );
    }

    // if client send message to server
    ws.on("message", (data) => {
      newGameManager.handleMessage(ws, data.toString());
    });
  } catch (err) {
    ws.close(1008, "Inavlid Token");
  }
  ws.on("close", () => {
    console.log("someone is left the connection");
  });
});
