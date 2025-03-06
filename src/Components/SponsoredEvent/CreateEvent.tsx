import React, { useState, useEffect } from 'react';
import EventCreationForm from './EventCreationForm';

const CreateEvent = ({ handleCreateEventComp, eventToEdit }: any) => {
  const [scheduleTypeOpen, setScheduleTypeOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    country: '',
    scheduleType: '',
    postType: 'Video',
    rootsPosters: [],
    eventPosters: [],
    termsImage: null,
    fromDate: '13 Aug 2021, 10:00 AM',
    toDate: '28 Aug 2021, 10:00 AM'
  });

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        ...eventToEdit,
      });
    }
  }, [eventToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateEvent = () => {
    console.log('Event created or edited:', formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
     <EventCreationForm/>
    </div>
  );
};

export default CreateEvent;
