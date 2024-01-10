import { z } from 'zod';

export const CreateChecklistItem = z.object({
  cardId: z.string(),
  boardId: z.string(),
  name: z.string(),
});

export const UpdateChecklistItem = z.object({
  id: z.string(),
  checked: z.boolean(),
});