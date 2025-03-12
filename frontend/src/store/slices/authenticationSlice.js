import { createSlice } from "@reduxjs/toolkit";

const authentication = createSlice({
  name: "authentication",
  initialState: {
    id: null,
    orgId: null,
    username: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => {
      return { id: null, orgId: null, username: null, token: null };
    },
  },
});

export const { setUser } = authentication.actions;
export default authentication.reducer;
