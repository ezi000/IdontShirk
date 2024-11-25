import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios, { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, setUser, setUserLoginToken } from "./authenticationSlice";
import { useEffect } from "react";
import selectUserLoginToken from "./selectUserLoginToken";
import { User } from "./User";

const useLoginLogic = () => {
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserLoginToken);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) =>
      dispatch(setUserLoginToken(codeResponse.access_token)),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (userToken) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userToken}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: "application/json",
            },
          }
        )
        .then((res: AxiosResponse<User>) => {
          dispatch(setUser(res.data));
          axios.post("http://localhost:5050/user/add", {
            user: res.data,
            userToken: userToken,
          });
        })
        .catch((err) => console.log(err));
    }
  }, [userToken]);

  const logOut = () => {
    googleLogout();
    dispatch(logOutUser());
  };

  return { login, logOut };
};

export default useLoginLogic;
