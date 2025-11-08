import { prisma } from "@repo/database";
import { QuizFormState } from "../validations/quizForm.validation";

type QuizFormType = QuizFormState & {
  userId: string;
};
//create quiz
export async function createNewQuiz(quiz: QuizFormType) {
  try {
    return await prisma.quiz.create({
      data: {
        title: quiz.title,
        description: quiz.description,
        userId: quiz.userId,
        questions: {
          create: quiz.quiz.map((q) => ({
            question: q.question,
            points: q.points,
            options: {
              create: q.options.map((opt) => ({
                text: opt.text,
                isCorrect: opt.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  } catch (err) {
    console.error("Error creating quiz:", err);
    throw err;
  }
}
//find quiz by id
export function findQuizById() {}
//get all quizzes
export function getAllQuiz() {}
//delete quiz
export function deleteQuiz() {}
