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
        {startedTasks.map((task) => (
          <Task key={task.id}>
            <TaskInfo>
              <div>{task.title}</div>
              <Progress>
                Progress: {task.timeSpent}/{task.timeGoal}
              </Progress>
              <progress
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

const Progress = styled.div`
  width: 100%;
  font-size: 12px;
  color: #6c757d;
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
