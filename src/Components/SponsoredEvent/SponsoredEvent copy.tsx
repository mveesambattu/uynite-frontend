
import React, { useState, useEffect } from "react";
import BreadcrumbsWithFilter from "../Breadcrumbs";
import SidebarMenu from "../SidebarMenu";
import EventCard from "../EventCard";
import { useNavigate } from "react-router-dom";
import SponsoredEventForm from "./CreateEvent";

// const SponsoredEvent: React.FC = () => {
//   const breadcrumbLinks = [
//     { label: "Dashboard", path: "/" },
//     { label: "Sponsored Event", path: "/sponsored-event" },
//   ];
//   const [activeMenu, setActiveMenu] = useState("Create Event and list");

//   const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
//   const [visibleEvents, setVisibleEvents] = useState<{ title: string; location: string; category: string }[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [submittedData, setSubmittedData] = useState<any | null>(null);

//   const [allEvents, setAllEvents] = useState([
//     { title: "Cute Baby Contest", location: "All Countries", category: "Up Comming Events" },
//     { title: "Best Photography Contest", location: "Japan", category: "On Going Event" },
//     { title: "Beauty Contest", location: "2+ Countries", category: "Completed Events" },
//     { title: "Music Fest 2024", location: "USA", category: "Up Comming Events" },
//     { title: "Tech Innovation Awards", location: "India", category: "Completed Events" },
//     { title: "Startup Pitch Fest", location: "Europe", category: "On Going Event" },
//   ]);

//   useEffect(() => {
//     if (activeMenu === "Create Event and list") {
//       setVisibleEvents(allEvents);
//     } else {
//       const filtered = allEvents.filter(event => event.category === activeMenu);
//       setVisibleEvents(filtered);
//     }
//   }, [activeMenu, allEvents]);

//   const handleMenuClick = (menuLabel: string) => {
//     setActiveMenu(menuLabel);
//     setSelectedEvent(null); // Reset selected event on menu change
//   };

//   const navigate = useNavigate();

//   const menuItems = [
//     { label: "Create Event and list", onClick: () => handleMenuClick("Create Event and list"), active: activeMenu === "Create Event and list" },
//     { label: "Up Comming Events", onClick: () => handleMenuClick("Up Comming Events"), active: activeMenu === "Up Comming Events" },
//     { label: "On Going Event", onClick: () => handleMenuClick("On Going Event"), active: activeMenu === "On Going Event" },
//     { label: "Completed Events", onClick: () => handleMenuClick("Completed Events"), active: activeMenu === "Completed Events" },
//   ];

//   const renderEventDetails = (event: { title: string; location: string; category: string }) => (
//     <div className="bg-white rounded shadow p-6">
//       <button className="text-xl mb-4 hover:text-blue-500 transition" onClick={() => setSelectedEvent(null)}>
//         &#8592; Back to Events
//       </button>
//       <h3 className="text-xl font-semibold">{event.title}</h3>
//       <p><strong>Location:</strong> {event.location}</p>
//       <p><strong>Category:</strong> {event.category}</p>
//       <div className="mt-4">
//         {/* Add more event details here */}
//         <p className="text-gray-600">More details about the event can be added here.</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <BreadcrumbsWithFilter links={breadcrumbLinks} />

//       <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
//         {/* Sidebar */}
//         <div className="col-span-1">
//           <SidebarMenu menuItems={menuItems} />
//         </div>

//         {/* Event List or Event Detail View */}
//         <div className="col-span-2 bg-white rounded shadow p-6">
//           <button className="text-xl mb-4 hover:text-blue-500 transition" onClick={() => navigate(-1)}>
//             &#8592;
//           </button>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">{activeMenu}</h2>
//             {activeMenu === "Create Event and list" && (
//               <button 
//                 className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
//                 onClick={() => setShowForm(true)}        
//                 title="Click to create a new event"
//               >
//                 Create Event
//               </button>
//             )}
//           </div>

//           {/* {showForm ? (
//             <SponsoredEventForm allEvents={allEvents} setShowForm={setShowForm} />
//           ) : (
//             selectedEvent ? (
//               // If an event is selected, render the event details
//               renderEventDetails(allEvents.find(event => event.title === selectedEvent)!)
//             ) : (
//               visibleEvents.length > 0 ? (
//                 visibleEvents.map((event, index) => (
//                   <EventCard 
//                     key={index} 
//                     title={event.title} 
//                     location={event.location} 
//                     onClick={() => setSelectedEvent(event.title)} 
//                   />
//                 ))
//               ) : (
//                 <p className="text-gray-600 text-center">No events available.</p>
//               )
//             )
//           )} */}
//            {showForm ? (
//             <SponsoredEventForm 
//               allEvents={allEvents} 
//               setShowForm={setShowForm} 
//               setSubmittedData={setSubmittedData} // Pass setSubmittedData to the form
//             />
//           ) : (
//             submittedData && activeMenu === "On Going Event" ? (
//               <div className="mb-6 border border-gray-300 rounded-md p-4 bg-gray-50">
//                 <h3 className="font-bold text-lg text-gray-700 mb-2">
//                   Submitted Event Data
//                 </h3>
//                 <p>
//                   <strong>Event Name:</strong> {submittedData.title}
//                 </p>
//                 <p>
//                   <strong>Selected Country:</strong> {submittedData.location}
//                 </p>
//                 <p>
//                   <strong>Category:</strong> {submittedData.category}
//                 </p>

//                 {/* Edit Button */}
//                 <button
//                   type="button"
//                   className="mt-4 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition"
//                   onClick={() => setSubmittedData(null)} // Clear submittedData to go back
//                 >
//                   Back
//                 </button>
//               </div>
//             ) : (
//               visibleEvents.length > 0 ? (
//                 visibleEvents.map((event, index) => (
//                   <EventCard 
//                     key={index} 
//                     title={event.title} 
//                     location={event.location} 
//                     onClick={() => setSelectedEvent(event.title)} 
//                   />
//                 ))
//               ) : (
//                 <p className="text-gray-600 text-center">No events available.</p>
//               )
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const SponsoredEvent: React.FC = () => {
//   const breadcrumbLinks = [
//     { label: "Dashboard", path: "/" },
//     { label: "Sponsored Event", path: "/sponsored-event" },
//   ];
//   const [upcomingevent, setupcomingevent] = useState([]);

//   const [activeMenu, setActiveMenu] = useState("Create Event and list");

//   const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
//   const [visibleEvents, setVisibleEvents] = useState<{ title: string; location: string; category: string }[]>([]);
//   const [showForm, setShowForm] = useState(false);

//   const [allEvents, setAllEvents] = useState([
//     { title: "Cute Baby Contest", location: "All Countries", category: "Up Comming Events" },
//     { title: "Best Photography Contest", location: "Japan", category: "On Going Event" },
//     { title: "Beauty Contest", location: "2+ Countries", category: "Completed Events" },
//     { title: "Music Fest 2024", location: "USA", category: "Up Comming Events" },
//     { title: "Tech Innovation Awards", location: "India", category: "Completed Events" },
//     { title: "Startup Pitch Fest", location: "Europe", category: "On Going Event" },
//   ]);

//   useEffect(() => {
//     if (activeMenu === "Create Event and list") {
//       setVisibleEvents(allEvents);
//     } else {
//       const filtered = allEvents.filter(event => event.category === activeMenu);
//       setVisibleEvents(filtered);
//     }
//   }, [activeMenu, allEvents]);

//   const handleMenuClick = (menuLabel: string) => {
//     setActiveMenu(menuLabel);
//     setSelectedEvent(null);
//   };

//   const navigate = useNavigate();

//   const menuItems = [
//     { label: "Create Event and list", onClick: () => handleMenuClick("Create Event and list"), active: activeMenu === "Create Event and list" },
//     { label: "Up Comming Events", onClick: () => handleMenuClick("Up Comming Events"), active: activeMenu === "Up Comming Events" },
//     { label: "On Going Event", onClick: () => handleMenuClick("On Going Event"), active: activeMenu === "On Going Event" },
//     { label: "Completed Events", onClick: () => handleMenuClick("Completed Events"), active: activeMenu === "Completed Events" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <BreadcrumbsWithFilter links={breadcrumbLinks} />

//       <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
//         {/* Sidebar */}
//         <div className="col-span-1">
//           <SidebarMenu menuItems={menuItems} />
//         </div>

//         {/* Event List or Event Detail View */}
//         <div className="col-span-2 bg-white rounded shadow p-6">
//           <button className="text-xl mb-4 hover:text-blue-500 transition width: 1000px;" onClick={() => navigate(-1)}>
//             &#8592;
//           </button>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">{activeMenu}</h2>
//             {activeMenu === "Create Event and list" && (
//               <button 
//                 className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
//                 onClick={() => setShowForm(true)}        
//                 title="Click to create a new event"
//               >
//                 Create Event
//               </button>
//             )}
//           </div>

//           {showForm ? (
//             <SponsoredEventForm allEvents={allEvents} setShowForm={setShowForm} />
//           ) : (
//             visibleEvents.length > 0 ? (
//               visibleEvents.map((event, index) => <EventCard 
//                key={index} 
//                title={event.title} 
//                location={event.location} 
//                onClick={() => setSelectedEvent(event.title)} 
//             />)
//             ) : (
//               <p className="text-gray-600 text-center">No events available.</p>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const SponsoredEvent: React.FC = () => {
//   const breadcrumbLinks = [
//     { label: "Dashboard", path: "/" },
//     { label: "Sponsored Event", path: "/sponsored-event" },
//   ];
//   const [upcomingevent, setupcomingevent] = useState([]);

//   const [activeMenu, setActiveMenu] = useState("Create Event and list");
//   const [selectedEvent, setSelectedEvent] = useState<{ title: string; location: string; category: string } | null>(null);
//   const [visibleEvents, setVisibleEvents] = useState<{ title: string; location: string; category: string }[]>([]);
//   const [showForm, setShowForm] = useState(false);

//   const [allEvents, setAllEvents] = useState([
//     { title: "Cute Baby Contest", location: "All Countries", category: "Up Comming Events" },
//     { title: "Best Photography Contest", location: "Japan", category: "On Going Event" },
//     { title: "Beauty Contest", location: "2+ Countries", category: "Completed Events" },
//     { title: "Music Fest 2024", location: "USA", category: "Up Comming Events" },
//     { title: "Tech Innovation Awards", location: "India", category: "Completed Events" },
//     { title: "Startup Pitch Fest", location: "Europe", category: "On Going Event" },
//   ]);

//   useEffect(() => {
//     if (activeMenu === "Create Event and list") {
//       setVisibleEvents(allEvents);
//     } else {
//       const filtered = allEvents.filter(event => event.category === activeMenu);
//       setVisibleEvents(filtered);
//     }
//   }, [activeMenu, allEvents]);

//   const handleMenuClick = (menuLabel: string) => {
//     setActiveMenu(menuLabel);
//     setSelectedEvent(null); // Clear selected event when switching menus
//   };

//   const navigate = useNavigate();

//   const menuItems = [
//     { label: "Create Event and list", onClick: () => handleMenuClick("Create Event and list"), active: activeMenu === "Create Event and list" },
//     { label: "Up Comming Events", onClick: () => handleMenuClick("Up Comming Events"), active: activeMenu === "Up Comming Events" },
//     { label: "On Going Event", onClick: () => handleMenuClick("On Going Event"), active: activeMenu === "On Going Event" },
//     { label: "Completed Events", onClick: () => handleMenuClick("Completed Events"), active: activeMenu === "Completed Events" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <BreadcrumbsWithFilter links={breadcrumbLinks} />

//       <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
//         {/* Sidebar */}
//         <div className="col-span-1">
//           <SidebarMenu menuItems={menuItems} />
//         </div>

//         {/* Event List or Event Detail View */}
//         <div className="col-span-2 bg-white rounded shadow p-6">
//           <button className="text-xl mb-4 hover:text-blue-500 transition width: 1000px;" onClick={() => navigate(-1)}>
//             &#8592;
//           </button>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">{activeMenu}</h2>
//             {activeMenu === "Create Event and list" && (
//               <button 
//                 className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
//                 onClick={() => setShowForm(true)}        
//                 title="Click to create a new event"
//               >
//                 Create Event
//               </button>
//             )}
//           </div>

//           {showForm ? (
//             <SponsoredEventForm allEvents={allEvents} setShowForm={setShowForm} />
//           ) : selectedEvent ? (
//             // Show event details if an event is selected
//             <div className="mb-6 border border-gray-300 rounded-md p-4 bg-gray-50">
//               <h3 className="font-bold text-lg text-gray-700 mb-2">
//                 Event Details
//               </h3>
//               <p>
//                 <strong>Event Name:</strong> {selectedEvent.title}
//               </p>
//               <p>
//                 <strong>Location:</strong> {selectedEvent.location}
//               </p>
//               <p>
//                 <strong>Category:</strong> {selectedEvent.category}
//               </p>
//               <button
//                 type="button"
//                 className="mt-4 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition"
//                 onClick={() => setSelectedEvent(null)} // Go back to the list
//               >
//                 Back to List
//               </button>
//             </div>
//           ) : (
//             // Show event list if no event is selected
//             visibleEvents.length > 0 ? (
//               visibleEvents.map((event, index) => (
//                 <EventCard 
//                   key={index} 
//                   title={event.title} 
//                   location={event.location} 
//                   onClick={() => setSelectedEvent(event)} // Set the selected event
//                 />
//               ))
//             ) : (
//               <p className="text-gray-600 text-center">No events available.</p>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const SponsoredEvent: React.FC = () => {
//   const breadcrumbLinks = [
//     { label: "Dashboard", path: "/" },
//     { label: "Sponsored Event", path: "/sponsored-event" },
//   ];
//   const [upcomingevent, setupcomingevent] = useState([]);

//   const [activeMenu, setActiveMenu] = useState("Create Event and list");
//   const [selectedEvent, setSelectedEvent] = useState<any | null>(null); // Store the selected event details
//   const [visibleEvents, setVisibleEvents] = useState<{ title: string; location: string; category: string }[]>([]);
//   const [showForm, setShowForm] = useState(false);

//   const [allEvents, setAllEvents] = useState([
//     { title: "Cute Baby Contest", location: "All Countries", category: "Up Comming Events" },
//     { title: "Best Photography Contest", location: "Japan", category: "On Going Event" },
//     { title: "Beauty Contest", location: "2+ Countries", category: "Completed Events" },
//     { title: "Music Fest 2024", location: "USA", category: "Up Comming Events" },
//     { title: "Tech Innovation Awards", location: "India", category: "Completed Events" },
//     { title: "Startup Pitch Fest", location: "Europe", category: "On Going Event" },
//   ]);

//   useEffect(() => {
//     if (activeMenu === "Create Event and list") {
//       setVisibleEvents(allEvents);
//     } else {
//       const filtered = allEvents.filter(event => event.category === activeMenu);
//       setVisibleEvents(filtered);
//     }
//   }, [activeMenu, allEvents]);

//   const handleMenuClick = (menuLabel: string) => {
//     setActiveMenu(menuLabel);
//     setSelectedEvent(null); // Clear selected event when switching menus
//   };

//   const navigate = useNavigate();


//   const menuItems = [
//     { label: "Create Event and list", onClick: () => handleMenuClick("Create Event and list"), active: activeMenu === "Create Event and list" },
//     { label: "Up Comming Events", onClick: () => handleMenuClick("Up Comming Events"), active: activeMenu === "Up Comming Events" },
//     { label: "On Going Event", onClick: () => handleMenuClick("On Going Event"), active: activeMenu === "On Going Event" },
//     { label: "Completed Events", onClick: () => handleMenuClick("Completed Events"), active: activeMenu === "Completed Events" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <BreadcrumbsWithFilter links={breadcrumbLinks} />

//       <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
//         {/* Sidebar */}
//         <div className="col-span-1">
//           <SidebarMenu menuItems={menuItems} />
//         </div>

//         {/* Event List or Event Detail View */}
//         <div className="col-span-2 bg-white rounded shadow p-6">
//           <button className="text-xl mb-4 hover:text-blue-500 transition width: 1000px;" onClick={() => navigate(-1)}>
//             &#8592;
//           </button>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">{activeMenu}</h2>
//             {activeMenu === "Create Event and list" && (
//               <button 
//                 className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
//                 onClick={() => setShowForm(true)}        
//                 title="Click to create a new event"
//               >
//                 Create Event
//               </button>
//             )}
//           </div>

//           {showForm ? (
//             <SponsoredEventForm allEvents={allEvents} setShowForm={setShowForm} />
//           ) : selectedEvent ? (
//             // Show event details if an event is selected
            
//             <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-300">
        
//    {/* Header Section */}
//    <div>
   
//    </div>
//    <h3 className="text-xl font-semibold text-gray-800 mb-4">
//      <span className="align-center text-black-500">{selectedEvent.eventName}</span>{" "}
    
//    </h3>
 
 
 
//    {/* Country Selection */}
//    <p className="text-gray-600 mb-2">
//      <strong>Selected Country:</strong>{" "}
//      <span className="text-blue-500 underline">{selectedEvent.country}</span>
//    </p>
 
//    <p className="text-gray-600">
//      <strong>Schedule Type:</strong> {selectedEvent.scheduleType}
//    </p>
//    <p className="text-gray-600">
//      <strong>Media Type:</strong> {selectedEvent.mediaType}
//    </p>
 
//    {/* Date Section */}
//    <div className="flex items-center mt-3 text-gray-700">
//      <p className="mr-4">
//        <strong>From:</strong> {selectedEvent.startDate}
//      </p>
//      <p>
//        <strong>To:</strong> {selectedEvent.endDate}
//      </p>
//    </div>
 
//    {/* Posters Section */}
//    <div className="mt-6">
//      <h4 className="text-lg font-semibold text-gray-800 mb-2">Posters Display in Roots</h4>
//      {selectedEvent.rootPoster1 && (
//        <img
//          src={selectedEvent.rootPoster1}
//          alt="Root Poster 1"
//            className="max-w-full h-auto object-contain"
//        />
//      )}
//    </div>
 
//    <div className="mt-4">
//      <h4 className="text-lg font-semibold text-gray-800 mb-2">Posters Display into Event</h4>
//      {selectedEvent.rootPoster2 && (
//        <img
//          src={selectedEvent.rootPoster2}
//          alt="Root Poster 2"
//           className="max-w-full h-auto object-contain"
//        />
//      )}
//    </div>
 
//    {/* Terms & Conditions Image */}
//    <div className="mt-6">
//      <h4 className="text-lg font-semibold text-gray-800 mb-2">Terms & Conditions</h4>
//      {selectedEvent.termsImage && (
//        <img
//          src={selectedEvent.termsImage}
//          alt="Terms & Conditions Poster"
//            className="max-w-full h-auto object-contain"
//        />
//      )}
//    </div>
 
//    {/* Buttons */}
//    <button
//        type="button"
//        className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition mr-21.5rem"    //
//       // onClick={}
//      >
//        Edit Event
//      </button>
//    <div className="flex justify-between ml-50px items-center mt-6">
     
 
//      <button
//        disabled
//        className=" ml-50px px-5 py-2 bg-gray-300 text-gray-600 font-semibold rounded-lg cursor-not-allowed"
//      >
//        Event Created into List Successfully
//      </button>
//    </div>
//  </div>
//           ) : (
//             // Show event list if no event is selected
//             visibleEvents.length > 0 ? (
//               visibleEvents.map((event, index) => (
//                 <EventCard 
//                   key={index} 
//                   title={event.title} 
//                   location={event.location} 
//                   onClick={() => setSelectedEvent(event)} // Set the selected event
//                 />
//               ))
//             ) : (
//               <p className="text-gray-600 text-center">No events available.</p>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


//now
const SponsoredEvent: React.FC = () => {
  const breadcrumbLinks = [
    { label: "Dashboard", path: "/" },
    { label: "Sponsored Event", path: "/sponsored-event" },
  ];
  const [upcomingevent, setupcomingevent] = useState([]);

  const [activeMenu, setActiveMenu] = useState("Create Event and list");
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null); // Store the selected event details
  const [visibleEvents, setVisibleEvents] = useState<{ title: string; location: string; category: string }[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [allEvents, setAllEvents] = useState([
    { title: "Cute Baby Contest", location: "All Countries", category: "Up Comming Events" },
    { title: "Best Photography Contest", location: "Japan", category: "On Going Event" },
    { title: "Beauty Contest", location: "2+ Countries", category: "Completed Events" },
    { title: "Music Fest 2024", location: "USA", category: "Up Comming Events" },
    { title: "Tech Innovation Awards", location: "India", category: "Completed Events" },
    { title: "Startup Pitch Fest", location: "Europe", category: "On Going Event" },
  ]);

  useEffect(() => {
    if (activeMenu === "Create Event and list") {
      setVisibleEvents(allEvents);
    } else {
      const filtered = allEvents.filter(event => event.category === activeMenu);
      setVisibleEvents(filtered);
    }
  }, [activeMenu, allEvents]);

  const handleMenuClick = (menuLabel: string) => {
    setActiveMenu(menuLabel);
    setSelectedEvent(null); // Clear selected event when switching menus
  };

  const navigate = useNavigate();

  const menuItems = [
    { label: "Create Event and list", onClick: () => handleMenuClick("Create Event and list"), active: activeMenu === "Create Event and list" },
    { label: "Up Comming Events", onClick: () => handleMenuClick("Up Comming Events"), active: activeMenu === "Up Comming Events" },
    { label: "On Going Event", onClick: () => handleMenuClick("On Going Event"), active: activeMenu === "On Going Event" },
    { label: "Completed Events", onClick: () => handleMenuClick("Completed Events"), active: activeMenu === "Completed Events" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <BreadcrumbsWithFilter links={breadcrumbLinks} />

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="col-span-1">
          <SidebarMenu menuItems={menuItems} />
        </div>

        {/* Event List or Event Detail View */}
        <div className="col-span-2 bg-white rounded shadow p-6">
          <button className="text-xl mb-4 hover:text-blue-500 transition width: 1000px;" onClick={() => navigate(-1)}>
            &#8592;
          </button>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{activeMenu}</h2>
            {activeMenu === "Create Event and list" &&!showForm && !selectedEvent && (
              // <button 
              //   className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
              //   onClick={() => setShowForm(true)}        
              //   title="Click to create a new event"
              //   id="createbutton"
              // >
              //   Create Event
              // </button>
              <button 
  className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
  onClick={() => setShowForm(true)}        
  title="Click to create a new event"
>
  Create Event
</button>
            )}
          </div>

          {showForm ? (
            <SponsoredEventForm 
              allEvents={allEvents} 
              setShowForm={setShowForm} 
              eventToEdit={selectedEvent} // Pass the selected event to the form
            />
            
          ) : selectedEvent ? (
            // Show event details if an event is selected
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-300">
              {/* Header Section */}
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                <span className="align-center text-black-500">{selectedEvent.eventName}</span>{" "}
              </h3>

              {/* Country Selection */}
              <p className="text-gray-600 mb-2">
                <strong>Selected Country:</strong>{" "}
                <span className="text-blue-500 underline">{selectedEvent.country}</span>
              </p>

              <p className="text-gray-600">
                <strong>Schedule Type:</strong> {selectedEvent.scheduleType}
              </p>
              <p className="text-gray-600">
                <strong>Media Type:</strong> {selectedEvent.mediaType}
              </p>

              {/* Date Section */}
              <div className="flex items-center mt-3 text-gray-700">
                <p className="mr-4">
                  <strong>From:</strong> {selectedEvent.startDate}
                </p>
                <p>
                  <strong>To:</strong> {selectedEvent.endDate}
                </p>
              </div>

              {/* Posters Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Posters Display in Roots</h4>
                {selectedEvent.rootPoster1 && (
                  <img
                    src={selectedEvent.rootPoster1}
                    alt="Root Poster 1"
                    className="max-w-full h-auto object-contain"
                  />
                )}
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Posters Display into Event</h4>
                {selectedEvent.rootPoster2 && (
                  <img
                    src={selectedEvent.rootPoster2}
                    alt="Root Poster 2"
                    className="max-w-full h-auto object-contain"
                  />
                )}
              </div>

              {/* Terms & Conditions Image */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Terms & Conditions</h4>
                {selectedEvent.termsImage && (
                  <img
                    src={selectedEvent.termsImage}
                    alt="Terms & Conditions Poster"
                    className="max-w-full h-auto object-contain"
                  />
                )}
              </div>

              {/* Buttons */}
              <button
                type="button"
                className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition mr-21.5rem"
                onClick={() => setShowForm(true)} // Show the form with the selected event data
              >
                Edit Event
              </button>
              <div className="flex justify-between ml-50px items-center mt-6">
                <button
                  disabled
                  className=" ml-50px px-5 py-2 bg-gray-300 text-gray-600 font-semibold rounded-lg cursor-not-allowed"
                >
                  Event Created into List Successfully
                </button>
              </div>
            </div>
          ) : (
            // Show event list if no event is selected
            visibleEvents.length > 0 ? (
              visibleEvents.map((event, index) => (
                <EventCard 
                  key={index} 
                  title={event.title} 
                  location={event.location} 
                  onClick={() => setSelectedEvent(event)} // Set the selected event
                />
              ))
            ) : (
              <p className="text-gray-600 text-center">No events available.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};


export default SponsoredEvent;