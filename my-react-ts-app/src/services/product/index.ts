import { Product } from "../../types/product";
import api from "../api";

interface CreateProductData {
  categoryId: number | null;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  images: string[];
  sizes: { size: string; price: number }[];
}

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get("/products");
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Thêm sản phẩm mới
  create: async (data: CreateProductData) => {
    const response = await api.post("/products", data);
    return response.data;
  },

  // Cập nhật sản phẩm
  update: async (id: number, data: Partial<CreateProductData>): Promise<Product> => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  // Xóa sản phẩm
  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  // Tìm kiếm sản phẩm
  search: async (query: string): Promise<Product[]> => {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  },

  // Lọc sản phẩm theo danh mục
  getByCategory: async (categoryId: number): Promise<Product[]> => {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
  }
};
