// schema.ts

import { z } from "zod";

// Zod schema for organization creation input
export const CreateOrganization = z.object({
  name: z.string(),
  imageUrl: z.string().optional(),
  userId: z.string(),
});

// Zod schema for organization data
export const Organization = z.object({
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  userId: z.string(),
  // Add other fields as needed
});
