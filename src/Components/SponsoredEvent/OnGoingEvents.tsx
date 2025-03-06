import React from 'react'
import EventCard from '../EventCard'
import { useNavigate } from 'react-router-dom';
import { ongoingEvents } from './events.json';

const OnGoingEvents = () => {
  const navigate = useNavigate();

  // Filter ongoing events from the createdEvents list

  const handleEventDetails = (event: any) => {
    navigate(`/sponsored-event/event-details`, { state: { event } });
  }

  return (
    <div>
      {ongoingEvents.length > 0 ? (
        ongoingEvents.map((event, index) => (
          <EventCard
            key={index}
            title={event.eventName}
            location={event.country}
            handleEventClick={() => handleEventDetails(event)} // Pass the event to details
          />
        ))
      ) : (
        <p className="text-gray-600 text-center">No ongoing events available.</p>
      )}
    </div>
  );
}

export default OnGoingEvents;
