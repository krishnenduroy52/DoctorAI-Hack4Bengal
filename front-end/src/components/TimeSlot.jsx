import React, { useState } from 'react';
import timeSlots from "../assets/json-data/timeSlots.json";
import "../css/TimeSlot.css";


const TimeSlot = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot.label);
  };

  return (
    <div className="time-slot-container">
      <h2>Select a time slot:</h2>
      <div className="time-slot-list">
        {timeSlots.map((timeSlot, index) => (
          <div
            key={index}
            onClick={() => handleTimeSlotClick(timeSlot)}
            className={`time-slot ${selectedTimeSlot === timeSlot.label ? 'selected' : ''}`}
          >
            {timeSlot.label}
          </div>
        ))}
      </div>
      <p>Selected time slot: {selectedTimeSlot || 'None'}</p>
    </div>
  );
};

export default TimeSlot;
