import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EventCard from "../EventCard";
import { AppDispatch, RootState } from "../store/store";
import { fetchCompletedEvents } from "../store/sponsoredEventSlice";

const CompletedEvents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Select completed events from Redux store
  const { completedEvents, loading, error } = useSelector(
    (state: RootState) => state.sponsoredEvent
  );

  // Fetch completed events when the component mounts
  useEffect(() => {
    dispatch(fetchCompletedEvents());
  }, [dispatch]);

  const handleEventDetails = (event: any) => {
    navigate(`/sponsored-event/event-details`, { state: { event } });
  };

  return (
    <div>
      {loading ? (
        <p className="text-gray-600 text-center">Loading completed events...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : completedEvents.length > 0 ? (
        completedEvents.map((event, index) => (
          <EventCard
            key={index}
            title={event.eventName}
            location={event.country}
            handleEventClick={() => handleEventDetails(event)}
          />
        ))
      ) : (
        <p className="text-gray-600 text-center">No completed events available.</p>
      )}
    </div>
  );
};

export default CompletedEvents;
