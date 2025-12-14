import { Button } from "@repo/ui/components/ui/Button";
import { set, useForm } from "react-hook-form";
import useWebsocket from "../../hooks/useWebsocket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReconnectBox from "./ReconnectBox";
import useSocketStore from "../../stores/socketStore";
interface FormState {
  username: string;
  gamePin: string;
}
export default function PlayerJoin() {
  console.log("rendering player join component");
  const gameStatus = useSocketStore((s) => s.gameStatus);
  const isConnected = useSocketStore((s) => s.isConnected);
  const [showReconnectBox, setShowReconnectBox] = useState(false);
  const [hasCheckedReconnect, setHasCheckedReconnect] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormState>({
    defaultValues: {
      username: "",
      gamePin: "",
    },
  });

  const [wsUrl, setWsUrl] = useState<string>("");
  const { setShouldConnect } = useWebsocket(wsUrl);

  function onSubmit(data: FormState) {
    const url = `ws://localhost:3001?roomId=${data.gamePin}&fullName=${data.username}`;
    setWsUrl(url);
  }

  // write useEffect to set should connect true whenever wsUrl changes and is not empty
  useEffect(() => {
    if (wsUrl !== "") {
      setShouldConnect(true);
    }
  }, [wsUrl]);

  useEffect(() => {
    if (isConnected && wsUrl) {
      console.log(wsUrl);
      navigate("/play");
    }
  }, [isConnected, wsUrl]);

  // Check for reconnect ONLY on mount
  useEffect(() => {
    if (hasCheckedReconnect) return;

    const { id, gameId, fullName, isConnected } = useSocketStore.getState();

    if (
      !isConnected &&
      (gameStatus === "waiting" ||
        gameStatus === "start" ||
        gameStatus === "ready") &&
      id &&
      gameId &&
      fullName
    ) {
      console.log("Detected disconnection, showing reconnect box");
      setShowReconnectBox(true);
    }

    if (gameStatus === "end") {
      console.log("Game ended, resetting session");
      useSocketStore.getState().resetSession();
    }

    setHasCheckedReconnect(true);
  }, []); // Empty dependency array - run only on mount

  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center font-poppins bg-primary px-4 text-secondary">
      {/* Logo */}
      <div className="font-logo font-semibold text-pink">
        <span className="text-4xl">Q</span>
        <span className="text-4xl text-secondary">uizArena</span>
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center"
      >
        <div className=" bg-primary-shadow rounded-xl shadow-2xl w-full max-w-sm p-6 flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl font-semibold text-secondary text-center mb-6">
            Join Quiz Game
          </h2>
          <div className="flex flex-col gap-1 py-1 w-full">
            <label className="text-md">Name</label>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              className="w-full p-2 rounded-lg outline-1 outline-secondary focus:outline-pink"
              {...register("username", {
                required: {
                  value: true,
                  message: "User name is required",
                },
              })}
            />
            {/* <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
                  {errors.email?.message} ?? ""
                </span> */}
          </div>
          <div className="flex flex-col gap-1 py-1 w-full">
            <label className="text-md">Room Pin</label>
            <input
              type="text"
              placeholder="Enter Room Pin"
              className="p-2 rounded-lg outline-1 outline-secondary focus:outline-pink"
              {...register("gamePin", {
                required: {
                  value: true,
                  message: "Game pin is required",
                },
              })}
            />
            {/* <span className="text-red-500 text-xs min-h-[16px] flex flex-row-reverse">
                  {errors.email?.message}
                </span> */}
          </div>

          <Button variant="primary" onClick={() => {}}>
            Join
          </Button>
        </div>
      </form>
      {showReconnectBox && (
        <ReconnectBox
          closeBox={() => setShowReconnectBox(false)}
          setwsURl={(str) => setWsUrl(str)}
        />
      )}
    </div>
  );
}
