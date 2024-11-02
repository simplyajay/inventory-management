import { createSlice } from "@reduxjs/toolkit";

const authentication = createSlice({
  name: "authentication",
  initialState: {
    isLoggedIn: false,
    user: {},
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});

export const { login, logout } = authentication.actions;
export default authentication.reducer;
