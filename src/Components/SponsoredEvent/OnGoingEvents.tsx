import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EventCard from "../EventCard";
import { AppDispatch, RootState } from "../store/store";
import { fetchOngoingEvents } from "../store/sponsoredEventSlice";

const OnGoingEvents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Select ongoing events from Redux store
  const { ongoingEvents, loading, error } = useSelector((state: RootState) => state.sponsoredEvent);
  // Fetch ongoing events on mount
  useEffect(() => {
    dispatch(fetchOngoingEvents());
  }, [dispatch]);

  const handleEventDetails = (event: any) => {
    navigate(`/sponsored-event/event-details`, { state: { event } });
  };

  return (
    <div>
      {loading ? (
        <p className="text-gray-600 text-center">Loading ongoing events...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : ongoingEvents.length > 0 ? (
        ongoingEvents.map((event, index) => (
          <EventCard
            key={index}
            title={event.eventName}
            location={event.country}
            handleEventClick={() => handleEventDetails(event)}
          />
        ))
      ) : (
        <p className="text-gray-600 text-center">No ongoing events available.</p>
      )}
    </div>
  );
};

export default OnGoingEvents;
