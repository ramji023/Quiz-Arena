import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", (ws) => {
  ws.send("you are connected with quizArena");


  
  ws.on("close", () => {
    console.log("someone is left the connection");
  });
});
