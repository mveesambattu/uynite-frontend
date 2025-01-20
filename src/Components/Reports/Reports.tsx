import React, { useState } from "react";
import BreadcrumbsWithFilter from "../Breadcrumbs";
import Table from "../Table"; // Reusable table component

const Reports: React.FC = () => {
  const breadcrumbLinks = [
    { label: "Dashboard", path: "/" },
    { label: "Reports", path: "/reports" },
  ];

  const filterOptions = ["Blocked Users", "Deleted Posts", "Rejected Reports", "Deleted Users"];

  const reportsData = [
    {
      ReportedBy: [
        { Name: "It's_me_Daniel", Image: "https://xsgames.co/randomusers/avatar.php?g=male" },
        { Name: "Chinal Norris", Image: "https://xsgames.co/randomusers/assets/avatars/male/76.jpg" },
      ],
      ReportType: "Public Post",
      ReportMessage: "Scam or Fraud",
      ReportedContent: {
        Link: "https://d3daoh5g0yvor1.cloudfront.net/1691488933842.png",
        Type: "Image",
      },
      ItemPostedBy: { Name: "Chinal Norris", Image: "https://xsgames.co/randomusers/assets/avatars/male/77.jpg" },
      CreatedDate: "Jan 4, 2020 at 21:20",
      Actions: ["Block User", "Delete Post", "Reject Report", "Delete User"],
      AdminActionStatus: "No Action",
    },
    {
      ReportedBy: [{ Name: "It's_me_Lisa B", Image: "https://randomuser.me/api/portraits/women/92.jpg" }],
      ReportType: "Kicks Post",
      ReportMessage: "Self-Injury",
      ReportedContent: {
        Link: "https://d3daoh5g0yvor1.cloudfront.net/1691489040959.mp4",
        Type: "Video",
      },
      ItemPostedBy: { Name: "Chinal Norris", Image: "https://randomuser.me/api/portraits/women/90.jpg" },
      CreatedDate: "Jan 4, 2020 at 21:20",
      Actions: ["Block User", "Delete Post", "Reject Report", "Delete User"],
      AdminActionStatus: "No Action",
    },
    {
      ReportedBy: [{ Name: "Elsa Frozen", Image: "https://randomuser.me/api/portraits/women/99.jpg" }],
      ReportType: "Roots/Relative Post",
      ReportMessage: "Self-Injury",
      ReportedContent: { Link: "64d20ef14ae9067c44447cf4", Type: "Text" },
      ItemPostedBy: { Name: "Chinal Norris", Image: "https://randomuser.me/api/portraits/women/88.jpg" },
      CreatedDate: "Jan 4, 2020 at 21:20",
      Actions: ["Block User", "Delete Post", "Reject Report", "Delete User"],
      AdminActionStatus: "User Blocked",
    },
  ];

  const [actionStatuses, setActionStatuses] = useState(
    reportsData.map(() => ({ selectedAction: "", status: "No Action" }))
  );

  const handleActionChange = (index: number, action: string) => {
    const updatedStatuses = [...actionStatuses];
    updatedStatuses[index] = { selectedAction: action, status: `Status: ${action}` };
    setActionStatuses(updatedStatuses);
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

  const tableData = reportsData.map((report, index) => ({
    reportedBy: () => (
      <div>
        {report.ReportedBy.map((user, idx) => (
          <div className="flex items-center mb-1" key={idx}>
            <img src={user.Image} alt={user.Name} className="w-10 h-10 rounded-full mr-3" />
            <p>{user.Name}</p>
          </div>
        ))}
      </div>
    ),
    reportType: report.ReportType,
    reportMessage: report.ReportMessage,
    reportedContent: () => (
      <a
        href={report.ReportedContent.Link}
        className="text-blue-500 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {report.ReportedContent.Type === "Image" && "View Image"}
        {report.ReportedContent.Type === "Video" && "View Video"}
        {report.ReportedContent.Type === "Text" && report.ReportedContent.Link}
      </a>
    ),
    itemPostedBy: () => (
      <div className="flex items-center">
        <img
          src={report.ItemPostedBy.Image}
          alt={report.ItemPostedBy.Name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <p>{report.ItemPostedBy.Name}</p>
      </div>
    ),
    createdDate: report.CreatedDate,
    actions: () => (
      <div>
        <select
          className="border border-gray-300 rounded px-2 py-1 text-sm"
          value={actionStatuses[index].selectedAction}
          onChange={(e) => handleActionChange(index, e.target.value)}
        >
          <option value="" disabled>
            Select Action
          </option>
          {report.Actions.map((action, idx) => (
            <option key={idx} value={action}>
              {action}
            </option>
          ))}
        </select>
        <p className="mt-2 text-gray-500">{actionStatuses[index].status}</p>
      </div>
    ),
  }));

  return (
    <div className="min-h-screen p-6">
      {/* Breadcrumbs with Filter */}
      <BreadcrumbsWithFilter
        links={breadcrumbLinks}
        filterOptions={filterOptions}
        onFilterChange={(filter) => console.log("Selected filter:", filter)}
      />

      <h1 className="text-3xl font-bold text-gray-700 mt-6 mb-4">Reports</h1>

      {/* Table */}
      <Table columns={columns} data={tableData} />
    </div>
  );
};

export default Reports;