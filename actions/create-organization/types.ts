// types.ts

import { z } from "zod";
import { Organization } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { OrganizationSchema } from "./schema";

export type InputType = z.infer<typeof OrganizationSchema>;
export type ReturnType = ActionState<InputType, Organization>;
