import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Ctscan from "./pages/Ctscan";
import Mri from "./pages/Mri";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/ctscan" element={<Ctscan />} />
        <Route path="/mri" element={<Mri />} />
      </Routes>
    </Router>
  );
}

export default App;
