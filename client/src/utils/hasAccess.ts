import Cookies from "js-cookie";
import store from "../store";
import { refresh } from "../store/user/thunks";

const hasAccess = (
  accessToken: string | undefined,
  refreshToken: string | undefined
) => {
  if (!refreshToken) return null;

  if (accessToken === undefined) {
    // generate new accessToken
    store.dispatch(refresh(refreshToken));
    const newAccessToken = Cookies.get("access");
    return newAccessToken;
  }

  return accessToken;
};

export default hasAccess;
