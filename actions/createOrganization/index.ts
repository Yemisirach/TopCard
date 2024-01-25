// index.ts

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { CreateOrganization } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async ({
  name,
  imageUrl,
  userId,
}: InputType & { userId: string }): Promise<ReturnType> => {
  try {
    if (!userId) {
      return {
        error: "Unauthorized",
      };
    }

    // Basic validation
    if (!name) {
      return {
        error: "Please provide a name for the organization.",
      };
    }

    // Assuming you have an "organizations" table in your database
    const organization = await db.organization.create({
      data: {
        name,
        imageUrl: imageUrl || null, // Handle imageUrl as optional
        // userId,
      },
    });

    await createAuditLog({
      entityTitle: organization.name,
      entityId: organization.id,
      entityType: ENTITY_TYPE.ORGANIZATION,
      action: ACTION.CREATE,
    });

    revalidatePath(`/organization/${organization.id}`);

    return { data: organization };
  } catch (error) {
    console.error("Failed to create organization:", error);

    return {
      error: "Failed to create organization. Please try again.",
    };
  }
};

export const createOrganization = createSafeAction(CreateOrganization, handler);
