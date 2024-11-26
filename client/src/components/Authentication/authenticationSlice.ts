import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "./User";

export type AuthenticationState = {
  user: User;
  userLoginToken: string;
};

const initialState: AuthenticationState = {
  user: {
    id: "",
    email: "",
    verified_email: false,
    name: "",
    given_name: "",
    family_name: "",
    picture: "",
  },
  userLoginToken: "",
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.user = initialState.user;
      state.userLoginToken = initialState.userLoginToken;
    },
  },
});

export const { setUser, logOutUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;
