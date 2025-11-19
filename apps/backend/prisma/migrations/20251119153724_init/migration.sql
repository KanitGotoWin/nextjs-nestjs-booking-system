-- CreateTable
CREATE TABLE "BookingConfig" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "BookingConfig_pkey" PRIMARY KEY ("id")
);
