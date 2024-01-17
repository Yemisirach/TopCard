// frontend/services/workspaceService.ts

import axios from "axios"; // You might need to install Axios if not already installed

const API_BASE_URL = "http://localhost:3000";

export const getUserWorkspaces = async (userId: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/userWorkspaces/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user workspaces:", error);
    throw error;
  }
};

// Add more functions for other workspace-related operations as needed
