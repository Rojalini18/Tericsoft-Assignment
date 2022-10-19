import React from "react";
import { Routes, Route } from "react-router-dom";
import Bmi from "../Pages/Bmi";
import BmiHistory from "../Pages/History";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/bmi" element={<Bmi />} />
      <Route path="/history" element={<BmiHistory />} />
    </Routes>
  );
};

export default MainRoutes;
