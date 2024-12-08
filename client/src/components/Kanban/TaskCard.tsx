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
      <CardHandle {...listeners} {...attributes} />
      <CardContent onClick={handleOpen}>
        <div>{task.title}</div>
      </CardContent>
      <TaskDetailsModal
        open={modalOpen}
        handleClose={handleClose}
        task={task}
      />
    </Card>
  );
};

const Asignee = styled.div`
  font-size: 0.875rem;
  color: #adb5bd;
`;

const CardContent = styled.div`
  padding: 16px;
  width: 100%;
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
