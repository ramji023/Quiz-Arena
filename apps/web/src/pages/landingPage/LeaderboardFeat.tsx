import { motion } from "motion/react";
import leadboardImg from "../../../public/leaderboard.png";
import { CheckIcon } from "@repo/ui/components/icons/ArrowsIcon";
export default function LeaderboardFeat() {
  return (
    <>
      <div className="px-5 py-20 bg-primary">
        <div className="flex justify-between items-center">
          {/* first section  */}
          <div className="text-secondary flex flex-col gap-4">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl font-semibold mb-4"
            >
              Stay Competitive with Real Time Leaderboards
            </motion.h1>
            <p className="flex items-start text-card ">
              <CheckIcon />{" "}
              <span className="text-secondary px-2">
                Track your progress live as you climb the ranks
              </span>
            </p>
            <p className="flex items-start  text-card text-md">
              <CheckIcon />{" "}
              <span className="text-secondary px-2">
                Experience instant score updates during quizzes
              </span>
            </p>
            <p className="flex items-start  text-card text-md">
              <CheckIcon />{" "}
              <span className="text-secondary px-2">
                Compete with friends and players worldwide
              </span>
            </p>
            <p className="flex items-start  text-card text-md">
              <CheckIcon />{" "}
              <span className="text-secondary px-2">
                See detailed stats and performance insights
              </span>
            </p>
            <p className="flex items-start  text-card text-md">
              <CheckIcon />{" "}
              <span className="text-secondary px-2">
                Share your achievements and challenge others easily
              </span>
            </p>
          </div>
          {/* second section  */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%)",
              }}
              className="bg-card rounded-xl flex justify-center items-center "
            >
              <img src={leadboardImg} alt="" className="w-[500px] h-[400px]" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

/** 

 initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{duration:1,delay:0.2}}
        
          */
