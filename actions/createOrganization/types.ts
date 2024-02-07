import { z } from "zod";
import { Organization } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { CreateOrganization } from "./schema";

export type InputType = z.infer<typeof CreateOrganization>;

// Update ReturnType to include the revalidate property
export type ReturnType = ActionState<InputType, Organization> & {
  revalidate?: number;
};
