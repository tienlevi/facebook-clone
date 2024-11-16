import baseUrl from "@/config/axios";

export const getCommentByPostId = async (postId: string) => {
  try {
    const response = await baseUrl.get(`/comments/${postId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (data: any) => {
  try {
    const response = await baseUrl.post(`/comments`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (id: string) => {
  try {
    const response = await baseUrl.delete(`/comments/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editComment = async (id: string, data: any) => {
  try {
    const response = await baseUrl.put(`/comments/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
