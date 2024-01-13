"use server";

import { db } from "@/lib/db";
import { Request, Response } from "express";

const express = require("express");
const cors = require("cors");

// Create an instance of Express
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// CORS middleware configuration
app.use(
  cors({
    origin: "http://localhost:3001", // Adjust this based on the actual URL of your Next.js app during development
    credentials: true,
  })
);
// http://localhost:3000/api/organizations

// Route for creating organizations
app.post("/api/organizations", async (req: Request, res: Response) => {
  try {
    const { name, profileImage } = req.body;

    // Validate the request data
    if (!name) {
      return res
        .status(400)
        .json({ error: "Please provide organization name" });
    }

    // Create a new organization in the database using Prisma
    const newOrganization = await db.organization.create({
      data: {
        name,
        profileImage,
      },
    });

    // Respond with the created organization
    return res.status(201).json(newOrganization);
  } catch (error) {
    console.error("Error creating organization:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Start the Express server
const PORT = 3001; // Update the port number
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
