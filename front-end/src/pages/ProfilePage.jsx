import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "../css/ProfilePage.css";

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);

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
            console.log(data.user)
            if (response.ok) {
                setUserData(data.user);
            } else {
                console.error('Error retrieving user data:', data.error);
            }
        } catch (error) {
            console.error('Error retrieving user data:', error);
        }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: 'white' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <MDBCardImage src="../public/Image/Profile-Icon-SVG-09856789.png"
                                        alt="Avatar" className="my-5" style={{ width: '80px', margin: 'auto', marginLeft: '4rem' }} fluid />
                                    {userData && (
                                        <>
                                            <MDBTypography tag="h5">{userData.username}</MDBTypography>
                                            <MDBCardText>{userData._id}</MDBCardText>
                                        </>
                                    )}
                                    <MDBIcon far icon="edit mb-5" />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h3">Details</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        {userData && (
                                            <>
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
