import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskStatus } from "./types";

export type TasksState = {
  tasks: Task[];
};

const initialState: TasksState = {
  tasks: [
    {
      id: "1",
      title: "Research Project",
      description: "Gather requirements and create initial documentation",
      status: "TODO",
      assignee: "NONE",
    },
    {
      id: "2",
      title: "Design System",
      description: "Create component library and design tokens",
      status: "TODO",
      assignee: "NONE",
    },
    {
      id: "3",
      title: "API Integration",
      description: "Implement REST API endpoints",
      status: "IN_PROGRESS",
      assignee: "NONE",
    },
    {
      id: "4",
      title: "Testing",
      description: "Write unit tests for core functionality",
      status: "DONE",
      assignee: "NONE",
    },
  ],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, removeTask } = tasksSlice.actions;

export default tasksSlice.reducer;
