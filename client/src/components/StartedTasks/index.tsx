import { useSelector } from "react-redux";
import selectTasks from "../Kanban/selectTasks";
import styled from "styled-components";
import { Checkbox } from "@mui/material";

const StartedTasks = ({
  selectedTaskId,
  setSelectedTaskId,
}: {
  selectedTaskId: string;
  setSelectedTaskId: (taskId: string) => void;
}) => {
  const tasks = useSelector(selectTasks);
  const startedTasks = tasks.filter((task) => task.status === "IN_PROGRESS");

  const toggleSelectedTask = (taskId: string) => {
    taskId === selectedTaskId
      ? setSelectedTaskId("")
      : setSelectedTaskId(taskId);
  };

  return (
    <StartedTasksWrapper>
      Tasks in progess:
      <InnerTasksWrapper>
        {startedTasks.length === 0 && (
          <StyledWarning>
            You have no tasks in progress, select some from the board
          </StyledWarning>
        )}
        {startedTasks.map((task) => (
          <Task key={task.id}>
            <TaskInfo>
              <div>{task.title}</div>
              <Progress>
                Progress: {task.timeSpent}/{task.timeGoal} min
              </Progress>
              <StyledProgress
                value={task.timeSpent}
                max={task.timeGoal}
                style={{ width: "100%" }}
              />
            </TaskInfo>
            <Checkbox
              color="success"
              checked={selectedTaskId === task.id}
              onChange={() => toggleSelectedTask(task.id)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Task>
        ))}
      </InnerTasksWrapper>
    </StartedTasksWrapper>
  );
};

const StyledProgress = styled.progress`
  width: 100%;
  appearance: none;
  -webkit-appearence: none;

  &::-webkit-progress-bar {
    background-color: #e0e0e0;
    border-radius: 10px;
  }

  &::-webkit-progress-value {
    background-color: #76c7c0;
    border-radius: 10px 0 0 10px;
  }

  &::-moz-progress-bar {
    background-color: #76c7c0;
    border-radius: 10px;
  }
`;

const StyledWarning = styled.div`
  color: #f5cb5c;
  max-width: 300px;
`;

const Progress = styled.div`
  width: 100%;
  font-size: 12px;
  color: #6c757d;
  flex-shrink: 0;
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Task = styled.div`
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  width: 100%;
  color: black;
  justify-content: space-between;
  font-weight: bold;
  display: flex;
  align-items: center;
  min-width: 200px;
`;

const InnerTasksWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const StartedTasksWrapper = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 16px;
  background-color: #212529;
  padding: 16px 32px;
  color: #f5f5f5;
  border-radius: 16px;
`;

export default StartedTasks;
