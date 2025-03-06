import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BreadcrumbsWithFilter from "../Breadcrumbs";
import SidebarMenu from "../SidebarMenu";
import EventCard from "../EventCard";

const SponsoredEvent: React.FC = () => {
  const breadcrumbLinks = [
    { label: "Dashboard", path: "/" },
    { label: "Sponsored Event", path: "/sponsored-event" },
  ];
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Create Event and list");
  const [visibleEvents, setVisibleEvents] = useState<any[]>([]); // Store visible events
  const [createdEvents, setCreatedEvents] = useState<any[]>([
    {
      eventName: "Music Festival 2024",
      country: "USA",
      scheduleType: "Up Comming Event",
      postType: "Video",
      rootsPosters: ["rootPoster1.jpg", "rootPoster2.jpg"],
      eventPosters: ["eventPoster1.jpg", "eventPoster2.jpg"],
      termsImage: "termsImage.jpg",
      fromDate: "01 Jan 2024, 10:00 AM",
      toDate: "05 Jan 2024, 10:00 AM",
      category: "Up Comming Events",
    },
    {
      eventName: "Tech Innovation Awards",
      country: "India",
      scheduleType: "On-Going Event",
      postType: "Image",
      rootsPosters: ["techAwardRoot1.jpg"],
      eventPosters: ["techAwardEvent1.jpg"],
      termsImage: "techAwardTerms.jpg",
      fromDate: "10 Mar 2024, 09:00 AM",
      toDate: "15 Mar 2024, 06:00 PM",
      category: "On Going Event",
    },
    {
      eventName: "Startup Pitch Fest",
      country: "Europe",
      scheduleType: "Completed Event",
      postType: "Text",
      rootsPosters: ["pitchFestRoot1.jpg"],
      eventPosters: ["pitchFestEvent1.jpg"],
      termsImage: "pitchFestTerms.jpg",
      fromDate: "20 Dec 2023, 10:00 AM",
      toDate: "25 Dec 2023, 10:00 AM",
      category: "Completed Events",
    },
  ]);

  // Effect to filter events based on active menu
  useEffect(() => {
    if (activeMenu === "Create Event and list") {
      setVisibleEvents(createdEvents); // Show all created events
    } else {
      const normalizedActiveMenu = activeMenu.toLowerCase().replace(/ /g, ""); // Normalize activeMenu
      const filtered = createdEvents.filter(event =>
        event.category.toLowerCase().replace(/ /g, "") === normalizedActiveMenu
      );
      setVisibleEvents(filtered); // Show events based on normalized category
    }
  }, [activeMenu, createdEvents]);

  // Handle menu selection (filtering events by category)
  const handleMenuClick = (menuLabel: string) => {
    // Adjust the path to be based on the active menu
    const path = menuLabel === "" ? "/sponsored-event" : `/sponsored-event/${menuLabel}`;
    navigate(path);
    setActiveMenu(menuLabel); // Update the active menu state
  };

  // Navigate to event details
  const handleEventDetails = (event: any) => {
    navigate("event-details", { state: { event } }); // Pass event data via state
  };

  // Menu items for filtering events by category
  const menuItems = [
    { label: "Create Event and list", onClick: () => handleMenuClick("events-list") },
    { label: "Up Comming Events", onClick: () => handleMenuClick("upcoming-events") },
    { label: "On Going Event", onClick: () => handleMenuClick("ongoing-events") },
    { label: "Completed Events", onClick: () => handleMenuClick("completed-events") },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Breadcrumb Navigation */}
      <BreadcrumbsWithFilter links={breadcrumbLinks} />

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="col-span-1">
          <SidebarMenu menuItems={menuItems} />
        </div>

        {/* Event List */}
        <div className="col-span-2 bg-white rounded shadow p-6">
         
          <Outlet />
{/* 
          {visibleEvents.length > 0 ? (
            visibleEvents.map((event, index) => (
              <EventCard
                key={index}
                title={event.eventName}
                location={event.country}
                handleEventClick={() => handleEventDetails(event)} 
              />
            ))
          ) : (
            <p className="text-gray-600 text-center">No events available.</p>
          )} */}
        </div>
      </div>

      {/* Outlet for nested routes */}
      
    </div>
  );
};

export default SponsoredEvent;
