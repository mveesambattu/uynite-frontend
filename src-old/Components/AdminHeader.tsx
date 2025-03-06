import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./../assets/Image.svg";

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToDashboard = () => {
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between p-4">
        <div
          className="flex items-center mb-4 sm:mb-0 cursor-pointer"
          onClick={handleNavigateToDashboard}
        >
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
            <img src={Logo} alt="Sponsored Event" />
          </div>
          <h1 className="text-gray-600 text-lg sm:text-xl ml-4 font-semibold whitespace-nowrap">
            Uynite Admin Center
          </h1>
        </div>

        <button className="text-gray-600 text-sm font-medium hover:text-gray-900">
          Log Out
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
