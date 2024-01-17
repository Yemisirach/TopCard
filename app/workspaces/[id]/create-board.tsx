// pages/workspaces/[id]/create-board.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { db } from "@/lib/db";

type BoardCreateInput = {
  name: string;
  // ... other properties
};
export default function CreateBoard() {
  const router = useRouter();
  const { id } = router.query;
  const [boardName, setBoardName] = useState("");

  const createBoard = async () => {
    if (!id || typeof id !== "string") {
      console.error("Invalid workspace ID");
      return;
    }

    const newBoard = await db.board.create({
      data: { name: boardName, workspaceId: id !== null ? String(id) : undefined },
    });
// router.push(`/workspaces/${id}/boards/${newBoard.id

    router.push(`/workspaces/${id}`);
  };

  return (
    <div>
      <h1>Create a Board</h1>
      <input
        type="text"
        placeholder="Board Name"
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
      />
      <button onClick={createBoard}>Create Board</button>
    </div>
  );
}
