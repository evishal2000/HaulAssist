// src/Features/LandingPage/index.jsx
import React from 'react';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import './styles.css';
 import { authState } from "../Auth/authState";
import { useRecoilValue } from "recoil";

  
const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Optionally include your Navbar here */}
      <HeroSection />
      <ServicesSection />
      {/* Additional sections like Features, Social Proof, or Footer can be added next */}
    </div>
  );
};

export default LandingPage;
