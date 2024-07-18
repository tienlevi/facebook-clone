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

export const deletePost = async (id: string) => {
  try {
    const response = await baseUrl.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editPost = async (data: any) => {
  try {
    const response = await baseUrl.put(`/posts/${data._id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
