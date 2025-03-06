import React from "react";

interface SidebarMenuProps {
  menuItems: { label: string; onClick: () => void; active?: boolean }[];
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ menuItems }) => {
  return (
    <div className="bg-white rounded shadow p-4">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={`w-full text-left px-4 py-2 rounded mb-2 ${
            item.active ? "bg-gray-300 font-semibold" : "bg-gray-100"
          } hover:bg-gray-200`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SidebarMenu;