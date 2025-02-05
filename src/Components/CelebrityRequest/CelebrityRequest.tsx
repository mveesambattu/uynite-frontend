import React, { useEffect, useState } from "react";
import Content from "../Content";
import BreadcrumbsWithFilter from "../Breadcrumbs";
import RequestCard from "../Common/RequestCard";
import Sidebar from "../Sidebar";
import Dropdown from "../Common/Dropdown";
import RequestDetails from "./RequestDetails";
import Modal from "../Common/Modal";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredVerifications } from "../store/celebrityRequestSlice";

const CelebrityRequest: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const breadcrumbLinks = [
    { label: "Dashboard", path: "/" },
    { label: "Celebrity Request", path: "/celebrity-request" },
  ];

  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  const [selectedValue, setSelectedValue] = useState("all"); // Default filter value
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reason, setReason] = useState("");

  const { fetchStatus, data, error } = useSelector(
    (state: RootState) => state.celebrityRequest
  );

  useEffect(() => {
    if (fetchStatus === "idle") {
      dispatch(getFilteredVerifications({ filter: "all", index: 0, size: 10 }));
    }
  }, [dispatch, fetchStatus]);

  const profiles = data || [];

  // Filter profiles based on dropdown selection.
  const filteredProfiles = profiles.filter((profile: any) => {
    if (selectedValue === "all") return true;
    return profile.verificationstatus.toLowerCase() === selectedValue;
  });

  const handleCardClick = (profile: any) => {
    setSelectedProfile(profile);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setReason("");
  };

  const handleSubmit = () => {
    alert(`Reason submitted: ${reason}`);
    setIsModalVisible(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 pt-8">
      <Sidebar title="Celebrity Request" subtitle="">
        <div className="flex justify-end p-2 mt-5">
          <Dropdown
            options={[
              { value: "all", label: "All" },
              { value: "submitted", label: "Submitted" },
              { value: "verified", label: "Verified" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
            ]}
            selectedValue={selectedValue}
            onChange={(value) => setSelectedValue(value)}
            placeholder="View By"
            className="w-64"
          />
        </div>

        {fetchStatus === "loading" && (
          <p className="p-4 text-center text-gray-600">Loading...</p>
        )}

        {fetchStatus === "failed" && (
          <p className="p-4 text-center text-red-600">
            {error || "An error occurred while fetching data."}
          </p>
        )}

        {filteredProfiles.map((profile: any) => (
          <div
            key={profile.id}
            onClick={() => handleCardClick(profile)}
            className="cursor-pointer"
          >
            <RequestCard
              name={profile.email.split('@')[0]} // Display only email username
              role={profile.category}
              status={profile.verificationstatus}
              imageUrl={profile.govid1} // Displaying the first government ID image
            />
          </div>
        ))}
      </Sidebar>

      <div className="ml-[25%] flex-grow p-6 pt-12">
        <BreadcrumbsWithFilter links={breadcrumbLinks} />
        <Content>
          {selectedProfile ? (
            <RequestDetails requestData={selectedProfile} />
          ) : (
            <p className="text-gray-500">Select a profile to view details.</p>
          )}
        </Content>
        <Modal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          title="Are you sure?"
          description="You want to remove celebrity status."
          submitButtonLabel="Yes"
          closeButtonLabel=""
          submitButtonDisabled={!reason.trim()}
        >
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Reason:
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              maxLength={200}
              className="w-full border rounded-md p-2 text-sm text-gray-800 resize-none"
              placeholder="Enter your reason here..."
            />
            <p className="text-xs text-gray-500 text-right">{reason.length}/200</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CelebrityRequest;
