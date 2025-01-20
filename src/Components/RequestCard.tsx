import React from "react";
import { useNavigate } from "react-router-dom";

// Define Props Interface
interface RequestCardProps {
  title: string;
  stats?: { pending?: number; verified?: number; rejected?: number; ongoing?: number; description?: string };
  icon: React.ReactNode;
  bgColor?: string;
  navigateTo: string; // New prop for specifying the navigation route
}

const RequestCard: React.FC<RequestCardProps> = ({ title, stats = {}, icon, bgColor = "bg-blue-100", navigateTo }) => {
  const navigate = useNavigate(); // React Router's navigation hook
  const { pending = 0, verified = 0, rejected = 0, ongoing = 0, description = "" } = stats;

  // Handle navigation on card click
  const handleCardClick = () => {
    navigate(navigateTo);
  };

  return (
    <div
      className={`rounded-lg shadow-md w-80 h-40 flex flex-col justify-center items-center p-4 cursor-pointer ${bgColor}`}
      onClick={handleCardClick} 
    >
      <div className="flex justify-center items-center  w-16 h-16 rounded-full ">
        {icon}
      </div>

      <h2 className="text-gray-700 text-lg font-semibold mt-4">{title}</h2>

      <p className="text-gray-600 text-sm mt-2">
        {pending ? `Pending: ${pending}` : ""}
        {verified ? `, Verified: ${verified}` : ""}
        {rejected ? `, Rejected: ${rejected}` : ""}
        {ongoing ? `Event Going On: ${ongoing}` : ""}
        {description ? description : ""}
      </p>
    </div>
  );
};

export default RequestCard;