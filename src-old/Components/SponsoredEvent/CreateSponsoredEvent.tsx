import React, { useState } from "react";

const CreateSponsoredEvent = () => {
    const [eventName, setEventName] = useState("");
    const [country, setCountry] = useState("");
    const [scheduleType, setScheduleType] = useState("");
    const [postType, setPostType] = useState("Video");
    const [fromDate, setFromDate] = useState("2021-08-13T10:00");
    const [toDate, setToDate] = useState("2021-08-28T10:00");

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <button className="text-xl mb-4">⬅</button>
            <h2 className="text-2xl font-bold mb-4">Event Type : <span className="text-black">Sponsored Event</span></h2>

            <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />

            <select className="w-full p-2 border rounded mb-4" onChange={(e) => setCountry(e.target.value)}>
                <option>Select Country</option>
                <option value="USA">USA</option>
                <option value="India">India</option>
            </select>

            <select className="w-full p-2 border rounded mb-4" onChange={(e) => setScheduleType(e.target.value)}>
                <option>Select Schedule Type</option>
                <option>Create Into List</option>
                <option>Upcoming Event</option>
                <option>On-Going Event</option>
            </select>

            <input type="text" className="w-full p-2 border rounded mb-4" value={postType} readOnly />

            <div className="mb-4">
                <p className="mb-2">Posters Display in Roots</p>
                <div className="border p-4 rounded flex justify-center items-center h-32 bg-gray-100">
                    <span>📤 Add Image</span>
                </div>
            </div>

            <div className="mb-4">
                <p className="mb-2">Posters Display into Event</p>
                <div className="border p-4 rounded flex justify-center items-center h-32 bg-gray-100">
                    <span>📤 Add Image</span>
                </div>
            </div>

            <div className="mb-4">
                <label>From: </label>
                <input type="datetime-local" className="border p-2 rounded" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                <label className="ml-4">To: </label>
                <input type="datetime-local" className="border p-2 rounded" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>

            <div className="mb-4">
                <p className="mb-2">Terms & Conditions</p>
                <div className="border p-4 rounded flex justify-center items-center h-32 bg-gray-100">
                    <span>📤 Add Image</span>
                </div>
            </div>

            <button className="w-full p-2 bg-blue-400 text-white rounded mb-2">Create Event</button>
            <button className="w-full p-2 bg-blue-500 text-white rounded">Cancel</button>
        </div>
    );
};

export default CreateSponsoredEvent;
