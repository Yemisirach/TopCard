"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@/hooks/use-all-models";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

import { NavItem, Organization } from "./nav-item";

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
  console.log("🚀 ~ Sidebar ~ activeOrganization:", activeOrganization);
  console.log("🚀 ~ Sidebar ~isLoadedOrg:", isLoadedOrg);

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList();
  console.log("🚀 ~ Sidebar ~ userMemberships:", userMemberships);

  // const organizationState = useOrganization();
  // const organizationListState = useOrganizationList();

  // console.log("Organization State:", organizationState);
  // console.log("Organization List State:", organizationListState);

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

  if (
    !isLoadedOrg ||
    !isLoadedOrgList ||
    !userMemberships ||
    userMemberships.isLoading
  ) {
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

  // Create a mapping of organization IDs to organizations for easier lookup
  const organizationMap: Record<string, Organization> = {};
  console.log("🚀 ~ Sidebar ~ organizationMap:", organizationMap);
  userMemberships.data.forEach((membership) => {
    organizationMap[membership.organizationId] = membership.organization;
  });

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
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map((membership) => {
          const organization = organizationMap[membership.organizationId];
          return (
            <NavItem
              key={organization.id}
              isActive={activeOrganization?.id === organization.id}
              isExpanded={expanded[organization.id]}
              organization={organization}
              onExpand={onExpand}
            />
          );
        })}
      </Accordion>
    </>
  );
};
