import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { updateVerificationStatus, revokeCelebrityStatus } from "../store/celebrityRequestSlice";

interface RequestData {
  id: string;
  email: string;
  category: string;
  about: string;
  govid1: string;
  govid2: string;
  articles: string;
  verificationstatus: string;
  appliedDate: string;
  nextApplicableDate: string;
  rejectReason?: string;
  comments?: string;
}

const RequestDetails = ({ requestData }: { requestData: RequestData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAccepted, setIsAccepted] = useState(false);

  if (!requestData) {
    return <p className="text-gray-500">No details available.</p>;
  }

  const {
    id,
    email,
    category,
    about,
    govid1,
    govid2,
    articles,
    verificationstatus,
    appliedDate,
    nextApplicableDate,
    rejectReason,
    comments
  } = requestData;

  const links = articles ? articles.split(' @ ').map((url) => ({ label: url, url })) : [];

  const handleAccept = () => {
    dispatch(
      updateVerificationStatus({
        profileId: id,
        verificationStatus: "verified",
        rejectReason: "",
        comments: "Profile verified successfully.",
      })
    );
    setIsAccepted(true);
  };

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
      <div className="flex items-center gap-4 mb-6">
        <img src={govid1} alt="Profile" className="w-16 h-16 rounded-full border border-gray-300" />
        <div>
          <h2 className="text-lg font-bold text-gray-800">{email}</h2>
          <p className="text-sm text-blue-500 font-semibold">Category: {category}</p>
        </div>
      </div>

      <div className="mb-6 px-10">
        <h3 className="text-sm font-semibold text-gray-800">About</h3>
        <div className="border p-3 mt-2 text-sm text-gray-700 bg-gray-50 rounded-md">{about}</div>
      </div>

      <div className="mb-6 px-10">
        <h3 className="text-sm font-semibold text-gray-800">Government ID:</h3>
        <img src={govid1} alt="Government ID" className="mt-2 w-full rounded-md border" />
      </div>

      <div className="mb-6 px-10">
        <h3 className="text-sm font-semibold text-gray-800">Professional ID:</h3>
        <img src={govid2} alt="Professional ID" className="mt-2 w-full rounded-md border" />
      </div>

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

      <div className="mb-6 px-10">
        <h3 className="text-sm font-semibold text-gray-800">Verification Status: {verificationstatus}</h3>
        <p className="text-gray-600">Applied Date: {new Date(appliedDate).toLocaleDateString()}</p>
        <p className="text-gray-600">Next Applicable Date: {new Date(nextApplicableDate).toLocaleDateString()}</p>
      </div>

      {rejectReason && (
        <div className="mb-6 px-10">
          <h3 className="text-sm font-semibold text-gray-800">Rejection Reason:</h3>
          <p className="text-red-500">{rejectReason}</p>
        </div>
      )}

      {comments && (
        <div className="mb-6 px-10">
          <h3 className="text-sm font-semibold text-gray-800">Admin Comments:</h3>
          <p className="text-gray-700">{comments}</p>
        </div>
      )}

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
