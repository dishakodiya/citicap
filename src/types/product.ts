import type { Category } from "@prisma/client";

/** Serializable product for client components (no Date objects). */
export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  voltage: string;
  capacity: string;
  category: Category;
  imageUrl: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};
