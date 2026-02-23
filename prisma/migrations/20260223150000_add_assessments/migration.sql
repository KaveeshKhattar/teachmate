-- CreateEnum
CREATE TYPE "AssessmentSource" AS ENUM ('TUITION', 'SCHOOL');

-- CreateTable
CREATE TABLE "Assessment" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "source" "AssessmentSource" NOT NULL,
    "subject" TEXT NOT NULL,
    "title" TEXT,
    "score" DOUBLE PRECISION NOT NULL,
    "maxScore" DOUBLE PRECISION NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "createdByRole" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Assessment_studentId_takenAt_idx" ON "Assessment"("studentId", "takenAt");

-- CreateIndex
CREATE INDEX "Assessment_teacherId_takenAt_idx" ON "Assessment"("teacherId", "takenAt");

-- CreateIndex
CREATE INDEX "Assessment_studentId_source_takenAt_idx" ON "Assessment"("studentId", "source", "takenAt");

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
