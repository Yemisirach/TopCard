import create from 'zustand';
import { OrganizationUser } from '@prisma/client';


interface Board {
  id: string;
  organizationId: string;
  title: string;
  imageId: string;
  imageThumbUrl: string;
  imageFullUrl: string;
  imageUserName: string;
  imageLinkHTML: string;
  lists: List[];
  createdAt: string;
  updatedAt: string;
}
interface List {
  id: string;
  title: string;
  order: number;
  boardId: string;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
}
interface Card {
  id: string;
  title: string;
  order: number;
  description?: string;
  listId: string;
  checklist: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
}
interface ChecklistItem {
  id: string;
  cardId: string;
  checked: boolean;
}


// Define the Organization model
interface Organization {
  id: string;
  name: string;
  userId: string;
  imageId: string;
  imageThumbUrl: string;
  imageFullUrl: string;
  imageUserName: string;
  imageLinkHTML: string;
  members: OrganizationUser[]; 
  boards: Board[]; 
  createdAt: string; 
  updatedAt: string; 
}

// Define the Membership model
interface Membership {
  id: string;
  userId: string;
  organizationId: string;
  role: UserRole; 
  createdAt: string; 
  updatedAt: string; 
}

// Define the OrganizationInvitation model
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

// Define the OrganizationDomain model
interface OrganizationDomain {
  id: string;
  name: string; 
  orgId: string; 
  enrollmentMode: OrganizationEnrollmentMode; 
  createdAt: string; 
  updatedAt: string; 
}
interface OrganizationMembership {
    id: string;
    userId: string;
    organizationId: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
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
  interface OrganizationSuggestion {
    id: string;
    suggestingUserId: string;
    suggestedEmail: string;
    orgId: string;
    boardId: string | null;
    status: SuggestionStatus;
    token: string;
    expiry: string;
  }
  enum SuggestionStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    DECLINED = 'declined'
  }
  interface OrganizationListState {
    isLoaded: boolean;
    userMemberships: PaginatedResources<OrganizationMembership> | null;
    userInvitations: PaginatedResources<OrganizationInvitation> | null;
    userSuggestions: PaginatedResources<OrganizationSuggestion> | null;
  }
  interface OrganizationState {
    isLoaded: boolean;
    activeOrganizationId: string | null; // Add active organization ID
    organization: Organization | null;
    membership: Membership | null;
    invitations: PaginatedResources<OrganizationInvitation> | null;
    memberships: PaginatedResources<Membership> | null;
    membershipRequests: PaginatedResources<OrganizationInvitation> | null;
    domains: PaginatedResources<OrganizationDomain> | null;
  }
       
// Define enums
enum UserRole {
  ADMIN = 'admin',
  SUPERADMIN = 'super-admin',
  USER = 'user'
}

enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REVOKED = 'revoked'
}

enum OrganizationEnrollmentMode {
  MANUAL_INVITATION = 'manual_invitation',
  AUTOMATIC_INVITATION = 'automatic_invitation',
  AUTOMATIC_SUGGESTION = 'automatic_suggestion'
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

export { useOrganization, useOrganizationStore };

const useOrganizationListStore = create<OrganizationListState>((set) => ({
    isLoaded: false,
    userMemberships: null,
    userInvitations: null,
    userSuggestions: null,
  }));
  
  // Custom hook to access and update organization list state
  const useOrganizationList = () => useOrganizationListStore((state) => state);
  
  export { useOrganizationList, useOrganizationListStore };