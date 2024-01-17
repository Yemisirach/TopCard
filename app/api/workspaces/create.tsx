// pages/api/workspaces/create.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { workspaceName } = req.body;

    try {
      const newWorkspace = await prisma.workspace.create({
        data: { name: workspaceName },
      });

      res.status(200).json(newWorkspace);
    } catch (error) {
      console.error("Error creating workspace:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
