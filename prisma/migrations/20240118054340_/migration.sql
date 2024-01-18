-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "profileImage" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);
