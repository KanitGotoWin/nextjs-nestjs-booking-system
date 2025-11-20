/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bookings_name_key" ON "bookings"("name");

-- CreateIndex
CREATE UNIQUE INDEX "bookings_email_key" ON "bookings"("email");
