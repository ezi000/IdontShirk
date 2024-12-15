import styled from "styled-components";
import Timer from "../../components/Timer";
import StartedTasks from "../../components/StartedTasks";
import useGetTasks from "../../components/Kanban/useGetTasks";
import { useState } from "react";
import { useSelector } from "react-redux";
import selectUser from "../../components/Authentication/selectUser";
import UserNotLogged from "../../components/UserNotLogged";

const Home = () => {
  useGetTasks();
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const user = useSelector(selectUser);

  if (user.id === "") {
    return <UserNotLogged />;
  }

  // TODO:
  // - Better progress bar ?
  // - Confetti and auto change task progress status to done when time goal is reached

  return (
    <BodyWrapper>
      <Timer selectedTaskId={selectedTaskId} />
      <StartedTasks
        selectedTaskId={selectedTaskId}
        setSelectedTaskId={setSelectedTaskId}
      />
    </BodyWrapper>
  );
};

export const BodyWrapper = styled.div`
  display: flex;
  margin-top: 64px;
  flex-direction: column;
  align-items: center;
  gap: 64px;
`;

export default Home;
