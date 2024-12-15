import { useSelector } from "react-redux";
import Kanban from "../../components/Kanban";
import AddTaskModal from "../../components/Kanban/AddTaskModal";
import useGetTasks from "../../components/Kanban/useGetTasks";
import { BodyWrapper } from "../Home";
import UserNotLogged from "../../components/UserNotLogged";
import selectUser from "../../components/Authentication/selectUser";

const KanbanPage = () => {
  useGetTasks();
  const user = useSelector(selectUser);

  if (user.id === "") {
    return <UserNotLogged />;
  }

  return (
    <BodyWrapper>
      <AddTaskModal />
      <Kanban />
    </BodyWrapper>
  );
};

export default KanbanPage;
