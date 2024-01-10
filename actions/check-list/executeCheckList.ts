import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { CreateChecklistItem, UpdateChecklistItem } from "./schema";

export const executeCheckList = createSafeAction(
  CreateChecklistItem,
  async (data) => {
    const { cardId, boardId, name } = data;
    const checklistItem = await db.checklistItem.create({
      data: {
        cardId,
        boardId,
        name,
        checked: false,
      },
    });
    return { data: checklistItem };
  }
);

export const updateChecklistItem = createSafeAction(
  UpdateChecklistItem,
  async (data) => {
    const { id, checked } = data;
    const updatedChecklistItem = await db.checklistItem.update({
      where: { id },
      data: { checked },
    });
    return { data: updatedChecklistItem };
  }
);
