import { useState } from "react";
import type { Task, Column as ColumnType } from "./types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import styled from "styled-components";
import Column from "./Column";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import selectTasks from "./selectTasks";
import { setTasks } from "./tasksSlice";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const Kanban = () => {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState<string | number | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    const newTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: newStatus,
          }
        : task
    );

    dispatch(setTasks(newTasks));
  };

  const getTaskById = (id: string | number) => {
    return tasks.find((task) => task.id === id);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Body>
        {COLUMNS.map((column) => {
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          );
        })}
      </Body>

      <DragOverlay>
        {activeId ? <TaskCard task={getTaskById(activeId) as Task} /> : null}
      </DragOverlay>
    </DndContext>
  );
};

const Body = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 32px 32px;
  width: 100%;
`;

export default Kanban;
