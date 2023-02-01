-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "postingTimestamp" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "postingHours" INTEGER[];
