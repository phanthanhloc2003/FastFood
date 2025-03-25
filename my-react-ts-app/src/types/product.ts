export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  totalReviews: number;
  ingredients?: string[];
  category?: string;
} 