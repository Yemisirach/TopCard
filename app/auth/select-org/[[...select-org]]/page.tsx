"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { OrganizationList } from "@/app/(platform)/(dashboard)/createOrganization/_components/organization-list";

export default function CreateOrganizationPage() {
  const router = useRouter();

  // Function to handle redirection
  const handleRedirect = (url: string) => {
    router.push(url); // Redirect to the specified URL
  };

  return (
    <OrganizationList
      afterSelectOrganizationUrl="/organization/:id"
      onOrganizationSelect={(organizationId: string) =>
        handleRedirect(`/organization/${organizationId}`)
      }
    />
  );
}
