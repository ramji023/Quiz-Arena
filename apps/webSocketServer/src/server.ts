import dotenv from "dotenv"; // import and configure dotenv to manage environment variables
dotenv.config();
import WebSocket from "ws"; // import WebSocket library to create a websocket server
import jwt from "jsonwebtoken"; // import jsonwebtoken library to handle jwt tokens
import url from "url"; // import url module to parse urls
import GameManager from "./GameManager"; // import GameManager class to manage game logic
const wss = new WebSocket.Server({ port: 3001 }); // create a new websocket server instance on port 3001

// make sure prisma is connected
import { prisma } from "@repo/database";
import { createHostedQuizEntry } from "./models/game";
async function testPrismaConnection() {
  try {
    await prisma.$queryRaw`SELECT 1;`;
    console.log("prisma connected successfully");
  } catch (error) {
    console.error("prisma connection failed:", error);
  }
}
testPrismaConnection();

// create new instance of game manager
const newGameManager = new GameManager();

// when a client connects to the server
wss.on("connection", (ws, req) => {
  const parsedUrl = url.parse(req.url as string, true).query; // parse the url to get query parameters
  try {
    // if there is a host connection
    if (parsedUrl.token && parsedUrl.themeId) {
      // decode and verify the jwt token
      const decodedToken = jwt.verify(
        parsedUrl.token as string,
        process.env.ACCESS_TOKEN_KEY as string
      ) as jwt.JwtPayload;
      // console.log("decoded user data : ", decodedToken); // log the decoded token data
      // ws.send("host Authentication Successfull");
      // create host and add in that game (call addPlayer method of game manager class)
      newGameManager.addHost(
        "host",
        decodedToken.id,
        decodedToken.email.split("@")[0],
        ws,
        parsedUrl.themeId as string
      );
    } // if there is a player connection
    else if (parsedUrl.roomId && parsedUrl.fullName) {
      console.log("parsed url of player : ", parsedUrl);
      // if player want to reconnect to the server
      if (parsedUrl.userId && parsedUrl.isReconnect) {
        console.log("parsed url of reConnect player : ", parsedUrl);
        newGameManager.reConnectPlayer(
          parsedUrl.roomId as string,
          parsedUrl.fullName as string,
          parsedUrl.userId as string,
          ws
        );
      } else {
        ws.send("Player joined the room successfully"); // send message to that player
        // check if that room id is exist or not
        const game = newGameManager.checkGameId(parsedUrl.roomId as string);
        // console.log("game : ", game);
        // if game id is invalid close the websocket connection
        if (!game) {
          ws.close(1008, "Game id is Invalid");
          return;
        }
        // if game id is valid
        // create player and add in that game
        newGameManager.addPlayer(
          "player",
          parsedUrl.fullName as string,
          ws,
          game
        );
      }
    }

    // if client send message to server
    ws.on("message", (data) => {
      newGameManager.handleMessage(ws, data.toString()); // call handleMessage method of game manager class
    });
  } catch (err) {
    ws.close(1008, "Inavlid Token");
  }
  // when client disconnects from the server
  ws.on("close", () => {
    console.log("someone is left the connection"); // if disconnected log the message
    newGameManager.removePlayer(ws); // call removePlayer method of game manager class
  });
});
