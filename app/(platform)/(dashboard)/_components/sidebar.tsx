// Sidebar.tsx
"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { NavItem } from "./nav-item";
import { useOrganization, useOrganizationList } from "@/hooks/use-organization"; // Adjust the path accordingly

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();
  const { organizations: userMemberships, isLoaded: isLoadedOrgList } =
    useOrganizationList();

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/createOrganization">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.map((organization) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};
// "use client";

// import React from "react";
// import Link from "next/link";
// import { Plus } from "lucide-react";
// import { useLocalStorage } from "usehooks-ts";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Accordion } from "@/components/ui/accordion";
// import { NavItem } from "./nav-item";
// import useCombinedStore from "@/hooks/use-organization";
// import { currentUser } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { db } from "@/lib/db";

// interface SidebarProps {
//   storageKey?: string;
// }

// export const Sidebar: React.FC<SidebarProps> = async ({
//   storageKey = "t-sidebar-state",
// }) => {
//   // State for managing expanded sections in accordion
//   const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>(
//     storageKey,
//     {}
//   );

//   // State from the combined store
//   const {
//     organization: activeOrganization,
//     organizations: organizations,
//     isOrganizationLoaded,
//     isOrganizationListLoaded,
//     fetchOrganization,
//     fetchOrganizationList,
//   } = useCombinedStore();
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
//   console.log("🚀 ~ organizations:", organization);

//   // Loading state
//   const isLoading = !isOrganizationLoaded || !isOrganizationListLoaded;

//   // Default accordion value based on expanded state
//   const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
//     (acc: string[], key: string) => {
//       if (expanded[key]) {
//         acc.push(key);
//       }
//       return acc;
//     },
//     []
//   );

//   // Function to handle accordion expansion
//   const onExpand = (id: string) => {
//     setExpanded((curr) => ({
//       ...curr,
//       [id]: !expanded[id],
//     }));
//   };

//   // Fetch organization and organization list data on mount
//   // useEffect(() => {
//   //   fetchOrganization();
//   //   fetchOrganizationList();
//   // }, [fetchOrganization, fetchOrganizationList]);

//   // Render skeleton UI while loading data
//   if (isLoading) {
//     return (
//       <>
//         <div className="flex items-center justify-between mb-2">
//           <Skeleton className="h-10 w-[50%]" />
//           <Skeleton className="h-10 w-10" />
//         </div>
//         <div className="space-y-2">
//           <NavItem.Skeleton />
//           <NavItem.Skeleton />
//           <NavItem.Skeleton />
//         </div>
//       </>
//     );
//   }

//   // Render the sidebar components when data is loaded
//   return (
//     <>
//       <div className="font-medium text-xs flex items-center mb-1">
//         <span className="pl-4">Workspaces</span>
//         {/* Button to add a new organization */}
//         <Button
//           asChild
//           type="button"
//           size="icon"
//           variant="ghost"
//           className="ml-auto"
//         >
//           <Link href="/createOrganization">
//             <Plus className="h-4 w-4" />
//           </Link>
//         </Button>
//       </div>
//       {/* Accordion component to display organization list */}
//       <Accordion
//         type="multiple"
//         defaultValue={defaultAccordionValue}
//         className="space-y-2"
//       >
//         {organization.map((organization) => (
//           <NavItem
//             key={organization.id}
//             isActive={activeOrganization?.id === organization.id}
//             isExpanded={expanded[organization.id]}
//             organization={organization}
//             onExpand={onExpand}
//           />
//         ))}
//       </Accordion>
//     </>
//   );
// };
