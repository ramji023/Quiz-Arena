import { useEffect } from "react";
import { Control, useWatch } from "react-hook-form";
import { QuizFormState } from "../../types/quizForm";

const AutoSave = ({ control }: { control: Control<QuizFormState> }) => {
  // console.log("autosave component re-renders");
  const data = useWatch({ control });

  useEffect(() => {
    // console.log("auto save data : ", data);
    const handler = setTimeout(() => {
      localStorage.setItem("quiz-draft", JSON.stringify(data));
      console.log("Auto-saved");
    }, 10000);

    return () => clearTimeout(handler);
  }, [data]);

  return null;
};

export default AutoSave;
