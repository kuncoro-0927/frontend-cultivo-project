import { instance } from "../utils/axios";

export const updateUserProfile = async (userData) => {
  try {
    const response = await instance.put(`/user/profile`, userData); // Hapus kurung kurawal ekstra
    return response.data; // data hasil update dari server
  } catch (error) {
    throw error.response?.data?.msg || "Terjadi kesalahan server";
  }
};

export const getUserData = async () => {
  try {
    const response = await instance.get("/user");
    return response.data.data; // ambil data user dari respons
  } catch (error) {
    throw error.response?.data?.msg || "Terjadi kesalahan server";
  }
};
