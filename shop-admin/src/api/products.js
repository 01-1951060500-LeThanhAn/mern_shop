import { baseApi } from "./index";
export const getAllProducts = async () => {
  const token = JSON.parse(localStorage.getItem("tokenAdmmin"));
  const res = await baseApi.get(`/product/listproduct`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const deleteProducts = async (id) => {
  const token = JSON.parse(localStorage.getItem("tokenAdmmin"));
  const res = await baseApi.delete(`/product/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const updateProducts = async (id, data) => {
  const token = JSON.parse(localStorage.getItem("tokenAdmmin"));
  const res = await baseApi.put(`/product/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};

export const addProducts = async (product) => {
  const token = JSON.parse(localStorage.getItem("tokenAdmmin"));
  const res = await baseApi.post(`/product`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};
