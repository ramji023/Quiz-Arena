import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/authStore";

const useWebsocket = () => {
  const [shouldConnect, setShouldConnect] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const token = useAuthStore.getState().token;
  useEffect(() => {
    if (!shouldConnect) return;
    const ws = new WebSocket(`ws://localhost:3001?token=${token}`);

    ws.onopen = () => {
      setSocket(ws);
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

  return { socket, setShouldConnect };
};

export default useWebsocket;
