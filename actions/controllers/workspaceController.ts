// backend/controllers/workspaceController.ts
import { db } from "@/lib/db";
import { Workspace, UserWorkspace } from "@prisma/client";

export const createWorkspace = async (
  name: string,
  userId: number
): Promise<Workspace> => {
  try {
    const createdWorkspace = await db.workspace.create({
      data: {
        name,
        members: {
          create: {
            userId: userId.toString(),
            role: "ADMIN",
            accepted: true,
          },
        },
      },
    });

    return createdWorkspace;
  } catch (error) {
    console.error(`Error creating workspace: ${(error as Error).message}`);
    throw new Error("Failed to create workspace");
  }
};

export const getUserWorkspaces = async (
  userId: string
): Promise<UserWorkspace[]> => {
  try {
    const userWorkspaces = await db.userWorkspace.findMany({
      where: { userId },
      include: { workspace: true },
    });

    return userWorkspaces;
  } catch (error) {
    console.error(
      `Error fetching user workspaces: ${(error as Error).message}`
    );
    throw new Error("Failed to fetch user workspaces");
  }
};

export const getWorkspacesByUserId = async (
  userId: number
): Promise<Workspace[]> => {
  try {
    const userWorkspaces = await db.workspace.findMany({
      where: {
        members: {
          some: {
            userId: userId.toString(),
          },
        },
      },
      include: {
        members: true,
        boards: { include: { lists: { include: { cards: true } } } },
      },
    });

    return userWorkspaces;
  } catch (error) {
    console.error(
      `Error fetching workspaces by user ID: ${(error as Error).message}`
    );
    throw new Error("Failed to fetch workspaces");
  }
};
