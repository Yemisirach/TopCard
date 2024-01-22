/*
  Warnings:

  - The primary key for the `UserWorkspace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workspaceId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserWorkspace" DROP CONSTRAINT "UserWorkspace_pkey";

-- DropTable
DROP TABLE "Organization";
