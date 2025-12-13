import { prisma } from "@repo/database";

type hostQuizData = {
  quiz_id: string;
  hostId: string;
};
// create entry in HostedQuizzes table
export async function createHostedQuizEntry(hostQuizData: hostQuizData) {
  try {
    return await prisma.hostedQuizzes.create({
      data: {
        quizId: hostQuizData.quiz_id,
        hostId: hostQuizData.hostId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

type player = {
  playerId: string;
  name: string;
  score: number;
};
// create new player in QuizPlayer table
export async function createPlayer({
  player,
  hostId,
}: {
  player: player;
  hostId: string;
}) {
  try {
    return await prisma.quizPlayer.create({
      data: {
        host_quiz_id: hostId,
        playerId: player.playerId,
        fullName: player.name,
        score: player.score,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
