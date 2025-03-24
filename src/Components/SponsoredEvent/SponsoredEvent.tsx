import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbsWithFilter from "../Breadcrumbs";
import SidebarMenu from "../SidebarMenu";
import EventCard from "../EventCard";
import { AppDispatch, RootState } from "../store/store";
import { fetchUpcomingEvents } from "../store/sponsoredEventSlice";

const SponsoredEvent: React.FC = () => {
  const breadcrumbLinks = [
    { label: "Dashboard", path: "/" },
    { label: "Sponsored Event", path: "/sponsored-event" },
  ];
  const navigate = useNavigate();

  // Correctly type dispatch
  const dispatch = useDispatch<AppDispatch>(); // ✅ Fix the dispatch type issue

  // Use typed selector
  const { events, loading, error } = useSelector((state: RootState) => state.sponsoredEvent);
  console.log(events)
  const [activeMenu, setActiveMenu] = useState("Create Event and list");
  const [visibleEvents, setVisibleEvents] = useState<any[]>([]);

  // Fetch upcoming events on mount
  useEffect(() => {
    dispatch(fetchUpcomingEvents()); // ✅ Now it works correctly
  }, [dispatch]);

  // Effect to filter events based on active menu
  useEffect(() => {
    if (activeMenu === "Create Event and list") {
      setVisibleEvents(events);
    } else {
      const normalizedActiveMenu = activeMenu.toLowerCase().replace(/ /g, "");
      const filtered = events.filter((event: any) =>
        event.category.toLowerCase().replace(/ /g, "") === normalizedActiveMenu
      );
      setVisibleEvents(filtered);
    }
  }, [activeMenu, events]);

  // Handle menu selection
  const handleMenuClick = (menuLabel: string) => {
    const path = menuLabel === "" ? "/sponsored-event" : `/sponsored-event/${menuLabel}`;
    navigate(path);
    setActiveMenu(menuLabel);
  };

  // Navigate to event details
  const handleEventDetails = (event: any) => {
    navigate("event-details", { state: { event } });
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

          {loading ? (
            <p className="text-gray-600 text-center">Loading events...</p>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : visibleEvents.length > 0 ? (
            visibleEvents.map((event, index) => (
              <EventCard
                key={index}
                title={event.tital}
                location={event.country}
                handleEventClick={() => handleEventDetails(event)}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center">No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SponsoredEvent;
