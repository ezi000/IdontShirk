import { useDroppable } from "@dnd-kit/core";
import { Column as ColumnType, Task } from "./types";
import TaskCard from "./TaskCard";
import styled from "styled-components";

const Column = ({ column, tasks }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <StyledColumn>
      <StyledH2 className="mb-4 font-semibold text-neutral-100">
        {column.title}
      </StyledH2>
      <StyledTasks ref={setNodeRef}>
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </StyledTasks>
    </StyledColumn>
  );
};

const StyledH2 = styled.h2`
  font-weight: 600;
  font-size: 1.5rem;
  color: #f5f5f5;
  margin-bottom: 1rem;
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
  background-color: #161a1d;
  height: 800px;
`;

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export default Column;
