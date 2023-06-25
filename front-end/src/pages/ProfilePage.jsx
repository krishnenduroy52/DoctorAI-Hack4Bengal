import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/ProfilePage.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [schedule, setSchedule] = useState([]);
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
        data.user.schedule.map((s) => fetchAppointmentDetails(s));
        toast.success("Successfully fetched user data.");
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
        setSchedule((prev) => {
          let isAlreadyScheduled = false;
          prev.forEach((item) =>
            item._id == appointment._id ? (isAlreadyScheduled = true) : null
          );

          if (!isAlreadyScheduled) {
            return [...prev, appointment];
          }
          return prev;
        });
      })
      .catch((error) => {
        console.error("Error:", error.response.data.error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(schedule);

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
                    placeholder="Username"
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
                    placeholder="Phone Number"
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
                    placeholder="age"
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
                    placeholder="Gender"
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
                    placeholder="Email"
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
            <div className="row">
              {schedule &&
                schedule.map((item) => (
                  <div className="col-sm-6 col-md-6 col-lg-4">
                    <div className="card bg-white p-3 mb-4 shadow">
                      <div className="d-flex justify-content-between mb-4">
                        <div className="user-info">
                          <div className="user-info__img">
                            <img
                              src="/Image/profile.png"
                              alt="doctor Img"
                              width="30"
                            />
                          </div>
                          <div className="user-info__basic">
                            <h5 className="mb-0">Dr. Krishnendu Roy</h5>
                            <p className="text-muted mb-0">28 yrs, Male</p>
                          </div>
                        </div>
                        <div className="dropdown open">
                          <a
                            href="#!"
                            className="px-2"
                            id="triggerId1"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="fa fa-ellipsis-v"></i>
                          </a>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="triggerId1"
                          >
                            <a className="dropdown-item" href="#">
                              <i className="fa fa-pencil mr-1"></i> Edit
                            </a>
                            <a className="dropdown-item text-danger" href="#">
                              <i className="fa fa-trash mr-1"></i> Delete
                            </a>
                          </div>
                        </div>
                      </div>
                      <h6 className="mb-0">+91 9876543215</h6>
                      <div>
                        <small>{item.about}</small>
                      </div>
                      <div className="d-flex justify-content-between mt-4">
                        <div>
                          <h5 className="mb-0">
                            {item.timeOfAppointment}
                            <small className="ml-1">
                              {item.dateOfAppointment}
                            </small>
                          </h5>
                        </div>
                        <span className="text-success font-weight-bold">
                          Join
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
