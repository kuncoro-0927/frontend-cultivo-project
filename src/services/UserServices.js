// import { instance } from "../utils/axios";

import { instance } from "../utils/axios";
export const updateUserProfile = async (userData) => {
  try {
    const response = await instance.put(`/user/profile`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Terjadi kesalahan server";
  }
};

export const getUserData = async () => {
  try {
    const response = await instance.get("/user");
    return response.data.data; // Ambil data user dari respons
  } catch (error) {
    throw error.response?.data?.msg || "Terjadi kesalahan server";
  }
};
