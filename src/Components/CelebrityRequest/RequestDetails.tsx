import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { updateVerificationStatus, revokeCelebrityStatus } from "../store/celebrityRequestSlice";

const RequestDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAccepted, setIsAccepted] = useState(false);

  // Given requestData
  const requestData = {
    id: "679f20fbc787f743104d58e0",
    profileid: "679f1a8d7700297ac89793b9",
    email: "princesaikatchatterjee@gmail.com",
    category: "Celebrity",
    about:
      "Adi Mahashakti Goddess Durga\n\nThe Hindu Goddess Durga is worshipped as one of the key aspects of the \"Father Ardhya Nariswar Durga goddess\" known as Devta. Devta is the primordial goddess or the creator of the universe...",
    governmentId: "https://d3daoh5g0yvor1.cloudfront.net/7564210652_2Feb2025072726GMT_1738481246834.jpg",
    professionalId: "https://d3daoh5g0yvor1.cloudfront.net/8974349447_2Feb2025072734GMT_1738481254793.jpg",
    links: [
      { label: "Bluesky", url: "https://bsky.app/profile/mahayogidurga.bsky.social" },
      { label: "Facebook", url: "https://www.facebook.com/mahayogidurga" },
      { label: "Twitter", url: "https://www.twitter.com/mahayogidurga" },
      { label: "Pinterest", url: "https://www.pinterest.com/mahayogidurga" },
      { label: "YouTube", url: "https://www.youtube.com/@mahayogidurga" },
    ],
    imageUrl: "https://d3daoh5g0yvor1.cloudfront.net/7564210652_2Feb2025072726GMT_1738481246834.jpg",
  };

  const { id, email, category, about, governmentId, professionalId, imageUrl } = requestData;
  const links = requestData.links || []; // Ensure links is always an array

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
    setIsAccepted(true);
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
        <img src={imageUrl} alt="Profile" className="w-16 h-16 rounded-full border border-gray-300" />
        <div>
          <h2 className="text-lg font-bold text-gray-800">{email}</h2>
          <p className="text-sm text-blue-500 font-semibold">Category: {category}</p>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-6 px-10">
        <h3 className="text-sm font-semibold text-gray-800">About</h3>
        <div className="border p-3 mt-2 text-sm text-gray-700 bg-gray-50 rounded-md">{about}</div>
      </div>

      {/* Government ID Section */}
      <div className="mb-6 px-10">
        <h3 className="text-sm font-semibold text-gray-800">Government ID:</h3>
        <img src={governmentId} alt="Government ID" className="mt-2 w-full rounded-md border" />
      </div>

      {/* Professional ID Section */}
      <div className="mb-6 px-10">
        <h3 className="text-sm font-semibold text-gray-800">Professional ID:</h3>
        <img src={professionalId} alt="Professional ID" className="mt-2 w-full rounded-md border" />
      </div>

      {/* Links Section */}
      <div className="mb-6 px-10">
        <h3 className="text-sm font-semibold text-gray-800">Professional Links:</h3>
        <ul className="list-disc list-inside mt-2 text-blue-500">
          {links.length > 0 ? (
            links.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No links available</li>
          )}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <button
          onClick={handleAccept}
          className={`w-1/2 py-2 px-6 rounded-md shadow-md text-center ${
            isAccepted ? "bg-green-500 text-white cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"
          }`}
          disabled={isAccepted}
        >
          {isAccepted ? "Accepted" : "Accept"}
        </button>

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
