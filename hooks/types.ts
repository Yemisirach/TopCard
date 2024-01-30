export interface Organization {
  id: string;
  name: string;
  userId: string;
  imageId: string;
  imageThumbUrl: string;
  imageFullUrl: string;
  imageUserName: string;
  imageLinkHTML: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string; // Add the missing property
  imageUrl: string; // Add the missing property
}
