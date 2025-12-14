import { Button } from "@repo/ui/components/ui/Button";
import { useForm } from "react-hook-form";
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
  // console.log(" PlayerJoin: RENDER");

  const gameStatus = useSocketStore((s) => s.gameStatus);
  const isConnected = useSocketStore((s) => s.isConnected);
  const tik_tik = useSocketStore((s) => s.tik_tik);
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
    // console.log(" PlayerJoin: Form submitted", data);
    const url = `ws://localhost:3001?roomId=${data.gamePin}&fullName=${data.username}`;
    setWsUrl(url);
  }

  // Trigger connection when wsUrl changes
  useEffect(() => {
    // console.log(" PlayerJoin: wsUrl effect running, wsUrl:", wsUrl);
    if (wsUrl !== "") {
      // console.log("PlayerJoin: Setting shouldConnect to true");
      setShouldConnect(true);
    }
  }, [wsUrl, setShouldConnect]);

  // Navigate to /play when connected
  useEffect(() => {
    // console.log("PlayerJoin: Navigation effect running", {
    //   isConnected,
    //   wsUrl,
    // });
    if (isConnected && wsUrl) {
      // console.log(" PlayerJoin: Navigating to /play");
      navigate("/play");
    }
  }, [isConnected, wsUrl, navigate, tik_tik, gameStatus]);

  // Check for reconnect ONLY on mount
  useEffect(() => {
    // console.log(" PlayerJoin: Reconnect check effect running");
    // console.log(" hasCheckedReconnect:", hasCheckedReconnect);

    if (hasCheckedReconnect) {
      // console.log(" PlayerJoin: Already checked, skipping");
      return;
    }

    const storeState = useSocketStore.getState();
    const { id, gameId, fullName, isConnected: storeIsConnected } = storeState;

    // console.log("PlayerJoin: Store state for reconnect check:", {
    //   id,
    //   gameId,
    //   fullName,
    //   isConnected: storeIsConnected,
    //   gameStatus,
    // });

    if (
      !storeIsConnected &&
      (gameStatus === "waiting" ||
        gameStatus === "start" ||
        gameStatus === "ready") &&
      id &&
      gameId &&
      fullName
    ) {
      // console.log("PlayerJoin: ALL CONDITIONS MET - Showing reconnect box");
      setShowReconnectBox(true);
    }
    // } else {
    //   console.log("❌ PlayerJoin: NOT showing reconnect box. Reason:", {
    //     isConnectedCheck: !storeIsConnected
    //       ? "PASS"
    //       : "FAIL (already connected)",
    //     gameStatusCheck:
    //       gameStatus === "waiting" ||
    //       gameStatus === "start" ||
    //       gameStatus === "ready"
    //         ? "PASS"
    //         : `FAIL (gameStatus is ${gameStatus})`,
    //     hasId: id ? "PASS" : "FAIL",
    //     hasGameId: gameId ? "PASS" : "FAIL",
    //     hasFullName: fullName ? "PASS" : "FAIL",
    //   });
    // }

    if (gameStatus === "end") {
      // console.log(" PlayerJoin: Game ended, resetting session");
      useSocketStore.getState().resetSession();
    }

    setHasCheckedReconnect(true);
    // console.log("PlayerJoin: Set hasCheckedReconnect to true");

    return () => {
      // console.log("PlayerJoin: Reconnect check effect CLEANUP");
    };
  }, []);

  // Component unmount logging
  useEffect(() => {
    return () => {
      // console.log("PlayerJoin: COMPONENT UNMOUNTING");
    };
  }, []);

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
