import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    groups: [],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    addGroups: (state, action) => {
      state.groups = action.payload;
    },
  },
});

export const { login, logout, addGroups } = userSlice.actions;

//Selectors
export const selectUser = (state) => state.user.user;
export const selectGroups = (state) => state.user.groups;

export default userSlice.reducer;
