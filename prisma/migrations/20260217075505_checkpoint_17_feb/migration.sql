-- CreateTable
CREATE TABLE "RecurringException" (
    "id" SERIAL NOT NULL,
    "recurringScheduleId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecurringException_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecurringException_recurringScheduleId_date_key" ON "RecurringException"("recurringScheduleId", "date");

-- AddForeignKey
ALTER TABLE "RecurringException" ADD CONSTRAINT "RecurringException_recurringScheduleId_fkey" FOREIGN KEY ("recurringScheduleId") REFERENCES "RecurringSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
