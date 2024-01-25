// types.ts

export interface InputType {
  name: string;
  imageUrl?: string; // Make imageUrl optional in the interface
}

export interface ReturnType {
  data?: {
    id: string;
    name: string;
    imageUrl: string | null; // Adjust accordingly if imageUrl is optional
  };
  error?: string;
}
