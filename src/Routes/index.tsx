import React from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Login from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import SignUp from "../pages/SignInPage";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/todo" element={<HomePage />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
