import React, { useEffect } from "react";
import { useRef, useState } from "react";
import TimeSlot from "../components/TimeSlot";
// import DoctorDetails from "../components/DoctorDetails";
import doctorDetails from "../assets/json-data/doctorDetails.json";
import "../css/Appointment.css";

const Appointment = ({ about }) => {
  const dateInputRef = useRef(null);
  const [time, setTime] = useState(null);
  const [doctorID, setDoctorID] = useState(null);
  const handleDoctorClick = (doctor) => {
    setDoctorID(doctor);
  }
  useEffect(() => {
    console.log(time, doctorID);
  }, [time, doctorID]);
  return (
    <div className="appointment_container">
      <h1 className="main_heading">Make Appointment</h1>
      <div className="top__section">
        <div className="user_container">
          <img src="" alt="image" />
          <h2>
            Patient Name <br />{" "}
            <span className="user_dob">DOB: 27-06-2023</span>
          </h2>
        </div>
        <button>Confirm Appointment</button>
      </div>
      <hr />
      <div className="book_time_container">
        <p>Select The Date And Time Of Appointment As Per Your Need</p>
        <div className="book_time">
          <label htmlFor="date-input">Select a date:</label>
          <input
            ref={dateInputRef}
            type="date"
            id="date-input"
            name="date-input"
            pattern="\d{1,2}/\d{1,2}/\d{4}"
            placeholder="dd/mm/yyyy"
            required
          />
          <TimeSlot setTime={setTime} time={time} />
          <p>{about}</p>
        </div>
      </div>
      <hr />
      <div>
        <div className="card-container">
          {doctorDetails.map((doctor, index) => (
            <div
              className={`doctor-card ${doctorID === doctor.id ? 'selected' : ''}`}
              key={index}
              onClick={() => handleDoctorClick(doctor.id)}
            >
              <div className="doctor-image">
                <img
                  src={doctor.imageSrc}
                  alt={doctor.name}
                  className="round-image"
                />
              </div>
              <div className="doctor-details">
                <h2>{doctor.name}</h2>
                <p>Specialty: {doctor.specialty}</p>
                {/* <p>Experience: {doctor.experience}</p>
          <p>Location: {doctor.location}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
