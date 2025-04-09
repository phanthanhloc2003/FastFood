import { User } from "../../types";
import api from "../api";

export const getDetailUser = async (): Promise<User> => {
  try {
    const response = await api.get<User>("users/detail-user", {});
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Đăng nhập thất bại" };
  }
};
export const updateAvatar = async (formData: FormData) => {
  try {
    const response = await api.put("users/avatar", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Cập nhật avatar thất bại" };
  }
};
