import React from 'react';
import "../css/DoctorDetails.css";

const DoctorDetailComponent = ({ doctors }) => {
  return (
    <div className="card-container">
    {doctors.map((doctor, index) => (
      <div className="doctor-card" key={index}>
        <div className="doctor-image">
          <img src={doctor.imageSrc} alt={doctor.name} className="round-image" />
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
  );
};

export default DoctorDetailComponent;
