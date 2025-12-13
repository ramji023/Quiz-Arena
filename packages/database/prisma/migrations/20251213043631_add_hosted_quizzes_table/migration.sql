-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "players" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "HostedQuizzes" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hostId" TEXT NOT NULL,
    "totalPlayers" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "HostedQuizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizPlayer" (
    "id" TEXT NOT NULL,
    "host_quiz_id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "QuizPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizPlayer_host_quiz_id_playerId_key" ON "QuizPlayer"("host_quiz_id", "playerId");

-- AddForeignKey
ALTER TABLE "HostedQuizzes" ADD CONSTRAINT "HostedQuizzes_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HostedQuizzes" ADD CONSTRAINT "HostedQuizzes_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizPlayer" ADD CONSTRAINT "QuizPlayer_host_quiz_id_fkey" FOREIGN KEY ("host_quiz_id") REFERENCES "HostedQuizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
