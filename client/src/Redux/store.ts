import { configureStore } from "@reduxjs/toolkit";
import { authenticationSlice } from "../components/Authentication/authenticationSlice";
import tasksSlice from "../components/Kanban/tasksSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    tasks: tasksSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
