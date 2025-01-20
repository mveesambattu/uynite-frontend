import React, { useState } from "react";
import Content from "../Content";
import BreadcrumbsWithFilter from "../Breadcrumbs";
import RequestCard from "../Common/RequestCard";
import Sidebar from "../Sidebar";
import Dropdown from "../Common/Dropdown";
import RequestDetails from "./RequestDetails";
import Modal from "../Common/Modal";

const CelebrityRequest: React.FC = () => {
  const breadcrumbLinks = [
    { label: "Dashboard", path: "/" },
    { label: "Celebrity Request", path: "/celebrity-request" },
  ];

  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
  const [selectedValue, setSelectedValue] = useState("all"); // Default filter value
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reason, setReason] = useState("");

  const profiles = [
    { id: "1", name: "Nikki Thomas", role: "Blogger", status: "Verified", imageUrl: "https://randomuser.me/api/portraits/men/64.jpg" },
    { id: "2", name: "Jane Doe", role: "Photographer", status: "Pending", imageUrl: "https://randomuser.me/api/portraits/men/65.jpg" },
    { id: "3", name: "John Smith", role: "Writer", status: "Approved", imageUrl: "https://randomuser.me/api/portraits/men/66.jpg" },
  ];

  const options = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "verified", label: "Verified" },
    { value: "approved", label: "Approved" }, // Ensure it matches profile data
  ];

  // Filter profiles based on dropdown selection
  const filteredProfiles = profiles.filter((profile) => {
    if (selectedValue === "all") return true;
    return profile.status.toLowerCase() === selectedValue;
  });

  // Handle card click to set the selected profile
  const handleCardClick = (profile: any) => {
    setSelectedProfile({
      name: profile.name,
      email: `${profile.name.split(" ").join("").toLowerCase()}@gmail.com`,
      category: profile.role,
      about: `This is a detailed profile description for ${profile.name}. They work as a ${profile.role} and their current status is ${profile.status}.`,
      governmentId: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Passport_of_the_Citizen_of_Ukraine_%28Since_2016%29.jpg/250px-Passport_of_the_Citizen_of_Ukraine_%28Since_2016%29.jpg",
      professionalId: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Passport_of_the_Citizen_of_Ukraine_%28Since_2016%29.jpg/250px-Passport_of_the_Citizen_of_Ukraine_%28Since_2016%29.jpg",
      imageUrl: profile.imageUrl,
      links: [
        { label: "Portfolio", url: "http://example.com/portfolio" },
        { label: "LinkedIn", url: "http://example.com/linkedin" },
        { label: "GitHub", url: "http://example.com/github" },
      ],
    });
  };

  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setReason("");
  };

  const handleSubmit = () => {
    alert(`Reason submitted: ${reason}`);
    setIsModalVisible(false);
  };

  const handleAccept = () => alert(`Accepted ${selectedProfile?.name}`);
  const handleDecline = () => handleOpenModal();

  return (
    <div className="flex min-h-screen bg-gray-100 pt-8">
      {/* Fixed Sidebar */}
      <Sidebar title="Celebrity Request" subtitle="">
        <div className="flex justify-end p-2 mt-5">
          <Dropdown
            options={options}
            selectedValue={selectedValue}
            onChange={(value) => setSelectedValue(value)}
            placeholder="View By"
            className="w-64"
          />
        </div>
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => handleCardClick(profile)}
            className="cursor-pointer"
          >
            <RequestCard
              name={profile.name}
              role={profile.role}
              status={profile.status}
              imageUrl={profile.imageUrl}
            />
          </div>
        ))}
      </Sidebar>

      {/* Main Content */}
      <div className="ml-[25%] flex-grow p-6 pt-12">
        <BreadcrumbsWithFilter links={breadcrumbLinks} />
        <Content>
          {selectedProfile ? (
            <RequestDetails
              requestData={selectedProfile}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          ) : (
            <p className="text-gray-500">Select a profile to view details.</p>
          )}
        </Content>
        <Modal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          title="Are you sure?"
          description="You want to Remove Celebrity Status."
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
