import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EventState {
  activeMenu: string;
  events: { title: string; location: string }[];
}

const initialState: EventState = {
  activeMenu: "Create Event",
  events: [
    { title: "Cute Baby Contest", location: "All Countries" },
    { title: "Best Photography Contest", location: "Japan" },
    { title: "Beauty Contest", location: "2+ Countries" },
  ],
};

const sponsoredEventSlice = createSlice({
  name: "sponsoredEvent",
  initialState,
  reducers: {
    setActiveMenu: (state, action: PayloadAction<string>) => {
      state.activeMenu = action.payload;
    },
    addEvent: (state, action: PayloadAction<{ title: string; location: string }>) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.title !== action.payload);
    },
  },
});

export const { setActiveMenu, addEvent, removeEvent } = sponsoredEventSlice.actions;
export default sponsoredEventSlice.reducer;
