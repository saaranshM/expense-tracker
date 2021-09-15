import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks/storehooks";
import { setIsLoggedIn } from "../../store/user";
import hasAccess from "../../utils/hasAccess";
import { refresh } from "../../utils/refresh";

const RegisterUserDetails = () => {
  const dispatch = useAppDispatch();
  const refreshToken = Cookies.get("refresh");

  const requestData = async (accessToken: string, refreshToken: string) => {
    try {
      const res = await axios.get("http://localhost:3000/user/details", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data.error === "invalid-token") {
        console.log("invalid");

        dispatch(setIsLoggedIn(false));
      } else if (res.data.error === "TokenExpiredError") {
        console.log("expired");

        const newAccessToken = await refresh(refreshToken);
        requestData(newAccessToken, refreshToken);
      }
      console.log(res.data);
      return res.data;
    } catch (error: any) {
      console.log(error.response);
      dispatch(setIsLoggedIn(false));
    }
  };

  const getData = async () => {
    let accessToken: any = Cookies.get("access");
    let refreshToken: any = Cookies.get("refresh");

    accessToken = hasAccess(accessToken, refreshToken);

    if (!accessToken) {
      dispatch(setIsLoggedIn(false));
    } else {
      const data = await requestData(accessToken, refreshToken);
    }
  };
  useEffect(() => {
    getData();
  }, [getData]);

  return <h1>Register User Details</h1>;
};

export default RegisterUserDetails;
