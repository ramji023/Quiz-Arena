export interface QuizFormState {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  quiz: {
    question: string;
    options: {
      text: string;
      isCorrect: boolean;
    }[];
    points: number;
  }[];
}

export interface AllQuizzes {
  title: string;
  difficulty: "easy" | "medium" | "hard";
  id: string;
  _count: {
    questions: number;
  };
}
