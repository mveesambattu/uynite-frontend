import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { updateVerificationStatus, revokeCelebrityStatus } from "../store/celebrityRequestSlice";

type RequestDetailsProps = {
  requestData: {
    id: string;
    name: string;
    email: string;
    category: string;
    about: string;
    governmentId: string;
    professionalId: string;
    links: { label: string; url: string }[];
    imageUrl: string;
  };
};

const RequestDetails: React.FC<RequestDetailsProps> = ({ requestData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAccepted, setIsAccepted] = useState(false);

  const { id, name, email, category, about, governmentId, professionalId, links, imageUrl } = requestData;

  // Accept handler
  const handleAccept = () => {
    dispatch(
      updateVerificationStatus({
        profileid: id,
        verificationstatus: "verified",
        rejectReason: "",
        comments: "Profile verified successfully.",
      })
    );
    setIsAccepted(true); // Update the button text to "Accepted"
  };

  // Remove Celebrity Status handler
  const handleRemoveCelebrityStatus = () => {
    dispatch(
      revokeCelebrityStatus({
        profileId: id,
        newStatus: "rejected",
        reason: "Admin decision to revoke status.",
      })
    );
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

        {/* Remove Celebrity Status Button */}
        <button
          onClick={handleRemoveCelebrityStatus}
          className="w-1/2 bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 shadow-md text-center"
        >
          Remove Celebrity Status
        </button>
      </div>
    </div>
  );
};

export default RequestDetails;
