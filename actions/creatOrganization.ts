// // server.js

// import express from "express";
// import cors from "cors";
// import { db } from "@/lib/db";
// import { Request, Response } from "express";

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Adjust based on the actual URL of your React app during development
//     credentials: true,
//   })
// );

// app.post("/api/organizations", async (req: Request, res: Response) => {
//   try {
//     const { name, imageUrl } = req.body;

//     if (!name) {
//       return res
//         .status(400)
//         .json({ error: "Please provide organization name" });
//     }

//     const newOrganization = await db.organization.create({
//       data: {
//         name,
//         imageUrl,
//       },
//     });

//     return res.status(201).json(newOrganization);
//   } catch (error) {
//     console.error("Error creating organization:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.use((err, req, res, next) => {
//   console.error("Error:", err);
//   return res.status(500).json({ error: "Internal server error" });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// src/app.ts


