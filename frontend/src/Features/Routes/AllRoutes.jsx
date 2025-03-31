import { Routes, Route } from "react-router-dom";
import {Login} from "../Auth/Login";
import Features from "../Features";
import { About } from "../About";
import LandingPage from "../LandingPage";
import { RegistrationForm } from "../Auth/RegistrationForm";
import { Dashboard } from "../Dashboard";
import { BookingForm } from "../Dashboard/BookingForm";
import {ProtectedRoute} from "./ProtectedRoute";
import { Bookings } from "../Bookings/Bookings";

export const RouterWrapper = () => {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm/>} />
        <Route path="/dashboard" element={ <ProtectedRoute>
          <Dashboard /> </ProtectedRoute>} />
        <Route path="/booking-form" element={<ProtectedRoute><BookingForm /></ProtectedRoute>}/>
        <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>}/>
      </Routes>
    );
  };