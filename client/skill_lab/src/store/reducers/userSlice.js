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
      state.groups = [];
    },
    storeGroups: (state, action) => {
      state.groups = action.payload;
    },
    addGroup: (state, action) => {
      state.groups.groups = [...state.groups.groups, action.payload];  
    },
    leaveGroup: (state,action) => {
      state.groups.groups = state.groups.groups.filter(group => group.id !== action.payload)
    }
  },
});

export const { login, logout, storeGroups, addGroup, leaveGroup } = userSlice.actions;

//Selectors
export const selectUser = (state) => state.user.user;
export const selectGroups = (state) => state.user.groups.groups;

export default userSlice.reducer;
