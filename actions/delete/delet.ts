"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deletorg(id: string) {
  await db.organization.delete({
    where: {
      id,
    },
  });
  revalidatePath("organization/12345");
}
