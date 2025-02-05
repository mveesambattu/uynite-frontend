import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://yc66dd7dug.execute-api.us-east-2.amazonaws.com";

export async function fetchAuthTokenFunction(): Promise<string> {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/admin/auth/authenticate`, {
      username: "lsurisetti@uynite.com",
      password: "adminpassword",
    });
    console.log(response.data.data.token)
    localStorage.setItem("authToken", response.data.data.token);
    return response.data.data.token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Authentication failed";
    }
    throw "Unexpected error while fetching token.";
  }
}

export const fetchReports = createAsyncThunk(
  "reports/fetchReports",
  async (_, { rejectWithValue }) => {
    try {
      const token = await fetchAuthTokenFunction();
      const response = await axios.get(`${API_BASE_URL}/admin/api/reports/getreports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to fetch reports");
      }
      return rejectWithValue("Unexpected error while fetching reports.");
    }
  }
);

export const blockUser = createAsyncThunk(
  "reports/blockUser",
  async ({ reportId }: { reportId: string }, { rejectWithValue }) => {
    try {
      const token = await fetchAuthTokenFunction();
      const response = await axios.put(
        `${API_BASE_URL}/admin/api/reports/${reportId}/blockUser`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to block user");
      }
      return rejectWithValue("Unexpected error while blocking user.");
    }
  }
);

export const deletePost = createAsyncThunk(
  "reports/deletePost",
  async ({ reportId }: { reportId: string }, { rejectWithValue }) => {
    try {
      const token = await fetchAuthTokenFunction();
      const response = await axios.delete(
        `${API_BASE_URL}/admin/api/reports/${reportId}/deletePost`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to delete post");
      }
      return rejectWithValue("Unexpected error while deleting post.");
    }
  }
);

export const rejectReport = createAsyncThunk(
  "reports/rejectReport",
  async ({ reportId }: { reportId: string }, { rejectWithValue }) => {
    try {
      const token = await fetchAuthTokenFunction();
      const response = await axios.put(
        `${API_BASE_URL}/admin/api/reports/${reportId}/rejectReport`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to reject report");
      }
      return rejectWithValue("Unexpected error while rejecting report.");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "reports/deleteUser",
  async ({ reportId }: { reportId: string }, { rejectWithValue }) => {
    try {
      const token = await fetchAuthTokenFunction();
      const response = await axios.delete(
        `${API_BASE_URL}/admin/api/reports/${reportId}/deleteUser`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to delete user");
      }
      return rejectWithValue("Unexpected error while deleting user.");
    }
  }
);

interface Report {
  id: string;
  ReportedBy: { Name: string; Image: string }[];
  ReportType: string;
  ReportMessage: string;
  ReportedContent: { Link: string; Type: string };
  ItemPostedBy: { Name: string; Image: string };
  CreatedDate: string;
  Actions: string[];
  AdminActionStatus: string;
}

interface ReportState {
  reports: Report[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  blockStatus: "idle" | "loading" | "succeeded" | "failed";
  deletePostStatus: "idle" | "loading" | "succeeded" | "failed";
  rejectReportStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteUserStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReportState = {
  reports: [],
  fetchStatus: "idle",
  blockStatus: "idle",
  deletePostStatus: "idle",
  rejectReportStatus: "idle",
  deleteUserStatus: "idle",
  error: null,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
        state.fetchStatus = "succeeded";
        state.reports = action.payload;
      })
      .addCase(blockUser.fulfilled, (state) => {
        state.blockStatus = "succeeded";
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.deletePostStatus = "succeeded";
      })
      .addCase(rejectReport.fulfilled, (state) => {
        state.rejectReportStatus = "succeeded";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.deleteUserStatus = "succeeded";
      });
  },
});

export default reportsSlice.reducer;
