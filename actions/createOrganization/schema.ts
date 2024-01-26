// schema.ts

import { z } from "zod";

// Zod schema for organization creation input
export const CreateOrganization = z.object({
  name: z.string(),
  imageUrl: z.string().optional(),
});

// Zod schema for organization data
export const Organization = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
});
