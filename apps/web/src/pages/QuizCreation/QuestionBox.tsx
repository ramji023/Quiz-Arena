import { InputBox } from "./InputBox";
import { Copy, Trash2, Zap } from "lucide-react";
import { UseFormRegister, Control, FieldErrors } from "react-hook-form";
import { QuizFormState } from "../../types/quizForm";

interface QuestionBoxProps {
  index: number;
  register: UseFormRegister<QuizFormState>;
  control: Control<QuizFormState>;
  remove: (index: number) => void;
  errors: FieldErrors<QuizFormState>;
}

export function QuestionBox({
  index,
  register,
  remove,
  errors,
}: QuestionBoxProps) {
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
        {...register(`quiz.${index}.question`, {
          required: { value: true, message: "Enter Question" },
        })}
        error={errors?.quiz?.[index]?.question?.message}
      />

      {/* options with checkboxes  */}
      <div className="p-2">
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, optIndex) => (
            <div
              key={optIndex}
              className="flex items-center gap-2 p-2 rounded-md"
            >
              {/* checkbox  */}
              <label className="pt-2 relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="peer appearance-none w-5 h-5 outline-1 rounded checked:bg-pink checked:border-pink transition-all cursor-pointer"
                  {...register(
                    `quiz.${index}.options.${optIndex}.isCorrect` as const,
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
                  required: {
                    value: true,
                    message: "Option text is required",
                  },
                })}
                error={
                  errors?.quiz?.[index]?.options?.[optIndex]?.text?.message
                }
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

interface QuestionBoxProps {
  index: number;
  register: UseFormRegister<QuizFormState>;
  control: Control<QuizFormState>;
  remove: (index: number) => void;
  errors: FieldErrors<QuizFormState>;
}

export function QuestionBoxVariant({
  index,
  register,
  remove,
  errors,
}: QuestionBoxProps) {
  return (
    <article className="group relative bg-white rounded-2xl p-8 shadow-sm border border-transparent hover:border-[#fc2e9d]/10 transition-all">
      {/* action button  */}
      <div className="absolute right-4 top-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 text-[#504448] hover:text-primary hover:bg-[#eae8df] rounded-lg transition-colors">
          <span>
            <Copy />
          </span>
        </button>
        <button className="p-2 text-[#504448] hover:text-primary hover:bg-[#eae8df] rounded-lg transition-colors">
          <span>
            <Trash2 onClick={() => remove(index)} />
          </span>
        </button>
      </div>
      {/* question info  */}
      <div className="grid md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-[#e7e3ce] flex items-center justify-center font-brand font-black text-primary">
            {index + 1}
          </div>
        </div>
        {/* question texetbox  */}
        <div className="md:col-span-9">
          <input
            {...register(`quiz.${index}.question`, {
              required: { value: true, message: "Enter Question" },
            })}
            placeholder="Enter your question here..."
            className="w-full bg-transparent border-b-2 border-[#eae8df] focus:outline-[#fc2a9d] focus:ring-0 px-0 py-2 text-lg font-medium placeholder:text-[#504448]/30 transition-all"
          ></input>
          {errors?.quiz?.[index]?.question?.message && (
            <p className="text-xs text-red-500 flex flex-row-reverse">
              {errors?.quiz?.[index]?.question?.message}
            </p>
          )}
        </div>

        {/* question point box  */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 bg-[#f6f4eb] px-4 py-2 rounded-xl">
            <span className="text-[#504448]">
              <Zap className="w-5 h-5" />
            </span>
            <input
              {...register(`quiz.${index}.points`, {
                valueAsNumber: true,
              })}
              type="number"
              placeholder="10"
              className="w-full bg-transparent border-0 focus:ring-0 p-0 text-sm font-bold text-pink text-center outline-none"
            />
            <span className="text-[10px] font-black uppercase text-[#504448]/40">
              pts
            </span>
          </div>
        </div>
      </div>

      {/* question's option box  */}
      <div className="mt-8 space-y-3">
        {/* options  */}
        {Array.from({ length: 4 }).map((_, optIndex) => (
          <div key={optIndex} className="flex items-center gap-4 group/option">
            <div className="relative flex items-center justify-center">
              <input
                {...register(
                  `quiz.${index}.options.${optIndex}.isCorrect` as const,
                )}
                type="checkbox"
                className="peer appearance-none w-5 h-5 border-1 border-gray-400 rounded-full checked:border-pink transition-all cursor-pointer"
              />
              <span className="absolute w-3 h-3 rounded-full bg-pink hidden peer-checked:block left-[4px]" />
            </div>
            <input
              placeholder={`Option ${optIndex + 1}...`}
              type="text"
              {...register(`quiz.${index}.options.${optIndex}.text`, {
                required: {
                  value: true,
                  message: "Option text is required",
                },
              })}
              className="flex-1 bg-[#f6f4eb] outline-none border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#ffd9e4] group-hover/option:bg-[#f0eee5] transition-colors"
            />
            {errors?.quiz?.[index]?.options?.[optIndex]?.text?.message && (
              <p className="text-xs text-red-500 flex flex-row-reverse">
                {errors?.quiz?.[index]?.options?.[optIndex]?.text?.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
