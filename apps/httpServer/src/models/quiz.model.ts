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
        difficulty: quiz.difficulty,
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
export async function findQuizById(quizId: string) {
  try {
    return await prisma.quiz.findUnique({
      where: { id: quizId },
      select: {
        id: true,
        title: true,
        description: true,
        difficulty: true,
        createdBy: {
          select: {
            username: true,
          },
        },
        questions: {
          select: {
            question: true,
            points: true,
            options: {
              select: {
                text: true,
                isCorrect: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

//get all quizzes
export async function getAllQuizs() {
  try {
    return await prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        difficulty: true,
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });
  } catch (err) {
    console.error("Error creating quiz:", err);
    throw err;
  }
}
//delete quiz
export function deleteQuiz() {}
