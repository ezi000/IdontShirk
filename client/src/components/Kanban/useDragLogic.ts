import { DragEndEvent, DragStartEvent } from "@dnd-kit/core/dist/types";
import { useState } from "react";
import { Task } from "./types";
import axios from "axios";
import { setTasks } from "./tasksSlice";
import { useDispatch } from "react-redux";

const useDragLogic = (tasks: Task[]) => {
  const [activeId, setActiveId] = useState<string | number | null>(null);

  const dispatch = useDispatch();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    if (newStatus === "DONE") return;

    const newTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: newStatus,
          }
        : task
    );

    const task = tasks.find((task) => task.id === taskId);
    if (task?.status !== newStatus) {
      dispatch(setTasks(newTasks));
      axios.put("http://localhost:5050/task/edit", {
        id: taskId,
        status: newStatus,
      });
    }
  };

  return { handleDragStart, handleDragEnd, activeId };
};

export default useDragLogic;
