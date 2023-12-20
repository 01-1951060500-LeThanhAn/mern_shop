import { baseApi } from ".";

export const getAllUsers = async () => {
  const token = JSON.parse(localStorage.getItem("tokenAdmmin"));
  const res = await baseApi.get(`/users/listuser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};
