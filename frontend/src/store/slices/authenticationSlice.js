import { createSlice } from "@reduxjs/toolkit";

const authentication = createSlice({
  name: "authentication",
  initialState: {
    id: null,
    orgId: null,
    username: null,
  },
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setUser } = authentication.actions;
export default authentication.reducer;
