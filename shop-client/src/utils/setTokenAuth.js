import { baseApi } from "../api/index";

const setAuthToken = (token) => {
  if (token) {
    baseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete baseApi.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
