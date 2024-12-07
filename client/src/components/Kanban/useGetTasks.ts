import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTasks } from "./tasksSlice";

const useGetTasks = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getTasks = async () => {
      const response = await axios.get("http://localhost:5050/task");
      dispatch(setTasks(response.data));
    };

    getTasks();
  }, []);
};

export default useGetTasks;
