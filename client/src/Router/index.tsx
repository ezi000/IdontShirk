import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../containers/Home";
import KanbanPage from "../containers/KanbanPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/tasks" element={<KanbanPage />} />
    </>
  )
);

export default router;
