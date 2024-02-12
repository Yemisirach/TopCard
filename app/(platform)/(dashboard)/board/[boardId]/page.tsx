import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { ListContainer } from "./_components/list-container";

interface BoardIdPageProps {
  params: {
    boardId: string;
    orgId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  // const orgId = "4213bdcc-01e9-4845-9ac8-3844a23ee849";
  const { orgId } = params;
  if (!orgId) {
    redirect("/createOrganization");
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer boardId={params.boardId} data={lists} />
      hi yemi
    </div>
  );
};

export default BoardIdPage;
