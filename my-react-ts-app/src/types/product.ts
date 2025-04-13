export interface Product {
  id: number;
  categoryId:Category ;
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

export interface Category {
  id: number;
  name: string;
  description:string

}

export interface ProductImage {
  id: number;
  url: string;
}

export interface ProductSize {
  id: number;
  size: string;
  price: number;
}

 export interface IResProductSize extends ProductSize {
  product: Product;
}