import { Button } from "@repo/ui/components/ui/Button";
import { motion, AnimatePresence } from "motion/react";
import useWebsocket from "../../hooks/useWebsocket";
import { useNavigate } from "react-router-dom";
//write popup for consent
export default function Popup() {
  const navigate = useNavigate();
  const { setShouldConnect } = useWebsocket();
  function sendWsRequest() {
    setShouldConnect(true);
    navigate("/game");
  }
  return (
    <>
      <AnimatePresence>
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 z-40 shadow-2xl backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal container */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="relative bg-primary-shadow rounded-2xl p-10 text-center shadow-[0_0_40px_rgba(255,255,0,0.3)] max-w-sm w-full flex flex-col justify-center items-center">
              <div>
                <h2 className="text-2xl font-extrabold text-pink mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                  Do you want to play quiz now?
                </h2>
              </div>

              {/* YES button */}
              <div>
                <Button
                  variant="primary"
                  onClick={() => {
                    sendWsRequest();
                  }}
                >
                  Yes
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      </AnimatePresence>
    </>
  );
}
