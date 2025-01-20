import React from "react";

// Define Props Interface
interface TableProps {
  columns: { key: string; label: string }[]; // Array of column definitions
  data: any[]; // Array of data to display
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-200 my-4">
      {/* Table Header */}
      <thead className="bg-gray-100">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="border border-gray-200 p-2 text-left"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td
                key={column.key}
                className="border border-gray-200 p-2"
              >
                {typeof row[column.key] === "function"
                  ? row[column.key]() // Render JSX for custom columns
                  : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;