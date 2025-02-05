import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://yc66dd7dug.execute-api.us-east-2.amazonaws.com";

// =============================================================================
// 1. Thunks for Fetching Reports & Actions
// =============================================================================

export const fetchReports = createAsyncThunk(
  "reports/fetchReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/api/reports/getreports`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to fetch reports");
      }
      return rejectWithValue("Unexpected error while fetching reports.");
    }
  }
);

// Actions for Blocking, Deleting, and Rejecting Reports
export const blockUser = createAsyncThunk(
  "reports/blockUser",
  async ({ reportId }: { reportId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/admin/api/reports/${reportId}/blockUser`);
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
      const response = await axios.delete(`${API_BASE_URL}/admin/api/reports/${reportId}/deletePost`);
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
      const response = await axios.put(`${API_BASE_URL}/admin/api/reports/${reportId}/rejectReport`);
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
      const response = await axios.delete(`${API_BASE_URL}/admin/api/reports/${reportId}/deleteUser`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to delete user");
      }
      return rejectWithValue("Unexpected error while deleting user.");
    }
  }
);

// =============================================================================
// 2. Slice
// =============================================================================

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
  reports: [
    {
      id: "1",
      ReportedBy: [{ Name: "It's_me_Daniel", Image: "https://randomuser.me/api/portraits/men/10.jpg" }],
      ReportType: "Public Post",
      ReportMessage: "Scam or Fraud",
      ReportedContent: { Link: "https://d3daoh5g0yvor1.cloudfront.net/1691488933842.png", Type: "Image" },
      ItemPostedBy: { Name: "Chinal Norris", Image: "https://randomuser.me/api/portraits/men/20.jpg" },
      CreatedDate: "Jan 4, 2020 at 21:20",
      Actions: ["Block User", "Delete Post", "Reject Report", "Delete User"],
      AdminActionStatus: "No Action",
    },
    {
      id: "2",
      ReportedBy: [{ Name: "It's_me_Lisa", Image: "https://randomuser.me/api/portraits/women/22.jpg" }],
      ReportType: "Kicks Post",
      ReportMessage: "Self-Injury",
      ReportedContent: { Link: "https://d3daoh5g0yvor1.cloudfront.net/1691489040959.mp4", Type: "Video" },
      ItemPostedBy: { Name: "Chinal Norris", Image: "https://randomuser.me/api/portraits/women/23.jpg" },
      CreatedDate: "Feb 10, 2021 at 15:45",
      Actions: ["Block User", "Delete Post", "Reject Report", "Delete User"],
      AdminActionStatus: "User Blocked",
    },
    {
      id: "3",
      ReportedBy: [{ Name: "Elsa Frozen", Image: "https://randomuser.me/api/portraits/women/30.jpg" }],
      ReportType: "Roots/Relative Post",
      ReportMessage: "Self-Injury",
      ReportedContent: { Link: "64d20ef14ae9067c44447cf4", Type: "Text" },
      ItemPostedBy: { Name: "Chinal Norris", Image: "https://randomuser.me/api/portraits/women/31.jpg" },
      CreatedDate: "Mar 12, 2022 at 10:30",
      Actions: ["Block User", "Delete Post", "Reject Report", "Delete User"],
      AdminActionStatus: "No Action",
    },
  ],
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
      .addCase(blockUser.fulfilled, (state, action) => {
        state.blockStatus = "succeeded";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deletePostStatus = "succeeded";
      })
      .addCase(rejectReport.fulfilled, (state, action) => {
        state.rejectReportStatus = "succeeded";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserStatus = "succeeded";
      });
  },
});

// =============================================================================
// 3. Exports
// =============================================================================
export default reportsSlice.reducer;
