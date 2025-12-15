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
  hostedQuizzes: {
    _count: {
      players: number;
    };
  }[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  createdBy: {
    username: string;
  };
  questions: {
    question: string;
    points: number;
    options: {
      text: string;
      isCorrect: boolean;
    }[];
  }[];
}

export interface HostQuizzes {
  id: string;
  start_date: string;
  quiz_id: {
    id: string;
    title: string;
    difficulty: string;
    _count: {
      questions: number;
    };
  };
  _count: {
    players: number;
  };
}

export interface HostQuiz {
  id: string;
  quizid: string;
  title: string;
  description: string;
  difficulty: string;
  start_date: string;
  totalQuizPoints: number;
  totalQuestions: number;
  players: {
    fullName: string;
    score: number;
    percentage: number;
  }[];
  stats: {
    totalPlayers: number;
    averageScore: number;
    averagePercentage: string;
  };
}
