import { useEffect } from "react";
import axios from "axios";
import { setUser } from "./authenticationSlice";
import { useDispatch } from "react-redux";

const useGetLoggedUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userId = localStorage.getItem("user");
    const getLoggedUser = async () => {
      const response = await axios.post("http://localhost:5050/user/me", {
        id: userId?.replace(/"/g, ""),
      });
      dispatch(setUser(response.data));
    };

    getLoggedUser();
  }, []);
};

export default useGetLoggedUser;
