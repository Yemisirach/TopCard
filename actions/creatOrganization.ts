// server.ts
import express from "express";
import cors from "cors";
import { db } from "@/lib/db";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/organizations", async (req, res) => {
  try {
    const { name, profileImage } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: "Please provide organization name" });
    }

    const newOrganization = await db.Organization.create({
      data: {
        name,
        profileImage,
      },
    });

    return res.status(201).json(newOrganization);
  } catch (error) {
    console.error("Error creating organization:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
