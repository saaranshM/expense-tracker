import {
  setIsError,
  setIsFetching,
  setIsSuccess,
  setIsLoggedIn,
  setUser,
} from ".";
import { RootState } from "..";
import { ThunkAction } from "redux-thunk";
import { UserRegister } from "../../common/types";
import { AnyAction } from "redux";
import Cookies from "js-cookie";
import axios from "axios";

const userClient = axios.create({
  baseURL: "http://localhost:5000",
});

interface HttpUserError {
  error: string;
  message?: String;
}

// register user thunk

export const registerUser =
  (user: UserRegister): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(setIsFetching(true));
    try {
      const res = await userClient.post("/user/register", user);
      const { accessToken, refreshToken } = res.data;

      // setting tokens in cookies
      const { firstName, lastName, email } = user;
      Cookies.set("access", accessToken);
      Cookies.set("refresh", refreshToken);
      dispatch(setUser({ firstName, lastName, email }));
      dispatch(setIsSuccess(true));
      dispatch(setIsLoggedIn(true));
    } catch (error: any) {
      const { data } = error.response;
      dispatch(setIsError(data.error));
    } finally {
      dispatch(setIsFetching(false));
    }
  };
