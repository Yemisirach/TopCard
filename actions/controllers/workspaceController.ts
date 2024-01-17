// backend/controllers/workspaceController.ts

import { db } from "@/lib/db";

export const createWorkspace = async (name: string, userId: number) => {
  return db.workspace.create({
    data: {
      name,
      userId,
    },
  });
};

export const getUserWorkspaces = async (userId: string) => {
  return db.userWorkspace.findMany({
    where: { userId },
    include: { workspace: true },
  });
};
export const getWorkspacesByUserId = async (userId: number) => {
  return db.workspace.findMany({
    where: {
      userId,
    },
  });
};
