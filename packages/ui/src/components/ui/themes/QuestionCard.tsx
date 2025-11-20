import { useState } from "react";
import { AnswerFeedback } from "./Popup";
interface QuestionType {
  questionId: string;
  question: string;
  points: number;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}
export default function QuestionCard({
  role,
  questionData,
  onAnswer,
  optionColors,
  answerResult,
}: {
  role: "host" | "player";
  questionData: QuestionType;
  onAnswer: (option: { text: string; isCorrect: boolean }, id: string) => void;
  optionColors: Record<number, { from?: string; to?: string; color?: string }>;
  answerResult?: null | "correct" | "wrong";
}) {
  const [selected, setSelected] = useState<{
    text: string;
    isCorrect: boolean;
  } | null>(null);

  const handleSelect = (
    option: { text: string; isCorrect: boolean },
    questionId: string
  ) => {
    setSelected(option);
    onAnswer(option, questionId);
  };

  return (
    <div className="flex flex-col items-center justify-center font-jungle text-[#FFFBEA] px-6 py-10 text-center select-none">
      {/* Question */}
      <div className="max-w-4xl mb-12">
        <h2 className="text-5xl md:text-4xl font-extrabold leading-snug tracking-wide drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
          {questionData.question}
        </h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-w-2xl">
        {questionData.options.map((option, index) => {
          const isSelected = selected?.text === option.text;
          const colorSet =
            optionColors[index % Object.keys(optionColors).length];

          const background = colorSet?.color
            ? colorSet.color
            : `linear-gradient(to bottom right, ${colorSet?.from}, ${colorSet?.to})`;

          return (
            <button
              disabled={role === "host" ? true : false}
              key={index}
              onClick={() => handleSelect(option, questionData.questionId)}
              style={{
                background,
                border: isSelected
                  ? `4px solid ${optionColors[4]?.color}`
                  : "4px solid transparent",
                transform: isSelected ? "scale(1.05)" : "scale(1)",
                transition: "all 0.3s ease",
                color: "#fff",
                borderRadius: "1rem",
                padding: "0.75rem 1rem",
                fontWeight: 700,
                fontSize: "1.25rem",
                boxShadow: isSelected
                  ? "0 0 20px rgba(255, 255, 100, 0.6)"
                  : "none",
                opacity: isSelected ? 1 : 0.9,
                cursor: role === "host" ? "none" : "pointer",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                if (!isSelected) e.currentTarget.style.opacity = "0.9";
              }}
            >
              <span className="drop-shadow-md">{option.text}</span>

              {/* Overlay shimmer layer */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              ></div>
            </button>
          );
        })}
      </div>
      {/* show question result  */}
      {answerResult && <AnswerFeedback result={answerResult} />}
    </div>
    
  );
}
