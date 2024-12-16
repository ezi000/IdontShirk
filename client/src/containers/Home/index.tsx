import styled from "styled-components";
import Timer from "../../components/Timer";
import StartedTasks from "../../components/StartedTasks";
import useGetTasks from "../../components/Kanban/useGetTasks";
import { useState } from "react";
import { useSelector } from "react-redux";
import selectUser from "../../components/Authentication/selectUser";
import UserNotLogged from "../../components/UserNotLogged";
import DoneTasks from "../../components/DoneTasks";

const Home = () => {
  useGetTasks();
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const user = useSelector(selectUser);

  if (user.id === "") {
    return <UserNotLogged />;
  }

  // TODO:
  // - EDIT TASK

  return (
    <BodyWrapper>
      <Timer selectedTaskId={selectedTaskId} />
      <TasksWrapper>
        <StartedTasks
          selectedTaskId={selectedTaskId}
          setSelectedTaskId={setSelectedTaskId}
        />
        <DoneTasks />
      </TasksWrapper>
    </BodyWrapper>
  );
};

const TasksWrapper = styled.div`
  display: flex;
  gap: 32px;
  justify-content: center;
`;

const BodyWrapper = styled.div`
  display: flex;
  margin-top: 64px;
  gap: 80px;
  flex-direction: column;
  overflow-x: hidden;
`;

export default Home;
