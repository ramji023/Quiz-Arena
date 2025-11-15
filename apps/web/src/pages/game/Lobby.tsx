import { motion } from "motion/react";
import { useEffect, useState } from "react";
import CarttonIcon from "@repo/ui/components/icons/CarttonIcon";
import { Button } from "@repo/ui/components/ui/Button";
import { CircleCheck } from "lucide-react";
interface User {
  id: string;
  name: string;
  color?: string;
}

export default function Lobby({
  roomId = "24359476734865468734",
  users,
  color = "bg-primary",
}: {
  roomId: string;
  users: User[];
  color: string;
}) {
  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});

  useEffect(() => {
    const moveRandomly = (userId: string) => {
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      setPositions((prev) => ({
        ...prev,
        [userId]: { x: randomX, y: randomY },
      }));
    };

    // Initialize positions for all users
    users.forEach((user: User) => moveRandomly(user.id));

    // Move each user every 3-5 seconds (random interval for variety)
    const intervals = users.map((user) => {
      const interval = 3000 + Math.random() * 2000; // 3-5 seconds
      return setInterval(() => moveRandomly(user.id), interval);
    });

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [users]);

  const [isCopied, setIsCopied] = useState(false);
  // function to copy game pin
  const copyPin = () => {
    navigator.clipboard
      .writeText(roomId)
      .then(() => setIsCopied(true))
      .catch((err) => console.error("Failed to copy:", err));
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);
  return (
    <>
      <div className="w-full h-full relative flex flex-col items-center justify-center gap-6 p-6 select-none">
        {/* Room Pin */}
        <div
          onClick={copyPin}
          className="border-dashed border-black rounded border-2 bg-white px-2 py-1 cursor-pointer text-black text-start"
        >
          <div>
            <span className="text-sm text-gray-700">Room Pin</span>
          </div>
          <div>
            <span className="text-black text-4xl font-semibold">{roomId}</span>
          </div>
        </div>

        {/* Waiting */}
        <div className="border rounded border-gray-700 mt-3 px-3 py-2 bg-white text-base text-black font-semibold">
          Waiting for Players...
        </div>

        {/* Floating players */}
        {users.map((user, index) => {
          const position = positions[user.id] || { x: 0, y: 0 };

          return (
            <motion.div
              key={user.id}
              animate={{
                x: position.x,
                y: position.y,
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
              className="fixed top-0 left-0 z-10 max-w-full"
            >
              <div className="text-md font-medium text-foreground bg-primary text-secondary rounded px-2 py-1 flex justify-center items-center gap-2">
                <div className="text-secondary">
                  <CarttonIcon />
                </div>
                <h1 className="font-bold"> {user.name}</h1>
              </div>
            </motion.div>
          );
        })}

        {/* submit button  */}
        <div className="shadow-4xl mb-0 mt-10">
          <Button variant="primary" onClick={() => {}}>
            <span className="font-bold">Start</span>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-5 right-0 mr-5 select-none">
        {isCopied && (
          <div className="bg-white px-2 py-1 flex justify-center items-center rounded">
            <CircleCheck fill="green" />
            <h1 className="text-gray-700 ">
              You have copied room pin successfully
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
