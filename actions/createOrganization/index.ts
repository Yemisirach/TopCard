"use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateOrganization } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session) {
    return {
      error: "unauthorized",
    };
  }

  const { name, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  // if (
  //   !imageId ||
  //   !imageThumbUrl ||
  //   !imageFullUrl ||
  //   !imageUserName ||
  //   !imageLinkHTML
  // ) {
  //   return {
  //     error: "Missing fields. Failed to create board.",
  //   };
  // }

  const userId = session?.user?.id;

  if (userId === undefined) {
    return {
      error: "User ID is undefined",
    };
  }

  try {
    const organization = await db.organization.create({
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

    await db.userSettings.update({
      where: { id: userId },
      data: { orgId: organization.id },
    });

    revalidatePath(`/organization/${organization.id}`);
    return { data: organization };
  } catch (error) {
    console.error("Error creating the organization:", error);
    return {
      error: "Error creating the organization.",
    };
  }
};

export const CreateOrganizations = createSafeAction(
  CreateOrganization,
  handler
);
