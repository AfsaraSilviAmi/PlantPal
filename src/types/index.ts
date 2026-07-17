export interface Plant {
  _id: string;
  title: string;
  scientificName: string;
  category: string;
  difficulty: string;
  wateringFrequency: string;
  sunlight: string;
  petFriendly: boolean;
  indoor: boolean;
  price?: number;
  image?: string;
  shortDescription: string;
  description: string;
  createdAt: string;
}
