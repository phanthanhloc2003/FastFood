
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
