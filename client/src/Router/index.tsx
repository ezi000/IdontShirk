import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../containers/Home";
import TaskTable from "../components/TaskTable";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<TaskTable />} />
    </>
  )
);

export default router;
