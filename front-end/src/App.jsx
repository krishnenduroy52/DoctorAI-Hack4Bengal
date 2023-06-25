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
      </Routes>
    </Router>
  );
}

export default App;
