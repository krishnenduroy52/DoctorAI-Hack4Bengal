import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Ctscan from "./pages/Ctscan";
import Mri from "./pages/Mri";
import Home from "./pages/Home";
import Meet from "./pages/Meet";
import Rooms from "./pages/Rooms";
import Navbar from "./components/Navbar";
import Pneumonia from "./pages/pneumonia";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import Chat from "./pages/Chat";
import Appointment from "./pages/Appointment";
import Footer from "./components/Footer";

// doctor
import DoctorDataInput from "./pages/DoctorDataInput";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorLogin from "./pages/DoctorLogin";
import Error from "./components/Error";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route exact path="/ctscan" element={<Ctscan />} />
        <Route path="/mri" element={<Mri />} />
        <Route path="/xray" element={<Pneumonia />} />
        <Route path="/meet" element={<Meet />} />
        <Route path="/rooms/:roomId" element={<Rooms />} />
        <Route path="/general/chat" element={<Chat />} />
        <Route path="/doctor/signup" element={<DoctorDataInput />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route
          path="/appointment"
          element={<Appointment about={"Lorem ipsum dolor sit amet."} />}
        />
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
