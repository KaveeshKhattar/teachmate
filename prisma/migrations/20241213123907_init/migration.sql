-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "slot_number" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);
