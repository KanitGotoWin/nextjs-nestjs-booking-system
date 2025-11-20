/*
  Warnings:

  - You are about to drop the column `status` on the `bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "status",
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- DropEnum
DROP TYPE "BookingStatus";

-- DropEnum
DROP TYPE "BookingTypeStatus";
