// app/api/workspaces/create.ts
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { workspaceName, profileImage } = req.body;

    try {
      const newWorkspace = await db.workspace.create({
        data: {
          name: workspaceName,
          profileImage: profileImage, // Include the profileImage in the database operation
        },
      });

      res.status(200).json(newWorkspace);
    } catch (error: any) {
      console.error("Error creating workspace:", error);
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
