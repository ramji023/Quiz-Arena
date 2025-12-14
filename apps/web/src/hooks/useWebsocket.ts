import { useEffect, useState } from "react";
import useSocketStore from "../stores/socketStore";

const useWebsocket = (url: string) => {
  const [shouldConnect, setShouldConnect] = useState(false);
  const setSocketInstance = useSocketStore((s) => s.setSocketInstance);
  // console.log("websocket url : ", url);
  useEffect(() => {
    if (!shouldConnect) return;
    // console.log("websocket url : ",url)
    const ws = new WebSocket(url);
    ws.onopen = () => {
      console.log(
        "before reconnecting past websocket instance : ",useSocketStore.getState().socketRef.current);
      setSocketInstance(ws);
      // console.log(useSocketStore.getState().socketRef.current);
      // console.log("successfully connected with websocket server", ws);
      // useSocketStore.getState().socketRef.current?.send(JSON.stringify({msg : "Reconnect logic successfull"}));
      // console.log("connected with websocket server");
    };

    ws.onclose = (event) => {
      console.log("disconnected with websocket server");
      console.log("Code:", event.code, "Reason:", event.reason);
      if (event.code === 1008) {
        alert("Session expired or invalid token. Please log in again.");
      }
    };
  }, [shouldConnect, setSocketInstance, url]); // [shouldConnect]

  return { setShouldConnect };
};

export default useWebsocket;
