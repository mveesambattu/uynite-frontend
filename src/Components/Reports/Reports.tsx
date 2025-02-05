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

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(fetchReports());
    }
  }, [dispatch, fetchStatus]);

  const handleActionChange = (reportId: string, action: string) => {
    setSelectedAction(action);
    setSelectedReportId(reportId);
    setModalOpen(true);
  };

  const handleConfirmAction = (reason: string) => {
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

  const columns = [
    { key: "reportedBy", label: "Reported By" },
    { key: "reportType", label: "Report Type" },
    { key: "reportMessage", label: "Report Message" },
    { key: "reportedContent", label: "Reported Content" },
    { key: "itemPostedBy", label: "Item Posted By" },
    { key: "createdDate", label: "Created Date" },
    { key: "actions", label: "Actions" },
  ];

  const tableData = reports.map((report) => ({
    reportedBy: () => (
      <div className="flex items-center">
        <img src={report.ReportedBy[0].Image} alt={report.ReportedBy[0].Name} className="w-10 h-10 rounded-full mr-3" />
        <p>{report.ReportedBy[0].Name}</p>
      </div>
    ),
    reportType: report.ReportType,
    reportMessage: report.ReportMessage,
    reportedContent: () => (
      <a href={report.ReportedContent.Link} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
        {report.ReportedContent.Type}
      </a>
    ),
    itemPostedBy: () => (
      <div className="flex items-center">
        <img src={report.ItemPostedBy.Image} alt={report.ItemPostedBy.Name} className="w-10 h-10 rounded-full mr-3" />
        <p>{report.ItemPostedBy.Name}</p>
      </div>
    ),
    createdDate: report.CreatedDate,
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
