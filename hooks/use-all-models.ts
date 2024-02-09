import { create } from "zustand";
import {  UserRole,Organization } from "@prisma/client";



enum InvitationStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REVOKED = "revoked",
}

enum OrganizationEnrollmentMode {
  MANUAL_INVITATION = "manual_invitation",
  AUTOMATIC_INVITATION = "automatic_invitation",
  AUTOMATIC_SUGGESTION = "automatic_suggestion",
}


interface Membership {
  id: string;
  userId: string;
  organizationId: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  organization: Organization;
}

interface OrganizationInvitation {
  id: string;
  invitingUserId: string;
  invitedEmail: string;
  orgId: string;
  boardId: string | null;
  status: InvitationStatus;
  token: string;
  expiry: string;
}

interface OrganizationDomain {
  id: string;
  name: string;
  orgId: string;
  enrollmentMode: OrganizationEnrollmentMode;
  createdAt: string;
  updatedAt: string;
}

// Define PaginatedResources interface
interface PaginatedResources<T> {
  data: T[];
  count: number;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  page: number;
  pageCount: number;
  fetchPage: (page: number) => void;
  fetchPrevious: () => void;
  fetchNext: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Define the organization state interface
interface OrganizationState {
  isLoaded: boolean;
  activeOrganizationId: string | null;
  organization: Organization | null;
  membership: Membership | null;
  invitations: PaginatedResources<OrganizationInvitation> | null;
  memberships: PaginatedResources<Membership> | null;
  membershipRequests: PaginatedResources<OrganizationInvitation> | null;
  domains: PaginatedResources<OrganizationDomain> | null;
}

// Create the organization store
const useOrganizationStore = create<OrganizationState>((set) => ({
  isLoaded: false,
  activeOrganizationId: null, // Initialize active organization ID to null
  organization: null,
  membership: null,
  invitations: null,
  memberships: null,
  membershipRequests: null,
  domains: null,
}));

// Custom hook to access and update organization state
const useOrganization = () => useOrganizationStore((state) => state);
console.log("🚀 ~ useOrganization:", { useOrganization });
// Export the hooks
export { useOrganization, useOrganizationStore };

// Define the organization list state interface
interface OrganizationListState {
  isLoaded: boolean;
  userMemberships: PaginatedResources<Membership> | null;
  userInvitations: PaginatedResources<OrganizationInvitation> | null;
  userSuggestions: PaginatedResources<OrganizationInvitation> | null; // Assuming this is similar to invitations
}

// Create the organization list store
const useOrganizationListStore = create<OrganizationListState>((set) => ({
  isLoaded: false,
  userMemberships: null,
  userInvitations: null,
  userSuggestions: null,
}));

// Custom hook to access and update organization list state

const useOrganizationList = () => {
  const organizationListState = useOrganizationListStore((state) => state);
  return organizationListState;
};
console.log("🚀 ~ useOrganizationList:", { useOrganizationList });
// Export the hooks
export { useOrganizationList, useOrganizationListStore };
