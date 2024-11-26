import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../containers/Home";
import TaskTablePage from "../containers/TaskTablePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<TaskTablePage />} />
    </>
  )
);

export default router;
