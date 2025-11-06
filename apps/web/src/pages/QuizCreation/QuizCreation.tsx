import { Button } from "@repo/ui/components/ui/Button";
import { InputBox } from "./InputBox";
import { Plus, Save } from "lucide-react";
import { QuestionBox } from "./QuestionBox";
import { useEffect, useState } from "react";
import { QuizFormState } from "../../types/quizForm";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import AutoSave from "./AutoSave";
export default function QuizCreation() {
  const { control, register, handleSubmit, watch } = useForm<QuizFormState>({
    defaultValues: {
      title: "",
      description: "",
      quiz: Array(2)
        .fill(null)
        .map(() => ({
          question: "",
          options: Array(4)
            .fill(null)
            .map(() => ({ text: "", isCorrect: false })),
          points: 0,
        })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "quiz",
  });

  function onSubmit(data: QuizFormState) {
    console.log("quiz data : ", data);
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <AutoSave control={control} />
          <div className="p-6">
            {/* enter quiz details  */}
            <div>
              <InputBox
                label="Quiz Title"
                placeholder="enter quiz title"
                type="text"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                })}
              />
              <InputBox
                label="Description"
                placeholder="write description..."
                type="text"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
              />
            </div>
            {/* question card  */}
            <div className="px-2 py-5 flex flex-col gap-6">
              {fields.map((field, index) => (
                <QuestionBox
                  key={field.id}
                  index={index}
                  register={register}
                  control={control}
                  remove={remove}
                />
              ))}
            </div>

            <div className="flex justify-evenly items-center">
              <Button
                variant="primary"
                type="button"
                onClick={() =>
                  append({
                    question: "",
                    options: Array(4)
                      .fill(null)
                      .map(() => ({ text: "", isCorrect: false })),
                    points: 0,
                  })
                }
              >
                Add Question <Plus className="w-4 h-4" />
              </Button>
              <Button variant="primary" type="submit" onClick={() => {}}>
                Save Quiz <Save className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
