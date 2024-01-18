// lib/api.ts
import axios from "axios";
import { db } from "./db";


interface CreateOrganizationParams {
  name: string;
  profileImage: string; // Assuming profileImage is a string
}

export const createOrganization = async ({
  name,
  profileImage,
}: CreateOrganizationParams) => {
  try {
    // Generate a unique orgId (you can use a library like uuid for this)
    const orgId = generateUniqueOrgId();

    // Save the organization details to the Prisma database
    const createdOrganization = await db.Organization.create({
      data: {
        name,
        profileImage,
        orgId,
      },
    });

    // Now, you can use the createdOrganization and orgId as needed

    const response = await axios.post("/api/organizations", {
      name: createdOrganization.name,
      profileImage: createdOrganization.profileImage,
      orgId: createdOrganization.orgId,
    });

    return response.data;
  } catch (error) {
    throw new Error(
        // error.response?.data?.error 
        // ||
         "An error occurred");
  }
};

const generateUniqueOrgId = () => {
  return `org_${Date.now()}`;
};
