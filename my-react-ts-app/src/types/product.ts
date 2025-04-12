export interface Product {
  id: number;
  categoryId: number | null;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  rating: number;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
  sizes: ProductSize[];
}

interface ProductImage {
  id: number;
  product_id: number;
  url: string;
}

interface ProductSize {
  id: number;
  product_id: number;
  size: string;
  price: number;
}