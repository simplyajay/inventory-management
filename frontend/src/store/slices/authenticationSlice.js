import { createSlice } from "@reduxjs/toolkit";

const authentication = createSlice({
  name: "authentication",
  initialState: {
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authentication.actions;
export default authentication.reducer;
