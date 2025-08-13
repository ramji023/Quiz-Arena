import { InputBox } from "./InputBox";
import { Trash2 } from "lucide-react";
export function QuestionBox({ index }: { index: number }) {
  return (
    <>
      <div className="outline-1 rounded">
        <div className="flex justify-between p-2">
          <span className="bg-pink w-8 h-8 rounded-full flex justify-center items-center font-semibold text-white">
            {index}
          </span>
          <Trash2 className="text-gray-600" />
        </div>
        <InputBox
          label="Question"
          placeholder="enter your Question"
          type="text"
        />
        <div className="p-2">
          {/* option 1 & 2  */}
          <div className="flex justify-between">
            <InputBox label="Option 1" placeholder="Option 1..." type="text" />
            <InputBox label="Option 2" placeholder="Option 2..." type="text" />
          </div>
          {/* option 3 & 4  */}
          <div className="flex justify-between">
            <InputBox label="Option 3" placeholder="Option 3..." type="text" />
            <InputBox label="Option 4" placeholder="Option 4..." type="text" />
          </div>
        </div>
        {/* last section  */}
        <div className="flex justify-between">
          <div className="flex flex-col gap-1 p-2 ">
            <label className="text-sm font-semibold">Correct Answer</label>
            <select
              name="correctAnswer"
              id=""
              className="px-2 py-2 rounded outline-1"
            >
              <option
                value="option1"
                className="bg-secondary text-primary focus:bg-secondary-shadow"
              >
                Option 1
              </option>
              <option
                value="option2"
                className="bg-secondary text-primary focus:bg-secondary-shadow"
              >
                Option 2
              </option>
              <option
                value="option3"
                className="bg-secondary text-primary hover:bg-secondary-shadow"
              >
                Option 3
              </option>
              <option
                value="option4"
                className="bg-secondary text-primary hover:bg-secondary-shadow"
              >
                Option 4
              </option>
            </select>
          </div>
          <InputBox label="Point" placeholder="10" type="number" />
        </div>
      </div>
    </>
  );
}
