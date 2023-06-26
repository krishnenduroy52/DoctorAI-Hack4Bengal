import React from "react";
import TimeSlot from "../components/TimeSlot";
import DoctorDetails from "../components/DoctorDetails";
import doctorDetails from "../assets/json-data/doctorDetails.json";

const Appointment = (props) => {
  // console.log(props);
  const { about } = props;
  return (
    <div>
      <h1>Make Appointment</h1>
      <div>
        <img src="" alt="image" />
        <h2>
          Patient Name <br /> <span>DOB</span>
        </h2>
      </div>
      <hr />
      <div>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, ad.
        </p>
        {/* <label htmlFor="meeting-time">Select a time:</label>
        <input type="time" id="meeting-time" name="meeting-time" /> */}
        <label htmlFor="meeting-date">Select a date:</label>
        <input type="date" id="meeting-date" name="meeting-date" />
        <TimeSlot />
        <p>{about}</p>
      </div>
      <hr />
      <div>
        <DoctorDetails doctors={doctorDetails} />
      </div>
    </div>
  );
};

export default Appointment;
