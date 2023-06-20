import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Ctscan from "./pages/Ctscan";
import Mri from "./pages/Mri";
import Meet from "./pages/Meet";
import Rooms from "./pages/Rooms";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/ctscan" element={<Ctscan />} />
        <Route path="/mri" element={<Mri />} />
        <Route path="/meet" element = {<Meet />} />
        <Route path="/rooms/:roomId" element={<Rooms />} />
      </Routes>
    </Router>
  );
}

export default App;
