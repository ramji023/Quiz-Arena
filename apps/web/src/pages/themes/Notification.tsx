import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import audio from "../../utils/audioManager";
import { sounds } from "../../utils/sounds";
export default function Notification({ msg }: { msg: string }) {
  //   console.log("notification component render");
  const [show, setShow] = useState(true);
  useEffect(() => {
    audio.play(sounds["notification"]!, 1000);
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      {show && (
        <div className="absolute top-5 right-1/3 mr-5 select-none">
          <div className="bg-white px-2 py-1 flex justify-center items-center rounded">
            <CircleCheck fill="green" />
            <h1 className="text-gray-800 ">{msg}</h1>
          </div>
        </div>
      )}
    </>
  );
}
