import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api"; 

interface CelebrityRequestState {
  data: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CelebrityRequestState = {
  data: null,
  status: "idle",
  error: null,
};

// Thunks

// 1. Update Verification Status
export const updateVerificationStatus = createAsyncThunk(
  "celebrityRequest/updateVerificationStatus",
  async (
    payload: {
      profileid: string;
      verificationstatus: "verified" | "rejected" | "pending";
      rejectReason: string;
      comments: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/celebrity/admin/verify/update", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2. Get Filtered Verifications
export const getFilteredVerifications = createAsyncThunk(
  "celebrityRequest/getFilteredVerifications",
  async (
    params: { filter: "all" | "verified" | "submitted" | "rejected"; index: number; size: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/celebrity/admin/verify/getFiltered", { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 3. Revoke Celebrity Status
export const revokeCelebrityStatus = createAsyncThunk(
  "celebrityRequest/revokeCelebrityStatus",
  async (
    payload: { profileId: string; newStatus: string; reason?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/celebrity/admin/verify/revoke/${payload.profileId}`,
        null,
        { params: { newStatus: payload.newStatus, reason: payload.reason } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const celebrityRequestSlice = createSlice({
  name: "celebrityRequest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle state changes for all async actions
    builder
      .addCase(getFilteredVerifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFilteredVerifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getFilteredVerifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateVerificationStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateVerificationStatus.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateVerificationStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(revokeCelebrityStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(revokeCelebrityStatus.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(revokeCelebrityStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default celebrityRequestSlice.reducer;
