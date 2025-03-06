import React, { useEffect, useState } from 'react'
import EventCard from '../EventCard'
import { useNavigate } from 'react-router-dom';
import { createdEvents } from './events.json';

const EventsList = ({ }: any) => {
    const navigate = useNavigate();
    const handleEventDetails = (event: any) => {
        navigate(`/sponsored-event/event-details`, { state: { event } });
    }
    return (
        <div>
            <button onClick={() => navigate(`/sponsored-event/create-event`)}>Create Event</button>
            {createdEvents.length > 0 ? (
                createdEvents.map((event, index) => (
                    <EventCard
                        key={index}
                        title={event.eventName}
                        location={event.country}
                        handleEventClick={() => handleEventDetails(event)} // Pass the event to details
                    />
                ))
            ) : (
                <p className="text-gray-600 text-center">No events available.</p>
            )}
        </div>
    )
}

export default EventsList
