import MuiModal from "@mui/material/Modal";
import styled from "styled-components";
import { Task } from "../types";
import DefaultButton from "../../DefaultButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeTask } from "../tasksSlice";
import getStatusColor from "../getStatusColor";

const TaskDetailsModal = ({
  handleClose,
  open,
  task,
}: TaskDetailsModalProps) => {
  const dispatch = useDispatch();

  if (!task) {
    return;
  }

  const handleTaskDelete = async () => {
    dispatch(removeTask(task.id));
    await axios.delete(`http://localhost:5050/task/${task.id}`);
    handleClose();
  };

  return (
    <>
      <MuiModal open={open} onClose={handleClose}>
        <Content>
          <Details>
            <h2>{task.title}</h2>
            <Description>{task.description}</Description>
            <Status $bgColor={getStatusColor(task.status)}>
              Status:{" "}
              <span>
                {task.status === "IN_PROGRESS" ? "In Progress" : task.status}
              </span>
            </Status>
            <p>Time Spent: {task.timeSpent}</p>
            <p>Time Goal: {task.timeGoal}</p>
            <ProgressWrapper>
              <StyledProgress value={task.timeSpent} max={task.timeGoal} />
              {`${Math.round((task.timeSpent / task.timeGoal) * 100)}%`}
            </ProgressWrapper>
          </Details>
          <DeleteButton bgColor="#bc4749" onClick={handleTaskDelete}>
            Delete
          </DeleteButton>
        </Content>
      </MuiModal>
    </>
  );
};

const Description = styled.div`
  display: flex;
  height: 100px;
  padding: 16px;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  background-color: #748cab;
  border-radius: 8px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0;
`;

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

const Status = styled.div<{ $bgColor?: string }>`
  span {
    background-color: ${({ $bgColor }) => $bgColor};
    border-radius: 8px;
    padding: 4px 8px;
    font-weight: bold;
  }
`;

const DeleteButton = styled(DefaultButton)`
  align-self: flex-end;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  P {
    margin: 0;
  }
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #495057;
  border-radius: 16px;
  box-shadow: 24px;
  padding: 16px;
`;

type TaskDetailsModalProps = {
  handleClose: () => void;
  open: boolean;
  task: Task;
};

export default TaskDetailsModal;
