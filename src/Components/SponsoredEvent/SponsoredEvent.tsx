import React, { useState } from "react";
import BreadcrumbsWithFilter from "../Breadcrumbs";
import SidebarMenu from "../SidebarMenu";
import EventCard from "../EventCard";

const SponsoredEvent: React.FC = () => {
  const breadcrumbLinks = [
    { label: "Dashboard", path: "/" },
    { label: "Sponsored Event", path: "/sponsored-event" },
  ];

  const [activeMenu, setActiveMenu] = useState("Create Event");

  const handleMenuClick = (menuLabel: string) => {
    setActiveMenu(menuLabel);
    console.log(`Selected Menu: ${menuLabel}`);
  };

  const menuItems = [
    { label: "Create Event", onClick: () => handleMenuClick("Create Event"), active: activeMenu === "Create Event" },
    { label: "Up Coming Events", onClick: () => handleMenuClick("Up Coming Events"), active: activeMenu === "Up Coming Events" },
    { label: "On Going Event", onClick: () => handleMenuClick("On Going Event"), active: activeMenu === "On Going Event" },
    { label: "Completed Events", onClick: () => handleMenuClick("Completed Events"), active: activeMenu === "Completed Events" },
  ];

  const events = [
    { title: "Cute Baby Contest", location: "All Countries", onView: () => console.log("View: Cute Baby Contest") },
    { title: "Best Photography Contest", location: "Japan", onView: () => console.log("View: Best Photography Contest") },
    { title: "Beauty Contest", location: "2+ Countries", onView: () => console.log("View: Beauty Contest") },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <BreadcrumbsWithFilter links={breadcrumbLinks} />

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sidebar */}
        <div className="col-span-1">
          <SidebarMenu menuItems={menuItems} />
        </div>

        {/* Event Cards */}
        <div className="col-span-1 bg-white rounded shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{activeMenu}</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
              Create Event
            </button>
          </div>
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              location={event.location}

            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsoredEvent;