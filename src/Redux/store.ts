import { configureStore } from "@reduxjs/toolkit";
import { authenticationSlice } from "../components/Authentication/authenticationSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
