import React, { useState } from "react";

type RequestDetailsProps = {
  requestData: {
    name: string;
    email: string;
    category: string;
    about: string;
    governmentId: string;
    professionalId: string;
    links: { label: string; url: string }[];
    imageUrl: string;
  };
  onAccept: () => void; // Callback for external actions, if needed
  onDecline: () => void; // Callback for external actions, if needed
};

const RequestDetails: React.FC<RequestDetailsProps> = ({
  requestData,
  onAccept,
  onDecline,
}) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const { name, email, category, about, governmentId, professionalId, links, imageUrl } =
    requestData;

  // Accept handler
  const handleAccept = () => {
    setIsAccepted(true); // Update the button text to "Accepted"
    onAccept(); // Trigger the external callback (optional)
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={imageUrl}
          alt={name}
          className="w-16 h-16 rounded-full border border-gray-300"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
          <p className="text-sm text-blue-500 font-semibold">
            Category: {category}
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-6 px-10">
        <h3 className="text-sm font-semibold text-gray-800">About</h3>
        <div className="border p-3 mt-2 text-sm text-gray-700 bg-gray-50 rounded-md">
          {about}
        </div>
      </div>

      {/* Government ID Section */}
      <div className="mb-6 px-10">
        <h3 className="text-sm font-semibold text-gray-800">Government ID:</h3>
        <img
          src={governmentId}
          alt="Government ID"
          className="mt-2 w-full rounded-md border"
        />
      </div>

      {/* Professional ID Section */}
      <div className="mb-6 px-10">
        <h3 className="text-sm font-semibold text-gray-800">Professional ID:</h3>
        <img
          src={professionalId}
          alt="Professional ID"
          className="mt-2 w-full rounded-md border"
        />
      </div>

      {/* Links Section */}
      <div className="mb-6 px-10">
        <h3 className="text-sm font-semibold text-gray-800">Professional Links:</h3>
        <ul className="list-disc list-inside mt-2 text-blue-500">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4 mt-6">
        {/* Accept Button */}
        <button
          onClick={handleAccept}
          className={`w-1/2 py-2 px-6 rounded-md shadow-md text-center ${
            isAccepted
              ? "bg-green-500 text-white cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
          disabled={isAccepted} // Disable button after acceptance
        >
          {isAccepted ? "Accepted" : "Accept"}
        </button>

        {/* Decline Button */}
        <button
          onClick={onDecline}
          className="w-1/2 bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 shadow-md text-center"
        >
            {isAccepted ? "Remove Celebrity Status" : "Decline"}
          
        </button>
      </div>
    </div>
  );
};

export default RequestDetails;
