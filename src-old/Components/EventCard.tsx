import React from "react";

interface EventCardProps {
  title: string;
  location: string;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ title, location, onClick }) => {
  return (
    <div
    className="grid grid-cols-2 bg-gray-300 rounded shadow mb-4 cursor-pointer transition min-h-[45px]"
    onClick={onClick}
    title="Click to view details"
  >
    {/* Left Column */}
    <div className="flex flex-col justify-center p-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-blue-600 hover:underline cursor-pointer">{location}</p>
    </div>
  
    {/* Right Column */}
    <div className="flex justify-end items-center">
      <div className="bg-gray-400 text-white rounded shadow flex items-center justify-center h-full w-20">
        View
      </div>
    </div>
  </div>
  

  );
};

export default EventCard;
