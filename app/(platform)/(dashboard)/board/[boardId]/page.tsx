// import { redirect } from "next/navigation";

// import { db } from "@/lib/db";

// import { ListContainer } from "./_components/list-container";

// interface BoardIdPageProps {
//   params: {
//     boardId: string;
//   };
// }

// const BoardIdPage = async ({ params }: BoardIdPageProps) => {
//   // const { orgId } = auth();
//   const orgId = "e153fc92-3787-4c83-a166-1b103a506c4a";

//   if (!orgId) {
//     redirect("/board");
//   }

//   const lists = await db.list.findMany({
//     where: {
//       boardId: params.boardId,
//       board: {
//         orgId,
//       },
//     },
//     include: {
//       cards: {
//         orderBy: {
//           order: "asc",
//         },
//       },
//     },
//     orderBy: {
//       order: "asc",
//     },
//   });

//   return (
//     <div className="top-card p-4 h-full overflow-x-auto">
//       <ListContainer boardId={params.boardId} data={lists} />
//     </div>
//   );
// };

// export default BoardIdPage;

import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ListContainer } from "./_components/list-container";
import { useEffect, useState } from "react";

const BoardIdPage: React.FC = () => {
  const router = useRouter();
  const { organizationId, boardId } = router.query;

  if (!organizationId) {
    redirect("/board");
  }

  const fetchLists = async () => {
    try {
      const lists = await db.list.findMany({
        where: {
          boardId: boardId as string,
          board: {
            orgId: organizationId as string,
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
      return lists;
    } catch (error) {
      console.error("Error fetching lists:", error);
      return [];
    }
  };

  const [lists, setLists] = useState<any[]>([]);

  useEffect(() => {
    fetchLists().then(setLists);
  }, []);

  return (
    <div className="top-card p-4 h-full overflow-x-auto">
      <ListContainer boardId={boardId as string} data={lists} />
    </div>
  );
};

export default BoardIdPage;
