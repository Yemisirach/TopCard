// OrganizationModel.ts

import { Prisma } from "@prisma/client";

export interface Organization {
  id: string;
  name: string;
  image?: string; // Add the image field if it exists in your schema
  // Add other fields as needed
}

export interface CreateOrganizationInput {
  name: string;
  image?: string;
  // Add other fields as needed
}

export interface UpdateOrganizationInput {
  name?: string;
  image?: string;
  // Add other fields as needed
}

export type OrganizationWhereUniqueInput = Prisma.OrganizationWhereUniqueInput;
export type OrganizationOrderByInput = Prisma.OrganizationOrderByInput;
