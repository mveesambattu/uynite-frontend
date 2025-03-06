import React from 'react'
import EventCard from '../EventCard'
import { useNavigate } from 'react-router-dom';
import { completedEvents } from './events.json';

const CompletedEvents = () => {
  const navigate = useNavigate();

  // Filter completed events from the createdEvents list

  const handleEventDetails = (event: any) => {
    navigate(`/sponsored-event/event-details`, { state: { event } });
  }

  return (
    <div>      
      {completedEvents.length > 0 ? (
        completedEvents.map((event, index) => (
          <EventCard
            key={index}
            title={event.eventName}
            location={event.country}
            handleEventClick={() => handleEventDetails(event)} // Pass the event to details
          />
        ))
      ) : (
        <p className="text-gray-600 text-center">No completed events available.</p>
      )}
    </div>
  );
}

export default CompletedEvents;
