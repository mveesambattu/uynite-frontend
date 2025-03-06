import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://yc66dd7dug.execute-api.us-east-2.amazonaws.com";

/**
 * Fetch authentication token
 */
export async function fetchAuthTokenFunction(): Promise<string> {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/admin/auth/authenticate`, {
      username: "lsurisetti@uynite.com",
      password: "adminpassword",
    });

    const token = response.data.data.token;
    console.log("Fetched Auth Token:", token);
    localStorage.setItem("authToken", token);
    return token;
  } catch (error) {
    console.error("Authentication Error:", error);
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Authentication failed";
    }
    throw "Unexpected error while fetching token.";
  }
}

/**
 * Fetch reports with pagination
 */
export const fetchReports = createAsyncThunk(
  "reports/fetchReports",
  async ({ page, size }: { page: number; size: number }, { rejectWithValue }) => {
    try {
      const token = await fetchAuthTokenFunction();
      const response = await axios.get(
        `${API_BASE_URL}/admin/api/reports/getreport?page=${page}&size=${size}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Fetched Reports:", response.data.data.content);
      return response.data.data.content;
    } catch (error) {
      console.error("Error fetching reports:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to fetch reports");
      }
      return rejectWithValue("Unexpected error while fetching reports.");
    }
  }
);

/**
 * Block user
 */
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

      console.log("User Blocked:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error blocking user:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to block user");
      }
      return rejectWithValue("Unexpected error while blocking user.");
    }
  }
);

/**
 * Delete post
 */
export const deletePost = createAsyncThunk(
  "reports/deletePost",
  async ({ reportId }: { reportId: string }, { rejectWithValue }) => {
    try {
      const token = await fetchAuthTokenFunction();
      const response = await axios.delete(
        `${API_BASE_URL}/admin/api/reports/${reportId}/deletePost`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Post Deleted:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting post:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to delete post");
      }
      return rejectWithValue("Unexpected error while deleting post.");
    }
  }
);

/**
 * Reject report
 */
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

      console.log("Report Rejected:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error rejecting report:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to reject report");
      }
      return rejectWithValue("Unexpected error while rejecting report.");
    }
  }
);

/**
 * Delete user
 */
export const deleteUser = createAsyncThunk(
  "reports/deleteUser",
  async ({ reportId }: { reportId: string }, { rejectWithValue }) => {
    try {
      const token = await fetchAuthTokenFunction();
      const response = await axios.delete(
        `${API_BASE_URL}/admin/api/reports/${reportId}/deleteUser`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("User Deleted:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to delete user");
      }
      return rejectWithValue("Unexpected error while deleting user.");
    }
  }
);

/**
 * Report Interface
 */
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

/**
 * Initial State
 */
interface ReportState {
  reports: Report[];
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  blockStatus: "idle" | "loading" | "succeeded" | "failed";
  deletePostStatus: "idle" | "loading" | "succeeded" | "failed";
  rejectReportStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteUserStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  size: number;
}

const initialState: ReportState = {
  reports: [],
  fetchStatus: "idle",
  blockStatus: "idle",
  deletePostStatus: "idle",
  rejectReportStatus: "idle",
  deleteUserStatus: "idle",
  error: null,
  page: 0,
  size: 10,
};

/**
 * Reports Slice
 */
const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
        state.fetchStatus = "succeeded";
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload as string;
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

export const { setPage, setSize } = reportsSlice.actions;
export default reportsSlice.reducer;
