-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SCHEDULE_CHANGE', 'PAYMENT', 'GENERAL');

-- AlterTable
ALTER TABLE "Payment"
ADD COLUMN "proofNote" TEXT,
ADD COLUMN "proofUrl" TEXT;

-- CreateTable
CREATE TABLE "StudentNotification" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'GENERAL',
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "relatedDate" TIMESTAMP(3),
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StudentNotification_studentId_createdAt_idx" ON "StudentNotification"("studentId", "createdAt");

-- CreateIndex
CREATE INDEX "StudentNotification_studentId_readAt_idx" ON "StudentNotification"("studentId", "readAt");

-- AddForeignKey
ALTER TABLE "StudentNotification" ADD CONSTRAINT "StudentNotification_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
