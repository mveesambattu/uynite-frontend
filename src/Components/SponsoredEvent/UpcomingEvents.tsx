import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EventCard from "../EventCard";
import { AppDispatch, RootState } from "../store/store";
import { fetchUpcomingEvents } from "../store/sponsoredEventSlice";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Select upcoming events from Redux store
  const { events, loading, error } = useSelector((state: RootState) => state.sponsoredEvent);

  // Fetch upcoming events on mount
  useEffect(() => {
    dispatch(fetchUpcomingEvents());
  }, [dispatch]);

  const handleEventDetails = (event: any) => {
    navigate(`/sponsored-event/event-details`, { state: { event } });
  };

  return (
    <div>
      {loading ? (
        <p className="text-gray-600 text-center">Loading upcoming events...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : events.length > 0 ? (
        events.map((event, index) => (
          <EventCard
            key={index}
            title={event.eventName}
            location={event.country}
            handleEventClick={() => handleEventDetails(event)}
          />
        ))
      ) : (
        <p className="text-gray-600 text-center">No upcoming events available.</p>
      )}
    </div>
  );
};

export default UpcomingEvents;
