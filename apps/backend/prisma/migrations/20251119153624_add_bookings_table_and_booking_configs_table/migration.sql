-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pending', 'approve', 'cancel');

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'pending',
    "note" TEXT,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
