import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";

import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const orgId = "4213bdcc-01e9-4845-9ac8-3844a23ee849";

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const orgId = "4213bdcc-01e9-4845-9ac8-3844a23ee849";

  if (!orgId) {
    redirect("/createOrganization");
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">
        {/* {children} */}
        hi yemileeee
      </main>
    </div>
  );
};

export default BoardIdLayout;
