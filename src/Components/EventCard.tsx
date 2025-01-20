import React from "react";

interface EventCardProps {
  title: string;
  location: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, location }) => {
  return (
    <div className="flex justify-between items-center bg-gray-300 rounded shadow mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-blue-600 hover:underline cursor-pointer">{location}</p>
      </div>

      <div className="bg-gray-400 text-white px-4 py-2 rounded shadow flex items-center justify-center">
        View
      </div>
    </div>
  );
};

export default EventCard;
