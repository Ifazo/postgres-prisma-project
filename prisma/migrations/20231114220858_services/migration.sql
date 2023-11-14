/*
  Warnings:

  - You are about to drop the column `service` on the `bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "service",
ADD COLUMN     "services" JSONB[];
