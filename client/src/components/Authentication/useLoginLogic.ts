import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { logOutUser, setUser } from "./authenticationSlice";
import { useEffect, useState } from "react";
import { User } from "./User";

const useLoginLogic = () => {
  const dispatch = useDispatch();
  const [userToken, setUserToken] = useState<string>();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUserToken(codeResponse.access_token),
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
          localStorage.setItem("user", JSON.stringify(res.data.id));
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
    localStorage.removeItem("user");
    dispatch(logOutUser());
  };

  return { login, logOut };
};

export default useLoginLogic;
