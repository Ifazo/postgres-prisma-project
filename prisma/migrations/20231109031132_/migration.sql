/*
  Warnings:

  - The values [admin,superadmin] on the enum `ADMIN_Role` will be removed. If these variants are still used in the database, this will fail.
  - The values [user,buyer,seller] on the enum `USER_Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ADMIN_Role_new" AS ENUM ('ADMIN', 'SUPER_ADMIN');
ALTER TABLE "admins" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "admins" ALTER COLUMN "role" TYPE "ADMIN_Role_new" USING ("role"::text::"ADMIN_Role_new");
ALTER TYPE "ADMIN_Role" RENAME TO "ADMIN_Role_old";
ALTER TYPE "ADMIN_Role_new" RENAME TO "ADMIN_Role";
DROP TYPE "ADMIN_Role_old";
ALTER TABLE "admins" ALTER COLUMN "role" SET DEFAULT 'ADMIN';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "USER_Role_new" AS ENUM ('USER');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "USER_Role_new" USING ("role"::text::"USER_Role_new");
ALTER TYPE "USER_Role" RENAME TO "USER_Role_old";
ALTER TYPE "USER_Role_new" RENAME TO "USER_Role";
DROP TYPE "USER_Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "admins" ALTER COLUMN "role" SET DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER';
