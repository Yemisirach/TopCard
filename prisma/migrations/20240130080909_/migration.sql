/*
  Warnings:

  - The values [CHECKLISTITEM] on the enum `ENTITY_TYPE` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `image` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `imageFullUrl` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLinkHTML` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageThumbUrl` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUserName` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ENTITY_TYPE_new" AS ENUM ('BOARD', 'LIST', 'CARD', 'ORGANIZATION');
ALTER TABLE "AuditLog" ALTER COLUMN "entityType" TYPE "ENTITY_TYPE_new" USING ("entityType"::text::"ENTITY_TYPE_new");
ALTER TYPE "ENTITY_TYPE" RENAME TO "ENTITY_TYPE_old";
ALTER TYPE "ENTITY_TYPE_new" RENAME TO "ENTITY_TYPE";
DROP TYPE "ENTITY_TYPE_old";
COMMIT;

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "image",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageFullUrl" TEXT NOT NULL,
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "imageLinkHTML" TEXT NOT NULL,
ADD COLUMN     "imageThumbUrl" TEXT NOT NULL,
ADD COLUMN     "imageUserName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orgId" TEXT,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserSettings_userId_idx" ON "UserSettings"("userId");

-- CreateIndex
CREATE INDEX "UserSettings_orgId_idx" ON "UserSettings"("orgId");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
