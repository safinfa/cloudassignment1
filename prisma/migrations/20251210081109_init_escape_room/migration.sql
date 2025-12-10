-- CreateTable
CREATE TABLE "EscapeResult" (
    "id" SERIAL NOT NULL,
    "result" TEXT NOT NULL,
    "timeTaken" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EscapeResult_pkey" PRIMARY KEY ("id")
);
