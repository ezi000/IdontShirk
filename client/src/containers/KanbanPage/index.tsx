import Kanban from "../../components/Kanban";
import AddTaskModal from "../../components/Kanban/AddTaskModal";
import useGetTasks from "../../components/Kanban/useGetTasks";
import { BodyWrapper } from "../Home";

const KanbanPage = () => {
  useGetTasks();
  return (
    <BodyWrapper>
      <AddTaskModal />
      <Kanban />
    </BodyWrapper>
  );
};

export default KanbanPage;
