
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import UploadIcon  from "./UploadIcon.svg";
import UploadImage from './UploadIcon.svg';




// const SponsoredEventForm: React.FC<{ 
//   allEvents: any[], 
//   setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
//   eventToEdit?: any // Optional prop for editing an event
// }> = ({ allEvents, setShowForm, eventToEdit }) => {
//   const navigate = useNavigate();

//   // ---- Form states ----
//   const [eventName, setEventName] = useState(eventToEdit?.eventName || "");
//   const [country, setCountry] = useState(eventToEdit?.country || "");
//   const [scheduleType, setScheduleType] = useState(eventToEdit?.scheduleType || "");
//   const [mediaType, setMediaType] = useState(eventToEdit?.mediaType || "Video");
//   const [rootPoster1, setRootPoster1] = useState<string | null>(eventToEdit?.rootPoster1 || null);
//   const [rootPoster2, setRootPoster2] = useState<string | null>(eventToEdit?.rootPoster2 || null);
//   const [startDate, setStartDate] = useState(eventToEdit?.startDate || "");
//   const [endDate, setEndDate] = useState(eventToEdit?.endDate || "");
//   const [termsImage, setTermsImage] = useState<string | null>(eventToEdit?.termsImage || null);

//   // ---- Submission states ----
//   const [submittedData, setSubmittedData] = useState<any | null>(null);
//   const [isEditing, setIsEditing] = useState(!!eventToEdit); // Set to true if eventToEdit is provided

//   const handleImageChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     setImage: React.Dispatch<React.SetStateAction<string | null>>
//   ) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const dataToSubmit = {
//       title: eventName,
//       location: country,
//       category: "On Going Event", // Automatically set category to "On Going Event"
//       eventName,
//       country,
//       scheduleType,
//       mediaType,
//       rootPoster1,
//       rootPoster2,
//       startDate,
//       endDate,
//       termsImage,
//     };

//     setSubmittedData(dataToSubmit);

//     if (eventToEdit) {
//       // Update the existing event
//       const index = allEvents.findIndex(event => event.title === eventToEdit.title);
//       if (index !== -1) {
//         allEvents[index] = dataToSubmit;
//       }
//     } else {
//       // Add new event
//       allEvents.push(dataToSubmit);
//     }

//     console.log(allEvents);
//     setIsEditing(false); // Hide the form, show submitted data
//   };

//   const handleEdit = () => {
//     setIsEditing(true); // Show the form for editing
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg lg:grid-cols-0 shadow-lg border border-gray-200">
//       {/* Back Button */}
//       <button
//         className="text-xl mb-4 hover:text-blue-500 transition"
//         onClick={() => setShowForm(false)}
//       >
//         &#8592;
//       </button>
     
//       {/* Title */}
//       <h2 className="ml-500px text-2xl font-extrabold text-gray-800 mb-4">
//         Event Type: <span className="text-blue-500">Sponsored Event</span>
//       </h2>

//       {/* If data is submitted and not editing, show the summary/details */}
//       {submittedData && !isEditing && (
//         <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-300">
//           {/* Header Section */}
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             <span className="align-center text-black-500">{submittedData.eventName}</span>{" "}
//           </h3>

//           {/* Country Selection */}
//           <p className="text-gray-600 mb-2">
//             <strong>Selected Country:</strong>{" "}
//             <span className="text-blue-500 underline">{submittedData.country}</span>
//           </p>

//           <p className="text-gray-600">
//             <strong>Schedule Type:</strong> {submittedData.scheduleType}
//           </p>
//           <p className="text-gray-600">
//             <strong>Media Type:</strong> {submittedData.mediaType}
//           </p>

//           {/* Date Section */}
//           <div className="flex items-center mt-3 text-gray-700">
//             <p className="mr-4">
//               <strong>From:</strong> {submittedData.startDate}
//             </p>
//             <p>
//               <strong>To:</strong> {submittedData.endDate}
//             </p>
//           </div>

//           {/* Posters Section */}
//           <div className="mt-6">
//             <h4 className="text-lg font-semibold text-gray-800 mb-2">Posters Display in Roots</h4>
//             {submittedData.rootPoster1 && (
//               <img
//                 src={submittedData.rootPoster1}
//                 alt="Root Poster 1"
//                 className="max-w-full h-auto object-contain"
//               />
//             )}
//           </div>

//           <div className="mt-4">
//             <h4 className="text-lg font-semibold text-gray-800 mb-2">Posters Display into Event</h4>
//             {submittedData.rootPoster2 && (
//               <img
//                 src={submittedData.rootPoster2}
//                 alt="Root Poster 2"
//                 className="max-w-full h-auto object-contain"
//               />
//             )}
//           </div>

//           {/* Terms & Conditions Image */}
//           <div className="mt-6">
//             <h4 className="text-lg font-semibold text-gray-800 mb-2">Terms & Conditions</h4>
//             {submittedData.termsImage && (
//               <img
//                 src={submittedData.termsImage}
//                 alt="Terms & Conditions Poster"
//                 className="max-w-full h-auto object-contain"
//               />
//             )}
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between ml-50px items-center mt-6">
//             <button
//               type="button"
//               className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition mr-21.5rem"
//               onClick={handleEdit}
//             >
//               Edit Event
//             </button>

//             <button
//               disabled
//               className=" ml-50px px-5 py-2 bg-gray-300 text-gray-600 font-semibold rounded-lg cursor-not-allowed"
//             >
//               Event Created into List Successfully
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Show the form only if there is no submitted data or we are in editing mode */}
//       {(!submittedData || isEditing) && (
//         <form onSubmit={handleSubmit}>
//           {/* Event Name */}
//           <input
//             type="text"
//             placeholder="Event Name"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-4"
//             value={eventName}
//             onChange={(e) => setEventName(e.target.value)}
//           />

//           {/* Country */}
//           <select
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-4"
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//           >
//             <option>Select Country</option>
//             <option>United States</option>
//             <option>Canada</option>
//             <option>United Kingdom</option>
//             <option>Australia</option>
//             <option>India</option>
//             <option>Germany</option>
//             <option>France</option>
//             <option>Japan</option>
//             <option>Brazil</option>
//             <option>South Africa</option>
//           </select>

//           {/* Schedule Type */}
//           <select
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-4"
//             value={scheduleType}
//             onChange={(e) => setScheduleType(e.target.value)}
//           >
//             <option>Select Schedule Type</option>
//             <option>Create Into List</option>
//             <option>Up Coming Event</option>
//             <option>On-Going Event</option>
//           </select>

//           {/* Media Type */}
//           <select
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-4"
//             value={mediaType}
//             onChange={(e) => setMediaType(e.target.value)}
//           >
//             <option>Video</option>
//             {/* Add more media types if needed */}
//           </select>

//           {/* Root Poster 1 */}
//           <div className="mb-4">
//             <p className="font-semibold text-gray-700">
//               Posters Display in Root (1)
//             </p>
//             <div className="w-full h-32 flex items-center justify-center border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 transition">
//               <label
//                 htmlFor="rootPoster1-upload"
//                 className="w-full h-full flex items-center justify-center"
//               >
//                 <div style={{marginTop:"2px"}}>
//                   <img src={UploadImage} alt="Upload" /><br />
//                   Add Image
//                 </div>
//                 <input
//                   id="rootPoster1-upload"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => handleImageChange(e, setRootPoster1)}
//                 />
//               </label>
//             </div>
//           </div>

//           {/* Root Poster 2 */}
//           <div className="mb-4">
//             <p className="font-semibold text-gray-700">
//               Posters Display in Root (2)
//             </p>
//             <div className="w-full h-32 flex items-center justify-center border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 transition">
//               <label
//                 htmlFor="rootPoster2-upload"
//                 className="w-full h-full flex items-center justify-center"
//               >
//                 <div style={{marginTop:"2px"}}>
//                   <img src={UploadImage} alt="Upload" /><br />
//                   Add Image
//                 </div>
//                 <input
//                   id="rootPoster2-upload"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => handleImageChange(e, setRootPoster2)}
//                 />
//               </label>
//             </div>
//           </div>

//           {/* Date Range */}
//           <div className="mb-4 flex items-center space-x-2">
//             <input
//               type="datetime-local"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//             <span className="text-gray-600">To</span>
//             <input
//               type="datetime-local"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>

//           {/* Terms & Conditions Image */}
//           <div className="mb-4">
//             <p className="font-semibold text-gray-700">Terms & Conditions</p>
//             <div className="w-full h-32 flex items-center justify-center border border-gray-300 width-1000px rounded-lg bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 transition">
//               <label
//                 htmlFor="termsImage-upload"
//                 className="w-full h-full flex items-center justify-center"
//               >
//                 <div style={{marginTop:"2px"}}>
//                   <img src={UploadImage} alt="Upload" /><br />
//                   Add Image
//                 </div>
//                 <input
//                   id="termsImage-upload"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => handleImageChange(e, setTermsImage)}
//                 />
//               </label>
//             </div>
//           </div>

//           {/* Submit & Cancel */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg shadow-md hover:bg-blue-600 transition mb-2"
//           >
//             {eventToEdit  ||isEditing  ? "Update Event" : "Create Event"}
//           </button>

//           <button
//             type="button"
//             className="w-full bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
//             onClick={() => setShowForm(false)}
//           >
//             Cancel
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };



const SponsoredEventForm: React.FC<{ 
  allEvents: any[], 
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
  eventToEdit?: any // Optional prop for editing an event
}> = ({ allEvents, setShowForm, eventToEdit }) => {
  const navigate = useNavigate();

  // ---- Form states ----
  const [eventName, setEventName] = useState(eventToEdit?.eventName || "");
  const [country, setCountry] = useState(eventToEdit?.country || "");
  const [scheduleType, setScheduleType] = useState(eventToEdit?.scheduleType || "");
  const [mediaType, setMediaType] = useState(eventToEdit?.mediaType || "Video");
  const [rootPoster1, setRootPoster1] = useState<string | null>(eventToEdit?.rootPoster1 || null);
  const [rootPoster2, setRootPoster2] = useState<string | null>(eventToEdit?.rootPoster2 || null);
  const [startDate, setStartDate] = useState(eventToEdit?.startDate || "");
  const [endDate, setEndDate] = useState(eventToEdit?.endDate || "");
  const [termsImage, setTermsImage] = useState<string | null>(eventToEdit?.termsImage || null);

  // ---- Submission states ----
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(!!eventToEdit); // Set to true if eventToEdit is provided

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      title: eventName,
      location: country,
      category: "On Going Event", // Automatically set category to "On Going Event"
      eventName,
      country,
      scheduleType,
      mediaType,
      rootPoster1,
      rootPoster2,
      startDate,
      endDate,
      termsImage,
    };

    setSubmittedData(dataToSubmit);

    if (eventToEdit) {
      // Update the existing event
      const index = allEvents.findIndex(event => event.title === eventToEdit.title);
      if (index !== -1) {
        allEvents[index] = dataToSubmit;
      }
    } else {
      // Add new event
      allEvents.push(dataToSubmit);
    }

    console.log(allEvents);
    setIsEditing(false); // Hide the form, show submitted data
  };

  const handleEdit = () => {
    setIsEditing(true); // Show the form for editing
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg lg:grid-cols-0 shadow-lg border border-gray-200">
      {/* Back Button */}
      <button
        className="text-xl mb-4 hover:text-blue-500 transition"
        onClick={() => setShowForm(false)}
      >
        &#8592;
      </button>
     
      {/* Title */}
      <h2 className="ml-500px text-2xl font-extrabold text-gray-800 mb-4">
        Event Type: <span className="text-blue-500">Sponsored Event</span>
      </h2>

      {/* If data is submitted and not editing, show the summary/details */}
      {submittedData && !isEditing && (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-300">
          {/* Header Section */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            <span className="align-center text-black-500">{submittedData.eventName}</span>{" "}
          </h3>

          {/* Country Selection */}
          <p className="text-gray-600 mb-2">
            <strong>Selected Country:</strong>{" "}
            <span className="text-blue-500 underline">{submittedData.country}</span>
          </p>

          <p className="text-gray-600">
            <strong>Schedule Type:</strong> {submittedData.scheduleType}
          </p>
          <p className="text-gray-600">
            <strong>Media Type:</strong> {submittedData.mediaType}
          </p>

          {/* Date Section */}
          <div className="flex items-center mt-3 text-gray-700">
            <p className="mr-4">
              <strong>From:</strong> {submittedData.startDate}
            </p>
            <p>
              <strong>To:</strong> {submittedData.endDate}
            </p>
          </div>

          {/* Posters Section */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Posters Display in Roots</h4>
            {submittedData.rootPoster1 && (
              <img
                src={submittedData.rootPoster1}
                alt="Root Poster 1"
                className="max-w-full h-auto object-contain"
              />
            )}
          </div>

          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Posters Display into Event</h4>
            {submittedData.rootPoster2 && (
              <img
                src={submittedData.rootPoster2}
                alt="Root Poster 2"
                className="max-w-full h-auto object-contain"
              />
            )}
          </div>

          {/* Terms & Conditions Image */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Terms & Conditions</h4>
            {submittedData.termsImage && (
              <img
                src={submittedData.termsImage}
                alt="Terms & Conditions Poster"
                className="max-w-full h-auto object-contain"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between ml-50px items-center mt-6">
            <button
              type="button"
              className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition mr-21.5rem"
              onClick={handleEdit}
            >
              Edit Event
            </button>

            <button
              disabled
              className=" ml-50px px-5 py-2 bg-gray-300 text-gray-600 font-semibold rounded-lg cursor-not-allowed"
            >
              Event Created into List Successfully
            </button>
          </div>
        </div>
      )}

      {/* Show the form only if there is no submitted data or we are in editing mode */}
      {(!submittedData || isEditing) && (
        <form onSubmit={handleSubmit}>
          {/* Event Name */}
          <input
            type="text"
            placeholder="Event Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-4"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />

          {/* Country */}
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-4"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>Select Country</option>
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Australia</option>
            <option>India</option>
            <option>Germany</option>
            <option>France</option>
            <option>Japan</option>
            <option>Brazil</option>
            <option>South Africa</option>
          </select>

          {/* Schedule Type */}
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-4"
            value={scheduleType}
            onChange={(e) => setScheduleType(e.target.value)}
          >
            <option>Select Schedule Type</option>
            <option>Create Into List</option>
            <option>Up Coming Event</option>
            <option>On-Going Event</option>
          </select>

          {/* Media Type */}
          <select
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-4"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
          >
            <option>Video</option>
            {/* Add more media types if needed */}
          </select>

          {/* Root Poster 1 */}
          <div className="mb-4">
            <p className="font-semibold text-gray-700">
              Posters Display in Root (1)
            </p>
            <div className="w-full h-32 flex items-center justify-center border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 transition">
              <label
                htmlFor="rootPoster1-upload"
                className="w-full h-full flex items-center justify-center"
              >
                <div style={{marginTop:"2px"}}>
                  <img src={UploadImage} alt="Upload" /><br />
                  Add Image
                </div>
                <input
                  id="rootPoster1-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setRootPoster1)}
                />
              </label>
            </div>
          </div>

          {/* Root Poster 2 */}
          <div className="mb-4">
            <p className="font-semibold text-gray-700">
              Posters Display in Root (2)
            </p>
            <div className="w-full h-32 flex items-center justify-center border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 transition">
              <label
                htmlFor="rootPoster2-upload"
                className="w-full h-full flex items-center justify-center"
              >
                <div style={{marginTop:"2px"}}>
                  <img src={UploadImage} alt="Upload" /><br />
                  Add Image
                </div>
                <input
                  id="rootPoster2-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setRootPoster2)}
                />
              </label>
            </div>
          </div>

          {/* Date Range */}
          <div className="mb-4 flex items-center space-x-2">
            <input
              type="datetime-local"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="text-gray-600">To</span>
            <input
              type="datetime-local"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* Terms & Conditions Image */}
          <div className="mb-4">
            <p className="font-semibold text-gray-700">Terms & Conditions</p>
            <div className="w-full h-32 flex items-center justify-center border border-gray-300 width-1000px rounded-lg bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200 transition">
              <label
                htmlFor="termsImage-upload"
                className="w-full h-full flex items-center justify-center"
              >
                <div style={{marginTop:"2px"}}>
                  <img src={UploadImage} alt="Upload" /><br />
                  Add Image
                </div>
                <input
                  id="termsImage-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setTermsImage)}
                />
              </label>
            </div>
          </div>

          {/* Submit & Cancel */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg shadow-md hover:bg-blue-600 transition mb-2"
          >
            {eventToEdit  ||isEditing  ? "Update Event" : "Create Event"}
          </button>

          <button
            type="button"
            className="w-full bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default SponsoredEventForm