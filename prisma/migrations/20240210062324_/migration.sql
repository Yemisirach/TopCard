-- AlterTable
ALTER TABLE "User" ADD COLUMN     "orgId" TEXT;

-- DropEnum
DROP TYPE "OrganizationEnrollmentMode";

-- CreateTable
CREATE TABLE "OrganizationInvitation" (
    "id" TEXT NOT NULL,
    "invitingUserId" TEXT NOT NULL,
    "invitedEmail" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL,
    "token" TEXT NOT NULL,
    "expiry" TEXT NOT NULL,

    CONSTRAINT "OrganizationInvitation_pkey" PRIMARY KEY ("id")
);
