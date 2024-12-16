import { useSelector } from "react-redux";
import selectTasks from "../Kanban/selectTasks";
import styled from "styled-components";

const DoneTasks = () => {
  const tasks = useSelector(selectTasks);
  const doneTasks = tasks.filter((task) => task.status === "DONE");

  return (
    <DoneTasksWrapper>
      Done tasks:
      <InnerTasksWrapper>
        {doneTasks.length === 0 && (
          <StyledWarning>You have no completed tasks</StyledWarning>
        )}
        {doneTasks.map((task) => (
          <Task key={task.id}>
            <TaskInfo>
              <div>{task.title}</div>
              <Progress>Time spent: {task.timeSpent} min</Progress>
            </TaskInfo>
            <StyledEmoji>🥳</StyledEmoji>
          </Task>
        ))}
      </InnerTasksWrapper>
    </DoneTasksWrapper>
  );
};

const StyledWarning = styled.div`
  color: #f5cb5c;
  max-width: 300px;
`;

const StyledEmoji = styled.div`
  font-size: 32px;
  position: absolute;
  right: 8px;
  top: 8px;
  rotate: 20deg;
  user-select: none;
`;

const Progress = styled.div`
  width: 100%;
  font-size: 12px;
  color: #6c757d;
`;

const TaskInfo = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;

const Task = styled.div`
  display: flex;
  position: relative;
  padding: 16px 32px 16px 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  width: 100%;
  color: black;
  font-weight: bold;
  align-items: center;
  min-width: 200px;
`;

const InnerTasksWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const DoneTasksWrapper = styled.div`
  flex-direction: column;
  align-items: center;
  display: flex;
  gap: 16px;
  background-color: #212529;
  padding: 16px 32px;
  color: #f5f5f5;
  border-radius: 16px;
`;

export default DoneTasks;
