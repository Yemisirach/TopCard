// api/workspaces.ts

import { db } from "@/lib/db";

export const fetchUserWorkspaces = async (userId: string) => {
  try {
    // Replace this query with your actual Prisma query to fetch user workspaces
    const userWorkspaces = await db.user.findUnique({
      where: { id: userId },
      include: {
        members: {
          include: {
            workspace: true,
          },
        },
      },
    });

    if (!userWorkspaces) {
      throw new Error("User not found");
    }

    return userWorkspaces.members.map((member) => member.workspace);
  } catch (error) {
    throw new Error(`Error fetching user workspaces: ${error.message}`);
  }
};
