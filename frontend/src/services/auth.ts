import baseUrl from "@/config/axios";

export const registerUser = async (data: any) => {
  try {
    const response = await baseUrl.post("/register", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (data: any) => {
  try {
    const response = await baseUrl.post("/login", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
