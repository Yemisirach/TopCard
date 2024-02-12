/*
  Warnings:

  - You are about to drop the column `createdAt` on the `OrganizationInvitation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `OrganizationInvitation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrganizationInvitation" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "orgId" TEXT;
