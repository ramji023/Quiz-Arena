-- CreateTable
CREATE TABLE "SavedQuiz" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedQuiz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedQuiz" ADD CONSTRAINT "SavedQuiz_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedQuiz" ADD CONSTRAINT "SavedQuiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
