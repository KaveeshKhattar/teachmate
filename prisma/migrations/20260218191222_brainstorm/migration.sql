-- CreateTable
CREATE TABLE "RecurringDayAssignment" (
    "id" SERIAL NOT NULL,
    "recurringScheduleId" INTEGER NOT NULL,
    "day" "WeekDay" NOT NULL,
    "studentId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecurringDayAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RecurringDayAssignment_recurringScheduleId_day_idx" ON "RecurringDayAssignment"("recurringScheduleId", "day");

-- CreateIndex
CREATE UNIQUE INDEX "RecurringDayAssignment_recurringScheduleId_day_studentId_key" ON "RecurringDayAssignment"("recurringScheduleId", "day", "studentId");

-- AddForeignKey
ALTER TABLE "RecurringDayAssignment" ADD CONSTRAINT "RecurringDayAssignment_recurringScheduleId_fkey" FOREIGN KEY ("recurringScheduleId") REFERENCES "RecurringSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringDayAssignment" ADD CONSTRAINT "RecurringDayAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
