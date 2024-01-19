// middleware/auth.ts
// "use server";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getSession, GetSessionParams } from "next-auth/react";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const checkAccessControl: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = await getSession({} as GetSessionParams);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Assuming the user role is stored in the session
    const userId = session.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Use Prisma to fetch the user's role
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { role: true }, // Adjust based on your schema
    });

    const userRole = user?.role;

    // Implement your access control logic based on the user's role
    if (!userRole && userRole !== UserRole.ADMIN && userRole !== "superadmin" ) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // If the user has the required role, proceed to the next handler
    // You can call the next handler directly here if needed
  } catch (error) {
    console.error("Error checking access control:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
