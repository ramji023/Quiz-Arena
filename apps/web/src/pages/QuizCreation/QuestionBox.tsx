import { InputBox } from "./InputBox";
import { Trash2 } from "lucide-react";
import { UseFormRegister, Control } from "react-hook-form";
import { QuizFormState } from "../../types/quizForm";

interface QuestionBoxProps {
  index: number;
  register: UseFormRegister<QuizFormState>;
  control: Control<QuizFormState>;
  remove: (index: number) => void;
}

export function QuestionBox({ index, register, remove }: QuestionBoxProps) {
  return (
    <div className="outline-1 border border-gray-300 p-4 rounded-2xl">
      <div className="flex justify-between items-center mb-2">
        <span className="bg-pink w-8 h-8 rounded-full flex justify-center items-center font-semibold text-white">
          {index + 1}
        </span>
        <Trash2
          className="text-gray-600 cursor-pointer"
          onClick={() => remove(index)}
        />
      </div>

      <InputBox
        label="Question"
        placeholder="Enter your question"
        type="text"
        {...register(`quiz.${index}.question`, { required: true })}
      />

      {/* options with checkboxes  */}
      <div className="p-2">
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, optIndex) => (
            <div
              key={optIndex}
              className="flex items-center gap-2 bg-secondary/30 p-2 rounded-md"
            >
              {/* checkbox  */}
              <label className="pt-2 relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="peer appearance-none w-5 h-5 outline-1 rounded checked:bg-pink checked:border-pink transition-all cursor-pointer"
                  {...register(
                    `quiz.${index}.options.${optIndex}.isCorrect` as const
                  )}
                />
                <span className="absolute text-white text-sm font-bold hidden peer-checked:block left-[5px] top-[9px]">
                  ✓
                </span>
              </label>
              <InputBox
                label={`Option ${optIndex + 1}`}
                placeholder={`Option ${optIndex + 1}...`}
                type="text"
                {...register(`quiz.${index}.options.${optIndex}.text`, {
                  required: true,
                })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* points */}
      <div className="flex p-2 max-w-[300px]">
        <InputBox
          label="Points"
          placeholder="10"
          type="number"
          {...register(`quiz.${index}.points`, {
            valueAsNumber: true,
          })}
        />
      </div>
    </div>
  );
}
