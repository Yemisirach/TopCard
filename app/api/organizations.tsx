// src/pages/api/organizations.ts

import { NextApiRequest, NextApiResponse } from "next";
import Organization from "../../models/Organization";
import { db } from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { name, imageUrl } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ error: "Please provide organization name" });
      }

      const newOrganization: Organization = await db.organization.create({
        data: {
          name,
          imageUrl,
        },
      });

      return res.status(201).json(newOrganization);
    } catch (error) {
      console.error("Error creating organization:", error);
      return res.status(500).json({ error: "Internal yemi server error" });
    }
  } else {
    // Handle other HTTP methods if needed
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
