import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  links: { label: string; path: string }[]; // Array of breadcrumb links
  filterOptions?: string[]; // Optional filter options for the dropdown
  onFilterChange?: (selectedFilter: string) => void; // Callback for filter change
}

const BreadcrumbsWithFilter: React.FC<BreadcrumbProps> = ({
  links,
  filterOptions = [],
  onFilterChange,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onFilterChange) {
      onFilterChange(event.target.value);
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-blue-600">
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <Link to={link.path} className="hover:underline">
              {link.label}
            </Link>
            {index < links.length - 1 && (
              <span className="text-gray-400">›</span>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Filter Dropdown */}
      {filterOptions.length > 0 && (
        <div className="relative">
          <label htmlFor="filter" className="sr-only">
            Filter By
          </label>
          <select
            id="filter"
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            onChange={handleFilterChange}
          >
            <option value="" disabled selected>
              Filter By
            </option>
            {filterOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default BreadcrumbsWithFilter;