"use client";
import { db } from "@/lib/db";
import { useEffect, useState } from "react";
import { Organization } from "./types"; // Adjust the path accordingly
interface OrganizationHookResult {
  organization: Organization | null;
  isLoaded: boolean;
}

export const useOrganization = (): OrganizationHookResult => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const organizationData = await db.organization.findMany();
        const data = organizationData.length > 0 ? organizationData[0] : null;

        setOrganization(data);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching organization details:", error);
        setIsLoaded(true);
      }
    };

    fetchOrganization();
  }, []);

  return { organization, isLoaded };
};

interface OrganizationListHookResult {
  organizations: Organization[];
  isLoaded: boolean;
}

export const useOrganizationList = (): OrganizationListHookResult => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchOrganizationList = async () => {
      try {
        const organizationData = await db.organization.findMany();
        setOrganizations(organizationData);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error fetching organization list:", error);
        setIsLoaded(true);
      }
    };

    fetchOrganizationList();
  }, []);

  return { organizations, isLoaded };
};
