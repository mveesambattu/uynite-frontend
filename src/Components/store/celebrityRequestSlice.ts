import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

const API_BASE_URL = "https://yc66dd7dug.execute-api.us-east-2.amazonaws.com";

// =============================================================================
// 1. Helper Function to Fetch Token
// =============================================================================
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

// =============================================================================
// 2. Thunks
// =============================================================================

// Thunk for fetching verifications.
// This version gets the token directly from the helper function.
export const getFilteredVerifications = createAsyncThunk(
  "celebrityRequest/getFilteredVerifications",
  async (
    params: { filter: string; index: number; size: number },
    { rejectWithValue }
  ) => {
    try {
      // Directly fetch the token using the helper function.
      const token = await fetchAuthTokenFunction();
      console.log("Token fetched via helper function:", token);

      // Get the browser locale (fallback to 'en-US' if not available)
      const language = navigator.language || "en-US";

      const response = await axios.get(
        `${API_BASE_URL}/profile/api/celebrity/admin/verify/getFiltered`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Accept-Language": language,
          },
          params,
        }
      );
      // Adjust the return as needed (here, returning response.data.data.token as per your code)
      return response.data.data.content;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to fetch verifications"
        );
      }
      return rejectWithValue("Unexpected error while fetching verifications.");
    }
  }
);

// Thunk for updating verification status.
// This version checks the state first and falls back to the helper if needed.
export const updateVerificationStatus = createAsyncThunk(
  "celebrityRequest/updateVerificationStatus",
  async (
    payload: {
      profileId: string;
      verificationStatus: "verified" | "rejected" | "pending";
      rejectReason?: string;
      comments?: string;
    },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      let token = (getState() as RootState).celebrityRequest.token;
      if (!token) {
        token = await fetchAuthTokenFunction();
        dispatch(setToken(token));
      }
      const language = navigator.language || "en-US";

      const response = await axios.post(
        `${API_BASE_URL}/profile/api/celebrity/admin/verify/update`,
        payload,
        { headers: { Authorization: `Bearer ${token}`, "Accept-Language": language, } }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to update verification status"
        );
      }
      return rejectWithValue("Unexpected error while updating verification status.");
    }
  }
);

// Thunk for revoking celebrity status.
export const revokeCelebrityStatus = createAsyncThunk(
  "celebrityRequest/revokeCelebrityStatus",
  async (
    payload: { profileId: string; newStatus: string; reason?: string },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      let token = (getState() as RootState).celebrityRequest.token;
      if (!token) {
        token = await fetchAuthTokenFunction();
        dispatch(setToken(token));
      }
      const language = navigator.language || "en-US";

      const response = await axios.put(
        `${API_BASE_URL}/profile/api/celebrity/admin/verify/revoke/${payload.profileId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}`,"Accept-Language": language, },
          params: { newStatus: payload.newStatus, reason: payload.reason },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to revoke celebrity status"
        );
      }
      return rejectWithValue("Unexpected error while revoking celebrity status.");
    }
  }
);

// =============================================================================
// 3. Slice
// =============================================================================

interface CelebrityRequestState {
  token: string | null;
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  revokeStatus: "idle" | "loading" | "succeeded" | "failed";
  data: any | null;
  error: string | null;
}

const initialState: CelebrityRequestState = {
  token: localStorage.getItem("authToken") || null,
  fetchStatus: "idle",
  updateStatus: "idle",
  revokeStatus: "idle",
  data: null,
  error: null,
};

const celebrityRequestSlice = createSlice({
  name: "celebrityRequest",
  initialState,
  reducers: {
    // Reducer to set the token in the state.
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching verifications.
      .addCase(getFilteredVerifications.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(getFilteredVerifications.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.data = action.payload;
      })
      .addCase(getFilteredVerifications.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload as string;
      })

      // Handle updating verification status.
      .addCase(updateVerificationStatus.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateVerificationStatus.fulfilled, (state) => {
        state.updateStatus = "succeeded";
      })
      .addCase(updateVerificationStatus.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload as string;
      })

      // Handle revoking celebrity status.
      .addCase(revokeCelebrityStatus.pending, (state) => {
        state.revokeStatus = "loading";
      })
      .addCase(revokeCelebrityStatus.fulfilled, (state) => {
        state.revokeStatus = "succeeded";
      })
      .addCase(revokeCelebrityStatus.rejected, (state, action) => {
        state.revokeStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

// =============================================================================
// 4. Exports
// =============================================================================
export const { logout, setToken } = celebrityRequestSlice.actions;
export default celebrityRequestSlice.reducer;
