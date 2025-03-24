import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://yc66dd7dug.execute-api.us-east-2.amazonaws.com";

interface Event {
  title: string;
  location: string;
}

interface EventState {
  activeMenu: string;
  events: Event[];
  ongoingEvents: Event[];
  completedEvents: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  activeMenu: "Create Event",
  events: [],
  ongoingEvents: [],
  completedEvents: [],
  loading: false,
  error: null,
};

// Function to fetch the authentication token
export async function fetchAuthTokenFunction(): Promise<string> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/admin/auth/authenticate`,
      { username: "lsurisetti@uynite.com", password: "adminpassword" }
    );
    localStorage.setItem("authToken", response.data.data.token);
    return response.data.data.token;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Authentication failed";
    }
    throw "Unexpected error while fetching token.";
  }
}

// Async thunk to fetch upcoming events
export const fetchUpcomingEvents = createAsyncThunk(
  "sponsoredEvent/fetchUpcomingEvents",
  async (_, { rejectWithValue }) => {
    try {
      const token = await fetchAuthTokenFunction();
      console.log("Token fetched:", token);

      const response = await axios.get(
        `${API_BASE_URL}/admin/api/sponsoredEvent/67991a60c3bdaf78948095b7/getUpcomingEvents?page=0&size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en-US",
          },
        }
      );

      return response.data.data.content;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to fetch upcoming events");
      }
      return rejectWithValue("Unexpected error while fetching events.");
    }
  }
);

// Async thunk to fetch ongoing events
export const fetchOngoingEvents = createAsyncThunk(
  "sponsoredEvent/fetchOngoingEvents",
  async (_, { rejectWithValue }) => {
    try {
      const token = await fetchAuthTokenFunction();
      console.log("Token fetched:", token);

      const response = await axios.get(
        `${API_BASE_URL}/admin/api/sponsoredEvent/67991a60c3bdaf78948095b7/getOngoingEvents?page=0&size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en-US",
          },
        }
      );

      return response.data.data.content;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to fetch ongoing events");
      }
      return rejectWithValue("Unexpected error while fetching events.");
    }
  }
);

// Async thunk to fetch completed events
export const fetchCompletedEvents = createAsyncThunk(
  "sponsoredEvent/fetchCompletedEvents",
  async (_, { rejectWithValue }) => {
    try {
      const token = await fetchAuthTokenFunction();
      console.log("Token fetched:", token);

      const response = await axios.get(
        `${API_BASE_URL}/admin/api/sponsoredEvent/67991a60c3bdaf78948095b7/getCompletedEvents?page=0&size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en-US",
          },
        }
      );

      return response.data.data.content;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to fetch completed events");
      }
      return rejectWithValue("Unexpected error while fetching events.");
    }
  }
);

const sponsoredEventSlice = createSlice({
  name: "sponsoredEvent",
  initialState,
  reducers: {
    setActiveMenu: (state, action: PayloadAction<string>) => {
      state.activeMenu = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((event) => event.title !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Upcoming Events
      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        console.log(action.payload);
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle Ongoing Events
      .addCase(fetchOngoingEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOngoingEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.ongoingEvents = action.payload;
      })
      .addCase(fetchOngoingEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle Completed Events
      .addCase(fetchCompletedEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.completedEvents = action.payload;
      })
      .addCase(fetchCompletedEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveMenu, addEvent, removeEvent } = sponsoredEventSlice.actions;
export default sponsoredEventSlice.reducer;
