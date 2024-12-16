import { useDraggable } from "@dnd-kit/core";
import { Task } from "./types";
import styled from "styled-components";
import { useState } from "react";
import TaskDetailsModal from "./TaskDetailsModal";

const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Card ref={setNodeRef}>
      {task.status !== "DONE" && <CardHandle {...listeners} {...attributes} />}
      <CardContent onClick={handleOpen}>
        <div>{task.title}</div>
        <ProgressWrapper>
          <StyledProgress value={task.timeSpent} max={task.timeGoal} />
          {`${Math.round((task.timeSpent / task.timeGoal) * 100)}%`}
        </ProgressWrapper>
      </CardContent>
      <TaskDetailsModal
        open={modalOpen}
        handleClose={handleClose}
        task={task}
      />
    </Card>
  );
};

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

const CardContent = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const CardHandle = styled.div`
  cursor: grab;
  width: 100%;
  height: 16px;
  background-color: #212529;
  border-radius: 4px 4px 0 0;
`;

const Card = styled.div`
  border-radius: 4px 4px 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: #6c757d;

  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
`;

type TaskCardProps = {
  task: Task;
};

export default TaskCard;
