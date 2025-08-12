import { motion } from "motion/react";
import quizImg from "../../../public/quiz.png";
import { CheckIcon } from "../../components/icons/ArrowsIcon";
export default function QuizFeat() {
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
              Compete with friends worldwide in real-time
            </motion.h1>
            <p className="flex items-start text-card ">
              <CheckIcon />{" "}
              <span className="text-secondary px-2">
                Invite friends instantly with a shareable link
              </span>
            </p>
            <p className="flex items-start  text-card text-md">
              <CheckIcon />{" "}
              <span className="text-secondary px-2">
                Countdown timer for each question to keep the adrenaline high
              </span>
            </p>
            <p className="flex items-start  text-card text-md">
              <CheckIcon />{" "}
              <span className="text-secondary px-2">
                Bonus points for streaks and fastest responses
              </span>
            </p>
            <p className="flex items-start  text-card text-md">
              <CheckIcon />{" "}
              <span className="text-secondary px-2">
                Instant results screen with a detailed comparison of answers
              </span>
            </p>
          </div>
          {/* second section  */}
          <div className="flex">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
              className="bg-card rounded-xl flex justify-center items-center "
            >
              <img src={quizImg} alt="" className="w-[500px] h-[400px]" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
