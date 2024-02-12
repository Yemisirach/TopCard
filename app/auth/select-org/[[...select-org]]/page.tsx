"use client";
import React from "react";
import { useRouter } from "next/router"; // Import `useRouter` from 'next/router'
import { OrganizationList } from "@/app/(platform)/(dashboard)/createOrganization/_components/organization-list";

export default function CreateOrganizationPage() {
  const router = useRouter();
  const { id } = router.query; // Get the organization ID from the URL parameters

  // Function to handle redirection and save organization ID to local storage
  const handleOrganizationSelect = (organizationId: string) => {
    // Save organization ID to local storage
    localStorage.setItem("organizationId", organizationId);

    // Redirect to the specified URL
    router.push(`/organization/${organizationId}`);
  };

  return (
    <OrganizationList
      afterSelectOrganizationUrl="/organization/:id"
      onOrganizationSelect={handleOrganizationSelect}
    />
  );
}
