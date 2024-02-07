import create from 'zustand';

// Define the type for the auth state
interface AuthState {
  userId: string | null;
  orgRole: string | null;
  hasPermission: (permission: string) => boolean;
  protect: (permission: string) => void;
  getToken: (options: any) => Promise<string>;
}

// Create the auth store
const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  orgRole: null,
  hasPermission: (permission) => false,
  protect: (permission) => {},
  getToken: async (options) => '',
}));

// Custom hook to access and update auth state
const useAuth = () => useAuthStore((state) => state);

// Define permissions
const Permissions = {
  INVITED_BOARDS: 'invited_boards',
  INVITED_ORGANIZATIONS: 'invited_organizations',
  ALL_ACCESS: 'all_access',
};

// Update the auth store with role-based permissions
useAuthStore.setState((state) => ({
  ...state,
  hasPermission: (permission) => {
    switch (state.orgRole) {
      case 'user':
        return permission === Permissions.INVITED_BOARDS;
      case 'admin':
        return permission === Permissions.INVITED_ORGANIZATIONS;
      case 'super-admin':
        return true; // Super-admin has all access
      default:
        return false; // Default to false for unknown roles
    }
  },
}));

export { useAuth, useAuthStore, Permissions };
