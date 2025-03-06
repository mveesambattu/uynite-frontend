import React from "react";

type DropdownProps = {
    options: { value: string; label: string }[]; // Array of options
    selectedValue: string; // Currently selected value
    onChange: (value: string) => void; // Callback for when the value changes
    placeholder?: string; // Optional placeholder text
    className?: string; // Optional additional classes for styling
};

const Dropdown: React.FC<DropdownProps> = ({
    options,
    selectedValue,
    onChange,
    placeholder = "Select an option",
    className = "",
}) => {
    return (
        <div className={`relative border border-gray-300 rounded-md px-4 py-2 inline-flex items-center w-48 ${className}`}>
            <select
                value={selectedValue}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-[#05A5C3] font-medium bg-transparent border-none focus:outline-none focus:ring-0 appearance-none pr-8"
            >
                {/* Placeholder option */}
                <option value="" disabled>
                    {placeholder}
                </option>
                {/* Render options */}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {/* Dropdown Icon */}
            <div className="absolute right-3 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9l6 6 6-6"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Dropdown;
