import { useDroppable } from "@dnd-kit/core";
import { Column as ColumnType, Task } from "./types";
import TaskCard from "./TaskCard";
import styled from "styled-components";

const Column = ({ column, tasks }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <StyledColumn ref={setNodeRef}>
      <StyledH2>{column.title}</StyledH2>
      <StyledTasks>
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
        {tasks.length === 0 && <TaskPlaceholder>➕</TaskPlaceholder>}
      </StyledTasks>
    </StyledColumn>
  );
};

const TaskPlaceholder = styled.div`
  color: #f5f5f5;
  height: 80px;
  background-color: #212529;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledH2 = styled.h2`
  font-weight: 600;
  font-size: 1.5rem;
  color: #f5f5f5;
  margin-bottom: 1rem;
  margin-top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #212529;
  border-radius: 0.5rem;
  height: 80px;
`;

const StyledTasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #343a40;
  height: 800px;
`;

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export default Column;
