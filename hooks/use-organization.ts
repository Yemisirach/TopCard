"use client"
import { db } from "@/lib/db";
import { useEffect, useState } from "react";
import { Organization } from "./types"; // Adjust the path accordingly

export const useOrganization = () => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Fetch organization details from your API or wherever they are stored
  useEffect(() => {
    // Replace this with your actual Prisma call to fetch organization details
    const fetchOrganization = async () => {
      try {
        const organizationData = await db.organization.findMany();
        // Assuming organizationData is an array, you may want to pick the first item or handle multiple items appropriately
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

export const useOrganizationList = () => {
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
