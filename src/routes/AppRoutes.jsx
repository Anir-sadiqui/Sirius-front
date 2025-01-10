import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../containers/Home/Home";
import RegistrationForm from "../containers/Patient/RegistrationForm";
import ProfilePage from "../containers/Patient/ProfilePage";
import LoginPage from "../containers/Patient/LoginPage";

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />

        </Routes>
    </Router>
);

export default AppRoutes;
