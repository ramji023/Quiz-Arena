import { create } from "zustand";
import { Quiz } from "../types/quizForm";

interface QuizStore {
  quiz: Quiz | null;
  themeId: string | null;
  setQuiz: (quiz: Quiz) => void;
  setThemeId: (id: string) => void;
  resetQuiz:()=>void
}
export const useQuizStore = create<QuizStore>((set) => ({
  quiz: null,
  themeId: null,
  setQuiz: (quiz) => set({ quiz }),
  setThemeId: (id) => set({ themeId: id }),
  resetQuiz: () => set({ quiz: null })
}));
