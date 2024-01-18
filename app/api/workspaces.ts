// api/workspaces.ts
import { db } from "@/lib/db";

export const fetchUserWorkspaces = async (userId: string) => {
  try {
    const userWorkspaces = await db.user.findUnique({
      where: { id: userId },
      include: {
        workspaces: {
          include: {
            workspace: true,
          },
        },
      },
    });

    if (!userWorkspaces) {
      throw new Error("User not found");
    }

    const workspaces =
      userWorkspaces.workspaces?.map(
        (userWorkspace) => userWorkspace.workspace
      ) || [];
    return workspaces;
  } catch (error: any) {
    // Assuming 'error' is an instance of the 'Error' class
    throw new Error(`Error fetching user workspaces: ${error.message}`);
  }
};
