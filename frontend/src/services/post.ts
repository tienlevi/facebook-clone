import baseUrl from "@/config/axios";

export const addPost = async (data: any) => {
  try {
    const response = await baseUrl.post("/posts", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async () => {
  try {
    const response = await baseUrl.get("/posts");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};