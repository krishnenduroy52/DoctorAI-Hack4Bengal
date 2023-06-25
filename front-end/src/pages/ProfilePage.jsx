import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/ProfilePage.css";
import axios from "axios";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const navigate = useNavigate();

  const calculateAge = (dateString) => {
    const birthDate = new Date(dateString);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }

    return age;
  };

  useEffect(() => {
    const userId = localStorage.getItem("doctor_ai_userID");
    if (userId) {
      fetchUserData(userId);
    } else {
      navigate("/login"); // Redirect to the login page if user is not logged in
    }
  }, [navigate]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setUserData(data.user);
        // const appointments = data.user.schedule.map((s) => );
        // toast.success("Successfully fetched user data.")
      } else {
        toast.error("Error retrieving user data"); // Display toast error
        console.error("Error retrieving user data:", data.error);
      }
    } catch (error) {
      toast.error("Error retrieving user data"); // Display toast error
      console.error("Error retrieving user data:", error);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setEditedData({
      username: userData.username,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      gender: userData.gender,
      dob: userData.dob,
    });
  };

  const handleSave = async () => {
    try {
      // Perform save operation or API call with editedData
      const response = await fetch(
        `http://localhost:3000/user/${userData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        }
      );

      if (response.ok) {
        // Update the userData state and exit edit mode
        setUserData(editedData);
        setIsEditMode(false);
        toast.success("Data saved successfully"); // Display toast success message
        console.log("Data saved successfully");
      } else {
        console.error("Error saving user data:", response.statusText);
      }
    } catch (error) {
      if (
        (error.response &&
          error.response.data &&
          error.response.data.error === "User not found") ||
        error.response.data.error === "Internal server error"
      ) {
        toast.error("Cannot update user Details!");
      } else {
        console.error("Error saving user data:", error);
      }
    }
  };

  const fetchAppointmentDetails = (appointmentId) => {
    axios
      .get(`http://localhost:3000/appointment/${appointmentId}`)
      .then((response) => {
        const appointment = response.data.appointment;
        // Do something with the fetched appointment details
        console.log(appointment);
      })
      .catch((error) => {
        console.error("Error:", error.response.data.error);
        // Handle the error appropriately
      });
  };

  useEffect(() => {
    const appointmentId = "649707b43426d14bb924d2f5";
    fetchAppointmentDetails(appointmentId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="profile-main">
      <ToastContainer />
      <aside className="profile-left-panel">
        <div className="pbtn active profile">
          <img src="/Image/profile.png" alt="profile" />
          <div className="name">
            <p>
              {isEditMode ? editedData?.username : userData?.username || ""}
            </p>
          </div>
        </div>
        {/* <div className="pbtn">Schedules</div> */}
      </aside>
      <section className="profile-right-pannel">
        <div className="right-container">
          <div className="personal-info">
            <h2>My Details</h2>
            <p>Personal Information</p>
            <hr />
            <div className="personal-info-container">
              <div className="personal-info-text">
                <p>
                  Assertively utilize adaptive customer service for future-proof
                  platforms. Completely drive optimal markets.
                </p>
              </div>
              <div className="personal-field">
                <div className="personal-info-field">
                  <input
                    type="text"
                    className="username"
                    name="username"
                    value={
                      isEditMode
                        ? editedData?.username
                        : userData?.username || ""
                    }
                    onChange={handleChange}
                    disabled={!isEditMode}
                  />
                  <input
                    type="text"
                    className="phonenumber"
                    name="phoneNumber"
                    value={
                      isEditMode
                        ? editedData?.phoneNumber
                        : userData?.phoneNumber || ""
                    }
                    onChange={handleChange}
                    disabled={!isEditMode}
                  />
                  <input
                    type={isEditMode ? "date" : "text"}
                    className="dob"
                    name="dob"
                    value={
                      isEditMode
                        ? editedData?.dob
                        : calculateAge(userData?.dob) || ""
                    }
                    onChange={handleChange}
                    disabled={!isEditMode}
                  />
                  <input
                    type="text"
                    className="gender"
                    name="gender"
                    value={
                      isEditMode ? editedData?.gender : userData?.gender || ""
                    }
                    onChange={handleChange}
                    disabled={!isEditMode}
                  />
                  <input
                    type="email"
                    className="email"
                    name="email"
                    value={
                      isEditMode ? editedData?.email : userData?.email || ""
                    }
                    onChange={handleChange}
                    disabled={!isEditMode}
                  />
                </div>
                <div className="save_edit">
                  {isEditMode ? (
                    <button onClick={handleSave}>Save</button>
                  ) : (
                    <button onClick={handleEdit}>Edit</button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="schedule-info">
            <h2>My Schedules</h2>
            <p>Meeting Information</p>
            <hr />
            <div className="schedule-info-container">
              <div className="schedule-info-text">
                <p>
                  Assertively utilize adaptive customer service for future-proof
                  platforms. Completely drive optimal markets.
                </p>
              </div>
              <div className="schedule-field">
                <div className="schedule-info-field">
                  <div className="schedule_detail">
                    <p>Appointment 1</p>
                    <div>{userData && userData.about}</div>
                    <div>12/02/2024</div>
                  </div>
                  <div className="schedule_detail">
                    <p>Schedule 2</p>
                    <div>
                      About Lorem ipsum dolor sit amet consectetur adipisicing
                      elit. Sunt veniam incidunt rem ad corporis corrupti iure,
                      totam, fugit at, libero eaque? Error dolore explicabo,
                      reprehenderit beatae placeat maxime tempora perspiciatis?
                    </div>
                    <div>12/02/2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
