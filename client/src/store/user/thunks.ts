import { setIsError, setIsFetching, setIsSuccess } from ".";
import { RootState } from "..";
import { ThunkAction } from "redux-thunk";
import { UserRegister } from "../../common/types";
import { AnyAction } from "redux";
import axios from "axios";

const userClient = axios.create({
  baseURL: "http://localhost:3000",
});

// register user thunk

export const registerUser =
  (user: UserRegister): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(setIsFetching(true));
    try {
      const res = await userClient.post("/user/register", user);
      dispatch(setIsSuccess(true));
      console.log(res.data);
    } catch (error) {
      console.log(error);
      dispatch(setIsError(true));
    } finally {
      dispatch(setIsFetching(false));
    }
  };
