// schema.ts

import { z } from "zod";

export const OrganizationSchema = z.object({
  name: z.string(),
  imageUrl: z.string().optional(), // Assuming the profile image is a URL, adjust as needed
});
