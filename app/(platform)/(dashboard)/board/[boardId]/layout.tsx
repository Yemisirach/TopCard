// import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string; orgId: string };
}) {
  // const orgId = "e153fc92-3787-4c83-a166-1b103a506c4a";

  if (!params.orgId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId: params.orgId,
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
  params: { boardId: string; orgId: string };
}) => {
  // const orgId = "e153fc92-3787-4c83-a166-1b103a506c4a";

  if (!params.orgId) {
    redirect("/board/setting");
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId: params.orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative  bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;

// "use client";
// import { useRouter } from "next/router";
// import { notFound, redirect } from "next/navigation";
// import { db } from "@/lib/db";
// import { BoardNavbar } from "./_components/board-navbar";

// const BoardIdLayout: React.FC<{
//   children: React.ReactNode;
//   params: { boardId: string };
// }> = async ({ children, params }) => {
//   // Mark the function as async here
//   const router = useRouter();
//   const { orgId } = router.query;

//   // Ensure orgId is present
//   if (!orgId) {
//     redirect("/board/setting");
//   }

//   const fetchBoard = async () => {
//     try {
//       const board = await db.board.findUnique({
//         where: {
//           id: params.boardId,
//           orgId: orgId as string,
//         },
//       });
//       return board;
//     } catch (error) {
//       console.error("Error fetching board:", error);
//       return null;
//     }
//   };

//   const board = await fetchBoard();

//   if (!board) {
//     notFound();
//   }
//   localStorage.setItem("orgId", orgId as string);
//   return (
//     <div
//       className="relative  bg-no-repeat bg-cover bg-center"
//       style={{ backgroundImage: `url(${board.imageFullUrl})` }}
//     >
//       <BoardNavbar data={board} />
//       <div className="absolute inset-0 bg-black/10" />
//       <main className="relative pt-28 h-full">{children}</main>
//     </div>
//   );
// };

// export default BoardIdLayout;
