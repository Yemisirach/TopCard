import { NextApiRequest, NextApiResponse } from "next";
import { createWorkspace, getWorkspacesByUserId } from "../controllers/workspaceController";
import { checkAccessControl } from "../middleware/auth";

interface ExtendedNextApiRequest extends NextApiRequest {
  user: { id: number }; // Adjust the type to match the expected type in createWorkspace
}

export default async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  try {
    // Apply the access control middleware
    await checkAccessControl(req, res);

    if (req.method === "POST") {
      const { name } = req.body;

      try {
        const workspace = await createWorkspace(name, req.user.id);
        return res.status(201).json(workspace);
      } catch (error) {
        console.error("Error creating workspace:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else if (req.method === "GET") {
      try {
        const workspaces = await getWorkspacesByUserId(req.user.id);
        return res.status(200).json(workspaces);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error applying access control middleware:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
