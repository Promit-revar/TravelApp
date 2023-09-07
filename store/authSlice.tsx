import { createSlice } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

const session: any = getSession();

console.log("session auth slice", session);

const initialState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
    },

    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
    },
  },
});

export const { setUser, clearUser, createUser } = authSlice.actions;

export default authSlice.reducer;
