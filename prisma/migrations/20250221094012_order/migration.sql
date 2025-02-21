/*
  Warnings:

  - You are about to drop the column `orderId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "products" JSONB[];

-- AlterTable
ALTER TABLE "products" DROP COLUMN "orderId";
