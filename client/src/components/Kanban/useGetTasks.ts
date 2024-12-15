import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "./tasksSlice";
import selectUser from "../Authentication/selectUser";

const useGetTasks = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const getTasks = async () => {
      const response = await axios.get(`http://localhost:5050/task/${user.id}`);
      dispatch(setTasks(response.data));
    };

    user.id.length > 0 ? getTasks() : dispatch(setTasks([]));
  }, [user]);
};

export default useGetTasks;
