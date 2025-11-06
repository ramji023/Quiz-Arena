export interface QuizFormState {
  title: string;
  description: string;
  quiz: {
    question: string;
    options: {
      text: string;
      isCorrect: boolean;
    }[];
    points: number;
  }[];
}
