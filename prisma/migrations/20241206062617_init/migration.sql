-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "numberDaysAttendPerWeek" INTEGER;

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "slot" INTEGER NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);
