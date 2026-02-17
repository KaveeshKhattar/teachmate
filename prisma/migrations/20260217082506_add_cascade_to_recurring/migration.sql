-- DropForeignKey
ALTER TABLE "RecurringDay" DROP CONSTRAINT "RecurringDay_recurringScheduleId_fkey";

-- DropForeignKey
ALTER TABLE "RecurringException" DROP CONSTRAINT "RecurringException_recurringScheduleId_fkey";

-- AddForeignKey
ALTER TABLE "RecurringDay" ADD CONSTRAINT "RecurringDay_recurringScheduleId_fkey" FOREIGN KEY ("recurringScheduleId") REFERENCES "RecurringSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringException" ADD CONSTRAINT "RecurringException_recurringScheduleId_fkey" FOREIGN KEY ("recurringScheduleId") REFERENCES "RecurringSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
