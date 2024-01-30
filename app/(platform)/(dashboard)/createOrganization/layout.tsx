// This file should be in a directory where server components are allowed
"use server";

import { db } from "@/lib/db";
import { OrgNavbar } from "./_components/org-navbar";
// import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

const OrganizationIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { orgId: string };
}) => {
//   const userId = "qwertyuioplkjhgf";
//   //   let organization;

//   //   try {
//   const organization = await db.organization.findUnique({
//     where: {
//       id: params.orgId,
//       userId,
//     },
//   });

  //     // Log organization details for debugging
  //     console.log("Organization:", organization);
  //   } catch (error: any) {
  //     console.error("Error fetching organization:", error);
  //     // throw new Error(`Error fetching organization: ${error.message || error}`);
  //   }

//   if (!organization || organization.id === undefined) {
//     // Throw an error if organization or its id is not found
//     // throw new Error("Organization not found");
//     console.error("Error fetching organization:");
//   }

//   const orgId = organization.id;

//   if (!orgId) {
//     revalidatePath("/organization/setting");
//     return null; // Add a return statement here to avoid further execution
//   }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
    //   style={{ backgroundImage: `url(${organization.imageFullUrl})` }}
    >
      {/* <OrgNavbar data={organization} /> */}
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default OrganizationIdLayout;
