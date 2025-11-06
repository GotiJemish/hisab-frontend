// ContactModal.jsx
import React, { useState } from "react";
import withModal from "../ui/modal/withModal";

const ContactModalInner = ({
  selectedEvent,
  closeModal,
  handleAddOrUpdateEvent,
  calendarsEvents,
}) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");

  return (
<>

      {/* Event Title */}
      <div className="mt-8">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Event Title
        </label>
        <input
          id="event-title"
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
      </div>

      {/* Event Color */}
      <div className="mt-6">
        <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
          Event Color
        </label>
        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
          {Object.entries(calendarsEvents || {}).map(([key, value]) => (
            <label
              key={key}
              htmlFor={`modal${key}`}
              className="flex items-center text-sm text-gray-700 dark:text-gray-400"
            >
              <input
                className="sr-only"
                type="radio"
                name="event-level"
                value={key}
                id={`modal${key}`}
                checked={eventLevel === key}
                onChange={() => setEventLevel(key)}
              />
              <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full dark:border-gray-700">
                <span
                  className={`h-2 w-2 rounded-full bg-white ${
                    eventLevel === key ? "block" : "hidden"
                  }`}
                ></span>
              </span>
              {key}
            </label>
          ))}
        </div>
      </div>

      {/* Dates */}
      <div className="mt-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Enter Start Date
        </label>
        <input
          type="date"
          value={eventStartDate}
          onChange={(e) => setEventStartDate(e.target.value)}
          className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90"
        />
      </div>

      <div className="mt-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Enter End Date
        </label>
        <input
          type="date"
          value={eventEndDate}
          onChange={(e) => setEventEndDate(e.target.value)}
          className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 mt-6 sm:justify-end">
        <button
          onClick={closeModal}
          className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:w-auto"
        >
          Close
        </button>
        <button
          onClick={handleAddOrUpdateEvent}
          className="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
        >
          {selectedEvent ? "Update Changes" : "Add Event"}
        </button>
      </div></>
  );
};
const ContactModal=withModal(ContactModalInner, "Add or Edit Event" )
export default ContactModal