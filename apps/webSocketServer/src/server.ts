import dotenv from "dotenv";
dotenv.config();
import WebSocket from "ws";
import jwt from "jsonwebtoken";
import url from "url";
const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", (ws, req) => {
  const parsedUrl = url.parse(req.url as string, true).query;
  try {
    if (parsedUrl.token) {
      const decodedToken = jwt.verify(
        parsedUrl.token as string,
        process.env.ACCESS_TOKEN_KEY as string
      );
      console.log("decoded user data : ", decodedToken);
      ws.send("Authentication Successfull");
    }
  } catch (err) {
    ws.close(1008, "Inavlid Token");
  }
  ws.on("close", () => {
    console.log("someone is left the connection");
  });
});
