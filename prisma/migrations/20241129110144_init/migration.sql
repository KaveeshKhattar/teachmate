-- CreateTable
CREATE TABLE "Test_Tuition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "syllabus" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "marks_scored" INTEGER NOT NULL,
    "total_marks" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "Test_Tuition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test_School" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "syllabus" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "marks_scored" INTEGER NOT NULL,
    "total_marks" INTEGER NOT NULL,
    "test_status" BOOLEAN NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "Test_School_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Test_Tuition" ADD CONSTRAINT "Test_Tuition_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test_Tuition" ADD CONSTRAINT "Test_Tuition_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test_School" ADD CONSTRAINT "Test_School_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
