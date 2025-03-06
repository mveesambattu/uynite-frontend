import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BlockedUsersState {
  users: string[];
}

const initialState: BlockedUsersState = {
  users: [],
};

const blockedUsersSlice = createSlice({
  name: "blockedUsers",
  initialState,
  reducers: {
    addBlockedUser: (state, action: PayloadAction<string>) => {
      state.users.push(action.payload);
    },
    removeBlockedUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user !== action.payload);
    },
  },
});

export const { addBlockedUser, removeBlockedUser } = blockedUsersSlice.actions;
export default blockedUsersSlice.reducer;
