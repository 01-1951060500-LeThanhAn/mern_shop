import { baseApi } from ".";

export const postCommentApi = async (data) => {
  const res = await baseApi.post(`/comment`, data);

  return res;
};

export const getCommentApi = async (commentId) => {
  const res = await baseApi.get(`/comment/${commentId}`);

  return res;
};

export const deleteCommentApi = async (commentId) => {
  const res = await baseApi.delete(`/comment/${commentId}`);

  return res;
};
