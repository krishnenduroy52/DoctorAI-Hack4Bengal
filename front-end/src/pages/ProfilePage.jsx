import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "../css/ProfilePage.css";

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedData, setEditedData] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('doctor_ai_userID');
        if (userId) {
            fetchUserData(userId);
        }
    }, []);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/user/${userId}`);
            const data = await response.json();
            if (response.ok) {
                setUserData(data.user);
            } else {
                console.error('Error retrieving user data:', data.error);
            }
        } catch (error) {
            console.error('Error retrieving user data:', error);
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
            const response = await fetch(`http://localhost:3000/user/${userData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
            });

            if (response.ok) {
                // Update the userData state and exit edit mode
                setUserData(editedData);
                setIsEditMode(false);
                console.log('Data saved successfully');
            } else {
                console.error('Error saving user data:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving user data:', error);
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
        <section className="vh-100" style={{ backgroundColor: 'white' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol
                                    md="4"
                                    className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}
                                >
                                    <MDBCardImage
                                        src="../public/Image/Profile-Icon-SVG-09856789.png"
                                        alt="Avatar"
                                        className="my-5"
                                        style={{ width: '80px', margin: 'auto' }}
                                        fluid
                                    />
                                    {userData && (
                                        <>
                                            {!isEditMode && (
                                                <>
                                                    <MDBTypography tag="h5">{userData.username}</MDBTypography>
                                                    <MDBCardText style={{ margin: '3px' }}>{userData._id}</MDBCardText>
                                                    <MDBBtn color="primary" onClick={handleEdit} style={{ margin: '10px' }}>
                                                        Edit
                                                    </MDBBtn>
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
                                                    <MDBBtn color="primary" onClick={handleSave}>Save</MDBBtn>
                                                </>
                                            )}
                                        </>
                                    )}
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h3">Details</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        {userData && (
                                            <>
                                                {!isEditMode && (
                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Email</MDBTypography>
                                                            <MDBCardText className="text-muted">{userData.email}</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Phone</MDBTypography>
                                                            <MDBCardText className="text-muted">{userData.phoneNumber}</MDBCardText>
                                                        </MDBCol>
                                                    </MDBRow>
                                                )}
                                                {isEditMode && (
                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Email</MDBTypography>
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                value={editedData.email}
                                                                onChange={handleChange}
                                                                className="form-control"
                                                            />
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Phone</MDBTypography>
                                                            <input
                                                                type="text"
                                                                name="phoneNumber"
                                                                value={editedData.phoneNumber}
                                                                onChange={handleChange}
                                                                className="form-control"
                                                            />
                                                        </MDBCol>
                                                    </MDBRow>
                                                )}
                                                {!isEditMode && (
                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Gender</MDBTypography>
                                                            <MDBCardText className="text-muted">{userData.gender}</MDBCardText>
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Age</MDBTypography>
                                                            <MDBCardText className="text-muted">{userData.age}</MDBCardText>
                                                        </MDBCol>
                                                    </MDBRow>
                                                )}
                                                {isEditMode && (
                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Gender</MDBTypography>
                                                            <input
                                                                type="text"
                                                                name="gender"
                                                                value={editedData.gender}
                                                                onChange={handleChange}
                                                                className="form-control"
                                                            />
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Age</MDBTypography>
                                                            <input
                                                                type="text"
                                                                name="age"
                                                                value={editedData.age}
                                                                onChange={handleChange}
                                                                className="form-control"
                                                            />
                                                        </MDBCol>
                                                    </MDBRow>
                                                )}
                                            </>
                                        )}
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
