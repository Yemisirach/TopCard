// api/workspaces.ts

import db from "@/lib/db";

export const fetchUserWorkspaces = async (userId: number) => {
  try {
    // Replace this query with your actual Prisma query to fetch user workspaces
    const userWorkspaces = await db.workspace.findMany({
      where: { userId: userId },
      // Include any necessary relations or additional query parameters
    });

    return userWorkspaces;
  } catch (error) {
    throw new Error(
      "Error fetching user workspaces"
      // :
      // {error.message}
    );
  }
};
