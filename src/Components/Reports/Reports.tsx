import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbsWithFilter from "../Breadcrumbs";
import Table from "../Table";
import ActionModal from "./ActionModal";
import { AppDispatch, RootState } from "../store/store";
import { fetchReports, blockUser, deletePost, deleteUser, rejectReport } from "../store/reportsSlice";

const Reports: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reports = useSelector((state: RootState) => state.reports.reports);
  const fetchStatus = useSelector((state: RootState) => state.reports.fetchStatus);

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    dispatch(fetchReports({ page, size }));
  }, [dispatch, page, size]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(event.target.value));
  };

  const handleActionChange = (reportId: string, action: string) => {
    setSelectedAction(action);
    setSelectedReportId(reportId);
    setModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (!selectedReportId || !selectedAction) return;

    switch (selectedAction) {
      case "Block User":
        dispatch(blockUser({ reportId: selectedReportId }));
        break;
      case "Delete Post":
        dispatch(deletePost({ reportId: selectedReportId }));
        break;
      case "Reject Report":
        dispatch(rejectReport({ reportId: selectedReportId }));
        break;
      case "Delete User":
        dispatch(deleteUser({ reportId: selectedReportId }));
        break;
      default:
        console.error("Invalid Action");
        break;
    }

    setModalOpen(false);
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString();
  };

  const columns = [
    { key: "reportedBy", label: "Reported By" },
    { key: "reportType", label: "Report Type" },
    { key: "reportMessage", label: "Report Message" },
    { key: "reportedContent", label: "Reported Content" },
    { key: "status", label: "Status" },
    { key: "createdDate", label: "Created Date" },
    { key: "actions", label: "Actions" },
  ];

  const tableData = reports.map((report: any) => ({
    reportedBy: () => (
      <div className="flex items-center">
        <img
          src={report.reportedByProfile?.pimage || "https://via.placeholder.com/40"}
          alt={report.reportedByProfile?.fname || "Unknown"}
          className="w-10 h-10 rounded-full mr-3"
        />
        <p>{`${report.reportedByProfile?.fname || "Unknown"} ${report.reportedByProfile?.lname || ""}`}</p>
      </div>
    ),
    reportType: report.reportType,
    reportMessage: report.reportMessage,
    reportedContent: () => (
      <a href={report.reportedContentUrl} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
        {report.reportedContentType}
      </a>
    ),
    status: report.status,
    createdDate: formatDate(report.createdDate),
    actions: () => (
      <div>
        <select
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          onChange={(e) => handleActionChange(report.id, e.target.value)}
        >
          <option value="" disabled selected>
            Select Action
          </option>
          {["Block User", "Delete Post", "Reject Report", "Delete User"].map((action, idx) => (
            <option key={idx} value={action}>
              {action}
            </option>
          ))}
        </select>
      </div>
    ),
  }));

  return (
    <div className="min-h-screen p-6">
      <BreadcrumbsWithFilter links={[{ label: "Dashboard", path: "/" }, { label: "Reports", path: "/reports" }]} />

      <h1 className="text-3xl font-bold text-gray-700 mt-6 mb-4">Reports</h1>

      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2">Records per page:</label>
          <select className="border px-2 py-1 rounded" value={size} onChange={handleSizeChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div>
          <button
            className="px-4 py-2 mr-2 bg-gray-300 rounded"
            disabled={page === 0}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handlePageChange(page + 1)}>
            Next
          </button>
        </div>
      </div>

      {fetchStatus === "loading" ? (
        <p>Loading reports...</p>
      ) : fetchStatus === "failed" ? (
        <p className="text-red-500">Failed to load reports.</p>
      ) : (
        <Table columns={columns} data={tableData} />
      )}

      <ActionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        actionType={selectedAction || ""}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
};

export default Reports;
