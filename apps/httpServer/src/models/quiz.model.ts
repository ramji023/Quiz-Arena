import { prisma } from "@repo/database"; // import prisma client instance from @repo/database package
import { QuizFormState } from "../validations/quizForm.validation"; // import QuizFormState zod schema type from quiz form validation file

// define type of QuizFormType by extending QuizFormState with userId field
type QuizFormType = QuizFormState & {
  userId: string;
};

//create quiz in quiz table
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
//find quiz by quizId
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
        hostedQuizzes: {
          select: {
            _count: {
              select: {
                players: true,
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

//get all quizzes from quiz table
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
        hostedQuizzes: {
          select: {
            _count: {
              select: {
                players: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.error("Error creating quiz:", err);
    throw err;
  }
}

// get all hosted quizzes from hosted quiz table
export async function allHostedQuizzes(id: string) {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return await prisma.hostedQuizzes.findMany({
      where: {
        hostId: id,
        start_date: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        id: true,
        start_date: true,
        quiz_id: {
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
        },
        _count: {
          select: {
            players: true,
          },
        },
      },
      orderBy: {
        start_date: "desc",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

//find host quiz by hostQuizId
export async function findHostQuizById(hostQuizId: string) {
  try {
    const hostedQuiz = await prisma.hostedQuizzes.findUnique({
      where: { id: hostQuizId },
      include: {
        quiz_id: {
          include: {
            questions: {
              select: {
                points: true,
              },
            },
          },
        },
        players: {
          select: {
            fullName: true,
            score: true,
          },
        },
      },
    });

    if (!hostedQuiz) return null;

    // calculate total quiz points
    const totalQuizPoints = hostedQuiz.quiz_id.questions.reduce(
      (sum, q) => sum + q.points,
      0
    );

    // calculate each player percentage
    const playersWithPercentage = hostedQuiz.players.map((player) => ({
      ...player,
      percentage: Math.round((player.score / totalQuizPoints) * 100),
    }));

    // calculate average
    const totalScore = hostedQuiz.players.reduce((sum, p) => sum + p.score, 0);
    const averageScore =
      hostedQuiz.players.length > 0
        ? totalScore / hostedQuiz.players.length
        : 0;
    const averagePercentage = Math.round(
      (averageScore / totalQuizPoints) * 100
    );

    return {
      id:hostedQuiz.id,
      quizid:hostedQuiz.quiz_id.id,
      title: hostedQuiz.quiz_id.title,
      description : hostedQuiz.quiz_id.description,
      difficulty : hostedQuiz.quiz_id.difficulty,
      start_date : hostedQuiz.start_date,
      totalQuestions:hostedQuiz.quiz_id.questions.length,
      totalQuizPoints,
      players: playersWithPercentage,
      stats: {
        totalPlayers: hostedQuiz.players.length,
        averageScore: Math.round(averageScore),
        averagePercentage,
      },
    };
  } catch (err) {
    console.log(err);
  }
}

// get all the saved Quizzes
export async function allSavedQuizzes(userId: string) {
  try {
    return await prisma.savedQuiz.findMany({
      where: { userId: userId },
      select: {
        quiz: {
          select: {
            id: true,
            title: true,
            difficulty: true,
            _count: {
              select: {
                questions: true,
              },
            },
            hostedQuizzes: {
              select: {
                _count: {
                  select: {
                    players: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}

// get all the quizzes created by you
export async function allYourQuizzes(userId: string) {
  try {
    return await prisma.quiz.findMany({
      where: { userId: userId },
      select: {
        id: true,
        title: true,
        difficulty: true,
        _count: {
          select: {
            questions: true,
          },
        },
        hostedQuizzes: {
          select: {
            _count: {
              select: {
                players: true,
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
}

//delete quiz from quiz table
export function deleteQuiz() {}
