/*
  Warnings:

  - You are about to drop the column `frequecyTweetPosting` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "frequecyTweetPosting",
ADD COLUMN     "frequencyTweetPosting" INTEGER;
