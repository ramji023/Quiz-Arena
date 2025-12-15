/*
  Warnings:

  - You are about to drop the column `totalPlayers` on the `HostedQuizzes` table. All the data in the column will be lost.
  - You are about to drop the column `players` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HostedQuizzes" DROP COLUMN "totalPlayers";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "players";
