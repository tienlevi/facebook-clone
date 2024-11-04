import baseUrl from "@/config/axios";

export const getUserById = async (id: string) => {
  try {
    const response = await baseUrl.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAvatar = async (userId: string, data: any) => {
  try {
    const response = await baseUrl.put(`/user/update-avatar/${userId}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchUsers = async (search: string) => {
  try {
    const response = await baseUrl.get(`/search-users?search=${search}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
