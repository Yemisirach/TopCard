import { db } from "@/lib/db";

export async function generateMetadata({
  params,
}: {
  params: { orgId: string };
}) {
  const userId = "qwertyuioplkjhgf";
  const orgId = "07557323-5ff3-476d-8d72-a61dc392a294"; // This value seems hardcoded, please make sure it's intended

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const organization = await db.organization.findUnique({
    where: {
      id: params.orgId,
      userId,
    },
  });

  return {
    title: organization?.name || "Organization",
  };
}
