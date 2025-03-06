import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EventDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event; // Retrieve the event passed through navigate

  if (!event) {
    return <div className="p-4 text-center">No event details available.</div>;
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="flex items-center mb-4">
          <button className="mr-4" onClick={() => navigate(`/sponsored-event/events-list`)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold flex-grow">Event Details</h2>
          <button
            className="text-blue-500"
            onClick={() => navigate(`/sponsored-event/edit-event`, { state: { event } })}
          >
            Edit Event
          </button>
        </div>

        {/* Event Type and Countries */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <div>
              <span className="text-xs text-gray-500">Event Type</span>
              <p className="text-base font-medium">{event.scheduleType || "Sponsored Event"}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Selected Countries</span>
              <p className="text-base font-medium text-right">{event.country || "India, USA, Japan"}</p>
            </div>
          </div>
        </div>

        {/* Posters */}
        <div className="mb-4 space-y-4">
          <div>
            <span className="text-xs text-gray-500 block mb-2">Posters Display in Roots</span>
            <img
              src={event.rootsPosters[0] || "https://placehold.co/600x400/000000/FFF?text=Poster"}
              alt="Posters Display in Roots"
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <span className="text-xs text-gray-500 block mb-2">Posters Display into Event</span>
            <img
              src={event.eventPosters[0] || "https://placehold.co/600x400/000000/FFF?text=Poster"}
              alt="Posters Display into Event"
              className="w-full rounded-lg"
            />
          </div>
        </div>

        {/* Event Dates */}
        <div className="mb-4 flex justify-between">
          <div>
            <span className="text-xs text-gray-500 block">From</span>
            <p className="text-base">{event.fromDate || "15 Aug 2021, 10:00 AM"}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500 block text-right">To</span>
            <p className="text-base text-right">{event.toDate || "20 Aug 2021, 10:00 AM"}</p>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mb-4">
          <span className="text-xs text-gray-500 block mb-2">Terms & Conditions</span>
          <div className="bg-gray-100 rounded-lg p-4 max-h-60 overflow-y-auto text-xs text-gray-700">
            {event.termsImage ? (
              <img src={event.termsImage} alt="Terms & Conditions" className="mx-auto mb-2 rounded" />
            ) : (
              <p>Terms and conditions not provided.</p>
            )}
          </div>
        </div>

        {/* Event Created Button */}
        <div className="text-center mt-4">
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg w-full">
            Event Created into List Successfully
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
