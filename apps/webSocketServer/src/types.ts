export interface PlayersData {
  id: string;
  fullName: string;
  score: number;
}

export interface QuestionType {
  question: string;
  points: number;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

export interface QuizData {
  title: string;
  questions: QuestionType[];
}

export interface Quiz {
  title: string;
  questions: {
    questionId: string;
    question: string;
    points: number;
    options: {
      text: string;
      isCorrect: boolean;
    }[];
  }[];
}
