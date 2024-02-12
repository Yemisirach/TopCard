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



// Combined store using zustand

// import create from "zustand";
// import { db } from "@/lib/db";
// import { Organization } from "./types";

// interface OrganizationStore {
//   organization: Organization | null;
//   isOrganizationLoaded: boolean;
//   fetchOrganization: () => Promise<void>;
// }

// interface OrganizationListStore {
//   organizations: Organization[];
//   isOrganizationListLoaded: boolean;
//   fetchOrganizationList: () => Promise<void>;
// }

// // Combined store using zustand
// interface CombinedStore extends OrganizationStore, OrganizationListStore {}

// const useCombinedStore = create<CombinedStore>((set) => ({
//   // Organization store
//   organization: null,
//   isOrganizationLoaded: false,
//   fetchOrganization: async () => {
//     try {
//       const organizationData = await db.organization.findMany();
//       const data = organizationData.length > 0 ? organizationData[0] : null;
//       set({ organization: data, isOrganizationLoaded: true });
//     } catch (error) {
//       console.error("Error fetching organization details:", error);
//       set({ isOrganizationLoaded: true });
//     }
//   },

//   // Organization list store
//   organizations: [],
//   isOrganizationListLoaded: false,
//   fetchOrganizationList: async () => {
//     try {
//       const organizationData = await db.organization.findMany();
//       set({ organizations: organizationData, isOrganizationListLoaded: true });
//     } catch (error) {
//       console.error("Error fetching organization list:", error);
//       set({ isOrganizationListLoaded: true });
//     }
//   },
// }));

// export default useCombinedStore;

// CombinedComponent.tsx

// export const useOrganization = (): OrganizationHookResult => {
//   const [organization, setOrganization] = useState<Organization | null>(null);
//   const [isLoaded, setIsLoaded] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchOrganization = async () => {
//       try {
//         const organizationData = await db.organization.findMany();
//         const data = organizationData.length > 0 ? organizationData[0] : null;

//         setOrganization(data);
//         setIsLoaded(true);
//       } catch (error) {
//         console.error('Error fetching organization details:', error);
//         setIsLoaded(true);
//       }
//     };

//     fetchOrganization();
//   }, []);

//   return { organization, isLoaded };
// };

// interface OrganizationListHookResult {
//   organizations: Organization[];
//   isLoaded: boolean;
//   createOrganization: (name: string, slug: string) => Promise<Organization>;
//   setActive: (organization: Organization | string) => void;
// }

// export const useOrganizationList = (): OrganizationListHookResult => {
//   const [organizations, setOrganizations] = useState<Organization[]>([]);
//   const [isLoaded, setIsLoaded] = useState<boolean>(false);

//   const fetchOrganizationList = async () => {
//     try {
//       const organizationData = await db.organization.findMany();
//       setOrganizations(organizationData);
//       setIsLoaded(true);
//     } catch (error) {
//       console.error('Error fetching organization list:', error);
//       setIsLoaded(true);
//     }
//   };

//   const createOrganization = async (name: string, slug: string): Promise<Organization> => {

//       // Assuming you want to update the organization list after creation
//       fetchOrganizationList();

//   };

//   const setActive = (organization: Organization | string): void => {
//     // Implement your setActive logic
//     // ...

//     // For demonstration purposes, log the organization ID
//     if (typeof organization === 'string') {
//       console.log('Setting active organization:', organization);
//     } else {
//       console.log('Setting active organization:', organization.id);
//     }
//   };

//   useEffect(() => {
//     // Fetch initial organization list data
//     fetchOrganizationList();
//   }, []);

//   return { organizations, isLoaded, createOrganization, setActive };
// };
