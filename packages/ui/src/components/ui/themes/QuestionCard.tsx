import { useState } from "react";

export default function QuestionCard({
  questionData,
  onAnswer,
  optionColors
}: {
  questionData: { question: string; options: string[] };
  onAnswer: (option: string) => void;
  optionColors:string[]
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    onAnswer(option);
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
          const isSelected = selected === option;
          const color = optionColors[index % optionColors.length];

          return (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className={`relative py-3 rounded-2xl font-bold text-2xl tracking-wide transition-all duration-300 border-4 
                ${
                  isSelected
                    ? "scale-105 text-white border-yellow-300 shadow-[0_0_20px_rgba(255,255,100,0.6)]"
                    : "border-transparent hover:border-yellow-200"
                }
                ${
                  isSelected
                    ? `bg-gradient-to-br ${color}`
                    : `bg-gradient-to-br ${color} opacity-90 hover:opacity-100`
                }`}
            >
              <span className="drop-shadow-md">{option}</span>

              <div className="absolute inset-0 rounded-xl bg-white/10 pointer-events-none"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}




//   const optionColors = [
//     "from-green-700 to-green-500",
//     "from-amber-500 to-yellow-400",
//     "from-emerald-600 to-teal-500",
//     "from-lime-500 to-green-400",
//   ];