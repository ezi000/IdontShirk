import { Route, Routes } from "react-router";
import Home from "../containers/Home";
import KanbanPage from "../containers/KanbanPage";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/board" element={<KanbanPage />} />
  </Routes>
);

export default Router;
