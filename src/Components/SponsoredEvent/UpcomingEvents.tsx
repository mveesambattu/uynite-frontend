import React from 'react'
import EventCard from '../EventCard'
import { useNavigate } from 'react-router-dom';
import { upcomingEvents } from './events.json';

const UpcomingEvents = () => {
  const navigate = useNavigate();

  const handleEventDetails = (event: any) => {
    navigate(`/sponsored-event/event-details`, { state: { event } });
  }

  return (
    <div>
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map((event, index) => (
          <EventCard
            key={index}
            title={event.eventName}
            location={event.country}
            handleEventClick={() => handleEventDetails(event)} // Pass the event to details
          />
        ))
      ) : (
        <p className="text-gray-600 text-center">No upcoming events available.</p>
      )}
    </div>
  );
}

export default UpcomingEvents;
