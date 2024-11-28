import { useDraggable } from "@dnd-kit/core";
import { Task } from "./types";
import styled from "styled-components";

const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <Card ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <h3 className="font-medium text-neutral-100">{task.title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
    </Card>
  );
};

const Card = styled.div`
  cursor: grab;
  border-radius: 0.5rem;
  padding: 1rem;
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
