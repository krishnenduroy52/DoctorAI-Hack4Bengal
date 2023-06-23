import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/ProfilePage.css";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const navigate = useNavigate();

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
      age: userData.age,
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
      console.error("Error saving user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="vh-100 profile-section">
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="card profile-card">
              <div className="row g-0">
                <div className="col-md-4 profile-image">
                  <img
                    src="../public/Image/Profile-Icon-SVG-09856789.png"
                    alt="Avatar"
                    className="my-5 profile-avatar"
                  />
                  {userData && (
                    <>
                      {!isEditMode && (
                        <>
                          <h5>{userData.username}</h5>
                          <p className="profile-id">{userData._id}</p>
                          <button
                            className="btn btn-primary profile-edit-btn"
                            onClick={handleEdit}
                          >
                            Edit
                          </button>
                        </>
                      )}
                      {isEditMode && (
                        <>
                          <input
                            type="text"
                            name="username"
                            value={editedData.username}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <input
                            type="text"
                            name="email"
                            value={editedData.email}
                            onChange={handleChange}
                            className="form-control"
                          />
                          <button
                            className="btn btn-primary profile-save-btn"
                            onClick={handleSave}
                          >
                            Save
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h3>Details</h3>
                    <hr className="mt-0 mb-4" />
                    {userData && (
                      <>
                        {!isEditMode && (
                          <div className="pt-1">
                            <div className="mb-3">
                              <h6>Email</h6>
                              <p className="text-muted">{userData.email}</p>
                            </div>
                            <div className="mb-3">
                              <h6>Phone</h6>
                              <p className="text-muted">
                                {userData.phoneNumber}
                              </p>
                            </div>
                          </div>
                        )}
                        {isEditMode && (
                          <div className="pt-1">
                            <div className="mb-3">
                              <h6>Email</h6>
                              <input
                                type="text"
                                name="email"
                                value={editedData.email}
                                onChange={handleChange}
                                className="form-control"
                              />
                            </div>
                            <div className="mb-3">
                              <h6>Phone</h6>
                              <input
                                type="text"
                                name="phoneNumber"
                                value={editedData.phoneNumber}
                                onChange={handleChange}
                                className="form-control"
                              />
                            </div>
                          </div>
                        )}
                        {!isEditMode && (
                          <div className="pt-1">
                            <div className="mb-3">
                              <h6>Gender</h6>
                              <p className="text-muted">{userData.gender}</p>
                            </div>
                            <div className="mb-3">
                              <h6>Age</h6>
                              <p className="text-muted">{userData.age}</p>
                            </div>
                          </div>
                        )}
                        {isEditMode && (
                          <div className="pt-1">
                            <div className="mb-3">
                              <h6>Gender</h6>
                              <input
                                type="text"
                                name="gender"
                                value={editedData.gender}
                                onChange={handleChange}
                                className="form-control"
                              />
                            </div>
                            <div className="mb-3">
                              <h6>Age</h6>
                              <input
                                type="text"
                                name="age"
                                value={editedData.age}
                                onChange={handleChange}
                                className="form-control"
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
