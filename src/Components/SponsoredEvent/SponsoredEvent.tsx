import React, { useState, useEffect } from "react";
import BreadcrumbsWithFilter from "../Breadcrumbs";
import SidebarMenu from "../SidebarMenu";
import EventCard from "../EventCard";

const SponsoredEvent: React.FC = () => {
  const breadcrumbLinks = [
    { label: "Dashboard", path: "/" },
    { label: "Sponsored Event", path: "/sponsored-event" },
  ];

  const [activeMenu, setActiveMenu] = useState("Create Event and list");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState<{ title: string; location: string; category: string }[]>([]);

  const allEvents = [
    { title: "Cute Baby Contest", location: "All Countries", category: "Up Comming Events" },
    { title: "Best Photography Contest", location: "Japan", category: "On Going Event" },
    { title: "Beauty Contest", location: "2+ Countries", category: "Completed Events" },
    { title: "Music Fest 2024", location: "USA", category: "Up Comming Events" },
    { title: "Tech Innovation Awards", location: "India", category: "Completed Events" },
    { title: "Startup Pitch Fest", location: "Europe", category: "On Going Event" },
  ];

  useEffect(() => {
    if (activeMenu === "Create Event and list") {
      setVisibleEvents(allEvents);
    } else {
      const filtered = allEvents.filter(event => event.category === activeMenu);
      setVisibleEvents(filtered);
    }
  }, [activeMenu]);

  const handleMenuClick = (menuLabel: string) => {
    setActiveMenu(menuLabel);
    setSelectedEvent(null);
  };

  const menuItems = [
    { label: "Create Event and list", onClick: () => handleMenuClick("Create Event and list"), active: activeMenu === "Create Event and list" },
    { label: "Up Comming Events", onClick: () => handleMenuClick("Up Comming Events"), active: activeMenu === "Up Comming Events" },
    { label: "On Going Event", onClick: () => handleMenuClick("On Going Event"), active: activeMenu === "On Going Event" },
    { label: "Completed Events", onClick: () => handleMenuClick("Completed Events"), active: activeMenu === "Completed Events" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <BreadcrumbsWithFilter links={breadcrumbLinks} />

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="col-span-1">
          <SidebarMenu menuItems={menuItems} />
        </div>

        {/* Event List or Event Detail View */}
        <div className="col-span-2 bg-white rounded shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{activeMenu}</h2>
            {activeMenu === "Create Event and list" && (
              <button 
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
                onClick={() => setIsModalOpen(true)}
                title="Click to create a new event"
              >
                Create Event
              </button>
            )}
          </div>

          {visibleEvents.length > 0 ? (
            visibleEvents.map((event, index) => (
              <EventCard 
                key={index} 
                title={event.title} 
                location={event.location} 
                onClick={() => setSelectedEvent(event.title)} 
              />
            ))
          ) : (
            <p className="text-gray-600 text-center">No events available.</p>
          )}
        </div>
      </div>

      {/* Event Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
            <input 
              type="text" 
              placeholder="Event Name" 
              className="w-full p-2 border rounded mb-3"
            />
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
              onClick={() => setIsModalOpen(false)}
            >
              Save Event
            </button>
            <button 
              className="ml-2 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SponsoredEvent;
