import { Button } from "@repo/ui/components/ui/Button";
import { useForm } from "react-hook-form";
import useWebsocket from "../../hooks/useWebsocket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReconnectBox from "./ReconnectBox";
import useSocketStore from "../../stores/socketStore";
import { Logo } from "@repo/ui/components/Logo";
import useErrorStore from "../../stores/errorStore";
import useSuccessStore from "../../stores/SuccessStore";
import { ErrorNote } from "../ErrorPages/ErrorNote";

interface FormState {
  username: string;
  gamePin: string;
}

export default function PlayerJoin() {
  // get the states from useSocketStore
  const gameStatus = useSocketStore((s) => s.gameStatus); // get the game Status
  const isConnected = useSocketStore((s) => s.isConnected); // get isConnected status
  const tik_tik = useSocketStore((s) => s.tik_tik); // get the duration
  const [showReconnectBox, setShowReconnectBox] = useState(false); // state to manage wheather reconnect box should open or not
  const [hasCheckedReconnect, setHasCheckedReconnect] = useState(false); // state to track the state of opening and closing of reconnect box
  const navigate = useNavigate();
  const setError = useErrorStore((s) => s.setError); // get the function to set the error
  const setMessage = useSuccessStore((s) => s.setMessage);
  // intialize the react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>({
    defaultValues: {
      username: "",
      gamePin: "",
    },
  });

  // state to manage the websocket url to connect to
  const [wsUrl, setWsUrl] = useState<string>("");
  // custom hook for managing WebSocket connection status
  const { setShouldConnect } = useWebsocket(wsUrl);

  // handles the form submission for joining the game
  function onSubmit(data: FormState) {
    // format the websocket url
    const url = `ws://localhost:3001?roomId=${data.gamePin}&fullName=${data.username}`;
    setWsUrl(url); // set url to trigger wesocket connection
  }

  // effect to make setShouldConnect to true when websocket url is set
  useEffect(() => {
    if (wsUrl !== "") {
      setShouldConnect(true); // initiate websocket connection
    }
  }, [wsUrl, setShouldConnect]);

  // effect to navigate to /play when isConnected,websocket url,tik_tik and gameStatus are all valid
  useEffect(() => {
    if (isConnected && wsUrl) {
      navigate("/play"); // redirect to game play page
      setMessage("You have successfully joined the game");
    }
  }, [isConnected, wsUrl, navigate, tik_tik, gameStatus]);

  // effect run on mount, decide if the player should see a reconnect box
  useEffect(() => {
    if (hasCheckedReconnect) {
      return; // if already checked then do nothing
    }

    // get the latest states  from useSocketStore
    const storeState = useSocketStore.getState();
    const { id, gameId, fullName, isConnected: storeIsConnected } = storeState;

    /*
     * if isConnected is false and gameStatus is valid
     * AND user is on PlayerJoin page
     * it means that the game has not ended and user might be clicked to back button by mistake on themeWrapper component
     * so open the reconnect box to ask user to reconnect to the game
     */
    if (
      !storeIsConnected &&
      (gameStatus === "waiting" ||
        gameStatus === "start" ||
        gameStatus === "ready") &&
      id &&
      gameId &&
      fullName
    ) {
      setShowReconnectBox(true); // open reconnect box
    }

    /*
     * if gameStatus is end
     * AND user is on PlayerJoin page
     * it means that the game has ended and user click to back button on themeWrapper component
     * so reset all the states of useSocketStore
     */
    if (gameStatus === "end") {
      useSocketStore.getState().resetSession();
    }

    setHasCheckedReconnect(true); // mark the reconnect check to true
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center font-poppins bg-primary px-4 text-secondary">
      {/* Logo */}
      <Logo />

      {/* Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-center text-primary"
      >
        <div className=" bg-secondary rounded-xl shadow-2xl w-full max-w-sm p-6 flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl font-semibold text-primary text-center mb-6">
            Join Quiz Game
          </h2>
          <div className="flex flex-col gap-1 py-1 w-full">
            <label className="text-md">Name</label>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              className="w-full p-2 rounded-lg outline-1 outline-secondary bg-white text-base"
              {...register("username", {
                required: {
                  value: true,
                  message: "**User name is required",
                },
              })}
            />
            <span className="text-xs text-red-500 flex flex-row-reverse">
              {" "}
              {errors.username?.message}
            </span>
          </div>
          <div className="flex flex-col gap-1 py-1 w-full">
            <label className="text-md">Room Pin</label>
            <input
              type="text"
              placeholder="Enter Room Pin"
              className="p-2 rounded-lg outline-1 outline-secondary bg-white text-base"
              {...register("gamePin", {
                required: {
                  value: true,
                  message: "**Game pin is required",
                },
              })}
            />
            <span className="text-xs text-red-500 flex flex-row-reverse">
              {" "}
              {errors.gamePin?.message}
            </span>
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

      {/* render Error note  */}
      <ErrorNote />
    </div>
  );
}
