// controllers/organizationController.ts

import { Request, Response } from "express";
import Organization from "../models/Organization";
import { db } from "@/lib/db";

export const createOrganization = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, imageUrl } = req.body;

    if (!name) {
      res.status(400).json({ error: "Please provide organization name" });
      return;
    }

    // Assuming someNumericId is a number, convert it to a string
    //@ts-ignore
    const newOrganization: Organization = await db.organization.create({
      data: {
        name,
        imageUrl,
        //@ts-ignore
        id: String(someNumericId),
      },
    });

    res.status(201).json(newOrganization);
  } catch (error) {
    console.error("Error creating organization:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
