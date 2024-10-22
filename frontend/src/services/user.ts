import baseUrl from "@/config/axios";

export const getUserById = async (id: string) => {
  try {
    const response = await baseUrl.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
