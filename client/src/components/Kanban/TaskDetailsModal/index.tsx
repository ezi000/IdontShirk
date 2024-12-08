import MuiModal from "@mui/material/Modal";
import styled from "styled-components";
import { Task } from "../types";

const TaskDetailsModal = ({
  handleClose,
  open,
  task,
}: TaskDetailsModalProps) => {
  if (!task) {
    return;
  }

  return (
    <>
      <MuiModal open={open} onClose={handleClose}>
        <Content>
          <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Assignee: {task.assignee}</p>
            <p>Status: {task.status}</p>
          </div>
        </Content>
      </MuiModal>
    </>
  );
};

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
  background-color: white;
  border: 2px solid #000;
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
