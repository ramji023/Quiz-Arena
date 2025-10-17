import { Button } from "@repo/ui/components/ui/Button";
import { InputBox } from "@repo/ui/components/ui/InputBox";
import { Plus } from "lucide-react";
import { QuestionBox } from "@repo/ui/components/ui/QuestionBox";
export default function QuizCreation() {
  return (
    <>
      <div className="text-primary">
        {/* first common heading  */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold ">Happy To See You! Zassica</h1>
          <Button variant="primary">
            Add Quiz <Plus />
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
            <QuestionBox index={1}/>
             <QuestionBox index={2}/>
          </div>

          <div className="flex justify-evenly items-center">
            <Button variant="primary" >Add Question</Button>
            <Button variant="primary">Save Quiz</Button>
          </div>
        </div>
      </div>
    </>
  );
}
