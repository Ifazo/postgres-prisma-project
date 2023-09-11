/*
  Warnings:

  - You are about to drop the `orderedBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderedBook" DROP CONSTRAINT "orderedBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "orderedBook" DROP CONSTRAINT "orderedBook_orderId_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "orderedBook" JSONB[] DEFAULT ARRAY[]::JSONB[];

-- DropTable
DROP TABLE "orderedBook";
