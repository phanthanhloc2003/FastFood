import { CategoryFormData } from "../../pages/Admin/CategoryManagement";
import api from "../api";

export const categoriesApi = {
  create: async (data: CategoryFormData) => {
    const response = await api.post("/categories", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/categories");
    return response.data;
  },
  delete: async (id:number) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};
