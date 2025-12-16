import { create } from "zustand";
import { Quiz } from "../types/quizForm";
import { persist } from "zustand/middleware";

interface QuizStore {
  quiz: Quiz | null;
  themeId: string | null;
  setQuiz: (quiz: Quiz) => void;
  setThemeId: (id: string) => void;
  resetQuiz: () => void;
}

// zustand store to store admin quiz data 
// admin store quiz and themeId when he select quiz to host
export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      quiz: null, // store quiz data
      themeId: null, // store selected themeId
      setQuiz: (quiz) => set({ quiz }), // function to set the quiz data
      setThemeId: (id) => set({ themeId: id }), // function to set the theme id
      // function to clear quiz and theme id and clear local storage data
      resetQuiz: () => {
        set({ quiz: null, themeId: null })
      },
    }),
    // store quiz data into local storage (when admin refresh the page while hosting quiz)
    {
      name: "quiz-storage", 
      partialize: (state) => ({
        quiz: state.quiz,
        themeId: state.themeId,
      }),
    }
  )
);