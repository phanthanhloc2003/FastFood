import { IUser } from "../../types";
import { UserFormData } from "../../types/user";
import api from "../api";

const buildFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });
  return formData;
};

const usersApi = {
  getAll: async (): Promise<IUser[]> => {
    const response = await api.get("/users");
    return response.data;
  },

  getById: async (): Promise<IUser> => {
    const response = await api.get(`/users/detail-user`);
    return response.data;
  },

  create: async (data: UserFormData): Promise<IUser> => {
    const response = await api.post("/users", buildFormData(data), {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  update: async (id: number, data: UserFormData): Promise<IUser> => {
    const response = await api.patch(`/users/${id}`, buildFormData(data), {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  getDetail: async (): Promise<IUser> => {
    try {
      const response = await api.get<IUser>("/users/detail-user");
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Đăng nhập thất bại" };
    }
  },

  updateAvatar: async (formData: FormData): Promise<IUser> => {
    try {
      const response = await api.put("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Cập nhật avatar thất bại" };
    }
  },
};

export default usersApi;
