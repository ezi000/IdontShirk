import { useSelector } from "react-redux";
import Kanban from "../../components/Kanban";
import AddTaskModal from "../../components/Kanban/AddTaskModal";
import useGetTasks from "../../components/Kanban/useGetTasks";
import UserNotLogged from "../../components/UserNotLogged";
import selectUser from "../../components/Authentication/selectUser";
import styled from "styled-components";

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

const BodyWrapper = styled.div`
  display: flex;
  margin-top: 64px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export default KanbanPage;
