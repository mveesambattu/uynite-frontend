import React from "react";

type SidebarProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ title, subtitle, children }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-1/4 bg-gray-100 p-4 pt-8 shadow-md">
      <h1 className="text-xl font-semibold text-center mb-2" style={{ color: "#05B7FD" }}>
        {title}
      </h1>
      <h2 className="text-sm text-gray-500 mb-4">{subtitle}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Sidebar;
