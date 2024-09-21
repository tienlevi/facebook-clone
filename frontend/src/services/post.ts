import baseUrl from "@/config/axios";

export const addPost = async (data: any) => {
  try {
    const response = await baseUrl.post("/posts", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (
  limitResult?: string | number,
  page?: number
) => {
  try {
    const response = await baseUrl.get(
      `/posts?limit=${limitResult}&page=${page}`
    );
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

export const likePost = async (
  idPost: string,
  userIdLike: string,
  data: any
) => {
  try {
    const response = await baseUrl.put(
      `/posts/${userIdLike}/like/${idPost}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const unlikePost = async (
  idPost: string,
  userIdLike: string,
  data: any
) => {
  try {
    const response = await baseUrl.put(
      `/posts/${userIdLike}/unlike/${idPost}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
