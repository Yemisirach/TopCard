// pages/workspaces/[id].tsx
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { useRouter } from "next/router";
import { Workspace } from "@prisma/client";
import { getSession, useSession } from "next-auth/react";
import { db } from "@/lib/db";
import { useEffect, useState } from "react";
import WorkspaceList from "@/components/WorkspaceList";
import { auth } from "@/auth";

interface WorkspacePageProps {
  userWorkspaces: Workspace[];
  session: {
    user: {
      id: string;
      name: string;
      role: string;
      // Add other session user properties as needed
    };
    // Add other session properties as needed
  } | null;
}

interface WorkspaceData {
  workspace: Workspace;
}

export const getServerSideProps: GetServerSideProps<
  WorkspacePageProps
> = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<WorkspacePageProps>> => {
  // const session = await getSession(context);
  const session = await auth();
  console.log(session, "session");

  return {
    props: {
      session,
      userWorkspaces: [], // Replace with your actual data
    },
  };
};

export default function WorkspacePage({
  userWorkspaces,
  session,
}: WorkspacePageProps) {
  const router = useRouter();
  const { id } = router.query;

  const { data: sessionData, status, loading } = useSession();

  const [workspace, setWorkspace] = useState<WorkspaceData | null>(null);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        if (id && sessionData?.user?.id) {
          const workspaceData = await db.workspace.findUnique({
            where: { id: Number(id) },
          });

          if (workspaceData) {
            setWorkspace({ workspace: workspaceData });
          } else {
            console.error("Workspace not found");
          }
        }
      } catch (error) {
        console.error("Error fetching workspace:", error);
      }
    };

    fetchWorkspace();
  }, [id, sessionData]);

  if (loading || status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{workspace?.workspace.name} Workspace</h1>
      {/* Add logic here to display boards, lists, and cards */}
      hi yemi
      <WorkspaceList />
    </div>
  );
}
