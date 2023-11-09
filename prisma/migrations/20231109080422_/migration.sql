/*
  Warnings:

  - You are about to drop the column `email` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `wishlists` table. All the data in the column will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `password` on table `admins` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `image` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `service` to the `wishlists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_user_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_email_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_email_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_product_fkey";

-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "email",
DROP COLUMN "product",
ADD COLUMN     "service" TEXT NOT NULL,
ADD COLUMN     "user" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;

-- AlterTable
ALTER TABLE "wishlists" DROP COLUMN "product",
ADD COLUMN     "service" TEXT NOT NULL;

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "products";

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "user" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "histories" (
    "id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_category_fkey" FOREIGN KEY ("category") REFERENCES "categories"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_service_fkey" FOREIGN KEY ("service") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_service_fkey" FOREIGN KEY ("service") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "histories" ADD CONSTRAINT "histories_service_fkey" FOREIGN KEY ("service") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_service_fkey" FOREIGN KEY ("service") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
