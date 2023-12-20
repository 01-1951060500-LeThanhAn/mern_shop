import {
  loginFailed,
  loginStart,
  loginSuccess,
} from "../redux/slices/userSlice";
import { baseApi } from "../api/index";
import { saveToken } from "../utils/saveToken";
export const loginApi = async (user, dispatch) => {
  dispatch(loginStart());

  try {
    const res = await baseApi.post(`/users/login`, user);

    dispatch(loginSuccess(res.data));

    saveToken(res.data?.token);
  } catch (error) {
    console.log(error);
    dispatch(loginFailed());
  }
};
