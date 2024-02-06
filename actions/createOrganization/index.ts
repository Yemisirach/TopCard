"use server";
import { auth } from "@/auth";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateOrganization } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    const session = await auth();

    if (!session) {
      return {
        error: "unauthorized",
      };
    }

    const { name, image } = data;

    const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
      image.split("|");

    if (
      !imageId ||
      !imageThumbUrl ||
      !imageFullUrl ||
      !imageUserName ||
      !imageLinkHTML
    ) {
      return {
        error: "Missing fields. Failed to create board.",
      };
    }

    const userId = session?.user?.id;

    if (userId === undefined) {
      return {
        error: "User ID is undefined",
      };
    }

    let organization;
    try {
      organization = await db.organization.create({
        data: {
          name,
          userId,
          imageId,
          imageThumbUrl,
          imageFullUrl,
          imageUserName,
          imageLinkHTML,
        },
      });

      // Update session with organization ID
      if (session.user) {
        session.user.organizations = [
          ...(session.user.organizations || []),
          organization.id,
        ];
      }

      await db.userSettings.update({
        where: { id: userId },
        data: { orgId: organization.id },
      });

      await createAuditLog({
        entityTitle: organization.name,
        entityId: organization.id,
        entityType: ENTITY_TYPE.ORGANIZATION,
        action: ACTION.CREATE,
      });
    } catch (error: any) {
      console.error("Error creating the organization:", error);

      if (
        error.code === "P2002" &&
        error.meta?.target?.includes("unique constraint")
      ) {
        return {
          error: "Organization with the same name already exists.",
        };
      }

      return {
        error: "Error creating the organization.",
      };
    }

    revalidatePath(`/organization/${organization.id}`);
    return { data: organization };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: "Unexpected error occurred.",
    };
  }
};

export const CreateOrganizations = createSafeAction(
  CreateOrganization,
  handler
);
