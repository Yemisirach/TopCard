// import Link from "next/link";
// import { redirect } from "next/navigation";
// import { HelpCircle, User2 } from "lucide-react";

// import { db } from "@/lib/db";
// import { Hint } from "@/components/hint";
// import { Skeleton } from "@/components/ui/skeleton";
// import { OrgFormPopover } from "@/components/form/organization-form-popover";
// import { currentUser } from "@/lib/auth";
// import Image from "next/image";

// export const OrganizationList = async () => {
//   const user = await currentUser();
//   const userId = user?.id;

//   if (!userId) {
//     return redirect("/createOrganization");
//   }

//   const organization = await db.organization.findMany({
//     where: {
//       userId,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center font-semibold text-lg text-neutral-700">
//         <User2 className="h-6 w-6 mr-2" />
//         Top Workspaces
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3">
//         {organization.map((org) => (
//           <Link key={org.id} href={`/organization/${org.id}`}>
//             <div className="group h-[60px] relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm w-full p-2 overflow-hidden">
//               <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
//               <div className="relative font-semibold flex align-middle text-white">
//                 <Image src="/logo.png" alt="Logo" height={50} width={70} />
//                 <span className="mt-3 -ml-1">
//                   {org?.name
//                     ? org.name.split(" ")[0].charAt(0).toUpperCase() +
//                       org.name.split(" ")[0].slice(1).toLowerCase()
//                     : ""}
//                 </span>
//               </div>
//             </div>
//           </Link>
//         ))}

//         <OrgFormPopover sideOffset={10} side="right">
//           <div
//             role="button"
//             className="h-[60px] bg-gray-300 aspect-video relative w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
//           >
//             <p className="text-sm">Create new Workspace</p>
//             <span className="text-xs"></span>
//             <Hint
//               sideOffset={40}
//               description={`
//                 In Each Workspaces can have unlimited boards.
//               `}
//             >
//               <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
//             </Hint>
//           </div>
//         </OrgFormPopover>
//       </div>
//     </div>
//   );
// };

// OrganizationList.Skeleton = function SkeletonBoardList() {
//   return (
//     <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//       <Skeleton className="aspect-video h-full w-full p-2" />
//     </div>
//   );
// };
"use client";
import React, { useEffect, useState } from "react";
import { HelpCircle, User2 } from "lucide-react";
import { db } from "@/lib/db";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import { OrgFormPopover } from "@/components/form/organization-form-popover";
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Organization {
  id: string;
  name: string;
}

interface OrganizationListProps {
  afterSelectOrganizationUrl: string;
  onOrganizationSelect: (organizationId: string) => void;
}

export const OrganizationList: React.FC<OrganizationListProps> & {
  Skeleton: React.FC;
} = ({ afterSelectOrganizationUrl, onOrganizationSelect }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await currentUser();
        const userId = user?.id;

        if (!userId) {
          return redirect("/auth/select-org");
        }

        const organizationsData = await db.organization.findMany({
          where: {
            userId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        setOrganizations(organizationsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching organizations:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <OrganizationList.Skeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Top Workspaces
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        {organizations.map((org) => (
          <div
            key={org.id}
            onClick={() => onOrganizationSelect(org.id)}
            role="button"
            className="group h-[60px] relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm w-full p-2 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <div className="relative font-semibold flex align-middle text-white">
              <Image src="/logo.png" alt="Logo" height={50} width={70} />
              <span className="mt-3 -ml-1">{org.name}</span>
            </div>
          </div>
        ))}

        <OrgFormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="h-[60px] bg-gray-300 aspect-video relative w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm">Create new Workspace</p>
            <span className="text-xs"></span>
            <Hint
              sideOffset={40}
              description={`
                In Each Workspaces can have unlimited boards.
              `}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </OrgFormPopover>
      </div>
    </div>
  );
};

OrganizationList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid gird-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
