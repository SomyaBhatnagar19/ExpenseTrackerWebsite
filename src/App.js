import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/SignUp" />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/LogIn" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
