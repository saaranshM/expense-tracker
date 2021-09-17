import Cookies from "js-cookie";
import store from "../store";
import { refresh } from "../utils/refresh";

const hasAccess = async (
  accessToken: string | undefined,
  refreshToken: string | undefined
) => {
  if (!refreshToken) return null;

  if (accessToken === undefined) {
    // generate new accessToken
    const newAccessToken = await refresh(refreshToken);
    return newAccessToken;
  }

  return accessToken;
};

export default hasAccess;
