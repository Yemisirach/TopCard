// action/app.ts

import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import organizationRoutes from "./router/organizationRoutes";

const app: Express = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Only accept requests with Content-Type: application/json
app.use(express.json({ type: "application/json" }));

app.use("/api", organizationRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
  res.json({
    redirect: `/`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
