-- CreateEnum
CREATE TYPE "Quadrant" AS ENUM ('DO_NOW', 'SCHEDULE', 'DELEGATE', 'ELIMINATE');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "quadrant" "Quadrant" NOT NULL DEFAULT 'SCHEDULE';

-- CreateIndex
CREATE INDEX "Task_userId_quadrant_idx" ON "Task"("userId", "quadrant");
