// backend/routes/workspaces.ts
import { NextApiRequest, NextApiResponse } from "next";
import {
  createWorkspace,
  getWorkspacesByUserId,
} from "../controllers/workspaceController";

import {checkAccessControl} from "../../middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Apply the access control middleware
  await checkAccessControl(req, res);

  if (req.method === "POST") {
    const { name } = req.body;

    try {
      const workspace = await createWorkspace(name, req.user.id);
      res.status(201).json(workspace);
    } catch (error) {
      console.error("Error creating workspace:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      const workspaces = await getWorkspacesByUserId(req.user.id);
      res.status(200).json(workspaces);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};
