import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CelebrityState {
  data: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CelebrityState = {
  data: null,
  status: 'idle',
  error: null,
};

// API 1: Update Verification Status
export const updateVerificationStatus = createAsyncThunk(
  'celebrityRequest/updateVerificationStatus',
  async (
    payload: {
      profileid: string;
      verificationstatus: 'verified' | 'rejected' | 'pending';
      rejectReason: string;
      comments: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        'https://yc66dd7dug.execute-api.us-east-2.amazonaws.com/profile/api/celebrity/admin/verify/update',
        payload
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// API 2: Get Filtered Verifications
export const getFilteredVerifications = createAsyncThunk(
  'celebrityRequest/getFilteredVerifications',
  async (
    params: { filter: 'all' | 'verified' | 'submitted' | 'rejected'; index: number; size: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        'https://yc66dd7dug.execute-api.us-east-2.amazonaws.com/profile/api/celebrity/admin/verify/getFiltered',
        { params }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// API 3: Revoke Celebrity Status
export const revokeCelebrityStatus = createAsyncThunk(
  'celebrityRequest/revokeCelebrityStatus',
  async (
    payload: { profileId: string; newStatus: 'accepted' | 'rejected' | 'pending'; reason?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `https://yc66dd7dug.execute-api.us-east-2.amazonaws.com/profile/api/celebrity/admin/verify/revoke/${payload.profileId}`,
        null,
        { params: { newStatus: payload.newStatus, reason: payload.reason } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const celebrityRequestSlice = createSlice({
  name: 'celebrityRequest',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Update Verification Status
    builder.addCase(updateVerificationStatus.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updateVerificationStatus.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(updateVerificationStatus.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    // Get Filtered Verifications
    builder.addCase(getFilteredVerifications.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getFilteredVerifications.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(getFilteredVerifications.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });

    // Revoke Celebrity Status
    builder.addCase(revokeCelebrityStatus.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(revokeCelebrityStatus.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(revokeCelebrityStatus.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload as string;
    });
  },
});

export const { resetStatus } = celebrityRequestSlice.actions;

export default celebrityRequestSlice.reducer;
