import React from 'react';
import { useLocation } from 'react-router-dom';
import EventCreationForm from './EventCreationForm';

const EditEvent = () => {
    const location = useLocation();
    const eventToEdit = location.state?.event;  // Retrieve the event passed through navigate
    return (
        <div>
            <EventCreationForm eventToEdit={eventToEdit} />
        </div>
    );
};

export default EditEvent;
