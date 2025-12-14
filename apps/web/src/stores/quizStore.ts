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

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      quiz: null,
      themeId: null,
      setQuiz: (quiz) => set({ quiz }),
      setThemeId: (id) => set({ themeId: id }),
      resetQuiz: () => set({ quiz: null, themeId: null }),
    }),
    {
      name: "quiz-storage", 
      partialize: (state) => ({
        quiz: state.quiz,
        themeId: state.themeId,
      }),
    }
  )
);