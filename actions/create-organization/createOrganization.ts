// createOrganization.ts

import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";
import { OrganizationSchema } from "./schema";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { name, imageUrl } = data;

  if (!name) {
    return {
      error: "Organization name is required.",
    };
  }

  let organization;

  try {
    organization = await db.organization.create({
      data: {
        name,
        imageUrl,
      },
    });

    await createAuditLog({
      entityTitle: organization.name,
      entityId: organization.id,
      entityType: ENTITY_TYPE.ORGANIZATION,
      action: ACTION.CREATE,
    });
    revalidatePath(`/organization/${organization.id}`);
  } catch (error) {
    return {
      error: "Failed to create organization.",
    };
  }

  return { data: organization };
};

export const createOrganization = createSafeAction(OrganizationSchema, handler);
