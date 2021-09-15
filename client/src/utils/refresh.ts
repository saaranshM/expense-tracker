import {
  setIsError,
  setIsFetching,
  setIsSuccess,
  setIsLoggedIn,
  setUser,
} from "../store/user";
import store from "../store";
import axios from "axios";
import Cookies from "js-cookie";

const dispatch = store.dispatch;

const userClient = axios.create({
  baseURL: "http://localhost:3000",
});

export const refresh = async (refreshToken: string | undefined | null) => {
  console.log("refreshing");
  try {
    const res = await userClient.get("/user/refresh-token", {
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
    });
    const { accessToken, refreshToken: newRefreshToken } = res.data;

    Cookies.set("access", accessToken);
    Cookies.set("refresh", newRefreshToken);
    dispatch(setIsSuccess(true));
    return accessToken;
  } catch (error: any) {
    const { data } = error.response;
    dispatch(setIsLoggedIn(false));
    dispatch(setIsError(data.error));
    return undefined;
  }
};
