// action/routes/organizationRoutes.ts

import express from "express";
import { createOrganization } from "../controllers/organizationController";

const router = express.Router();

router.post("/organizations", createOrganization);

export default router;
