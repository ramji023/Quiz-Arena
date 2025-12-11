import { z } from "zod"; // import z class from zod

const optionValidation = z.object({
  text: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean(),
});

const questionValidation = z.object({
  question: z.string().min(1, "Question is required"),
  options: z.array(optionValidation),
  points: z.number("Option point is required"),
});

// wrote z object to check quiz data if client send quiz data to create new Quiz
export const quizFormValidation = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  quiz: z.array(questionValidation),
});

export type QuizFormState = z.infer<typeof quizFormValidation>; // export the type of quizFormValidation
