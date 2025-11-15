import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";
import useSocketStore from "../stores/socketStore";

const useWebsocket = () => {
  const [shouldConnect, setShouldConnect] = useState(false);
  const setSocketInstance = useSocketStore((s)=>s.setSocketInstance)
  const token = useAuthStore.getState().token;
  useEffect(() => {
    if (!shouldConnect) return;
    const ws = new WebSocket(`ws://localhost:3001?token=${token}`);

    ws.onopen = () => {
       setSocketInstance(ws)
      console.log("connected with websocket server");
    };

    ws.onclose = (event) => {
      console.log("disconnected with websocket server");
      console.log("Code:", event.code, "Reason:", event.reason);

      if (event.code === 1008) {
        alert("Session expired or invalid token. Please log in again.");
      }
    };
  }, [shouldConnect]);

  return {setShouldConnect };
};

export default useWebsocket;
