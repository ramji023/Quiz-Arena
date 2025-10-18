import { Button } from "@repo/ui/components/ui/Button";
import { InputBox } from "@repo/ui/components/ui/InputBox";
import { Plus, Save } from "lucide-react";
import { QuestionBox } from "@repo/ui/components/ui/QuestionBox";
import { useState } from "react";
export default function QuizCreation() {
  const [questionCard, setQuestionCard] = useState(2);
  return (
    <>
      <div className="text-primary">
        {/* first common heading  */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold ">Happy To See You! Zassica</h1>
          <Button variant="primary" onClick={() => {}}>
            Add Quiz <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-6">
          {/* enter quiz details  */}
          <div>
            <InputBox
              label="Quiz Title"
              placeholder="enter quiz title"
              type="text"
            />
            <InputBox
              label="Description"
              placeholder="write description..."
              type="text"
            />
          </div>
          {/* question card  */}
          <div className="px-2 py-5 flex flex-col gap-6">
            {Array.from({ length: questionCard }).map((_, index) => (
              <QuestionBox index={index + 1} />
            ))}
          </div>

          <div className="flex justify-evenly items-center">
            <Button
              variant="primary"
              onClick={() => {
                setQuestionCard((curr) => curr + 1);
              }}
            >
              Add Question <Plus className="w-4 h-4" />
            </Button>
            <Button variant="primary" onClick={() => {}}>
              Save Quiz <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
