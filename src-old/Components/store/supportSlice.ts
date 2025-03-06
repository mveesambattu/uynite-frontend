import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SupportState {
  message: string;
}

const initialState: SupportState = {
  message: "Welcome to Support Page",
};

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = supportSlice.actions;
export default supportSlice.reducer;
