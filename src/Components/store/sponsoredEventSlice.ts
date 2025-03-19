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
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  activeMenu: "Create Event",
  events: [],
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
      // Fetch authentication token
      const token = await fetchAuthTokenFunction();
      console.log("Token fetched:", token);

      const response = await axios.get(
        `${API_BASE_URL}/admin/api/sponsoredEvent/67991a60c3bdaf78948095b7/getUpcomingEvents?page=0&size=10`,
        // /admin/api/sponsoredEvent/getUpcomingEvents?page=1&size=10
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": "en-US",
          },
        }
      );

      return response.data.data.content; // Adjust based on actual response structure
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to fetch upcoming events"
        );
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
      state.events = state.events.filter(
        (event) => event.title !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUpcomingEvents.fulfilled,
        (state, action: PayloadAction<Event[]>) => {
          console.log(action.payload)
          state.loading = false;
          state.events = action.payload;
        }
      )
      .addCase(fetchUpcomingEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveMenu, addEvent, removeEvent } =
  sponsoredEventSlice.actions;
export default sponsoredEventSlice.reducer;
