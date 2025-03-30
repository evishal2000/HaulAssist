import React from "react";
import "./styles.css";
 import { authState } from "../Auth/authState";
import { useRecoilValue } from "recoil";

export const About = () => {
  // const auth = useRecoilValue(authState);
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>Delivering Solutions, Simplifying Logistics</h1>
        <p>
          At Haul Assist, we connect individuals and businesses with reliable
          logistics services, making transportation stress-free and efficient.
        </p>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to streamline logistics for everyone, whether you're a
          traveler managing luggage or a business needing reliable delivery
          services. We aim to make transportation faster, easier, and more
          dependable.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-why-choose">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Real-Time Tracking</h3>
            <p>Know where your package is at all times.</p>
          </div>
          <div className="feature-card">
            <h3>Affordable Rates</h3>
            <p>Competitive pricing for all your logistics needs.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>We're here whenever you need us.</p>
          </div>
          <div className="feature-card">
            <h3>Trusted Providers</h3>
            <p>Verified and reliable service providers.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="about-cta">
        <h2>Ready to Simplify Your Logistics?</h2>
        <button className="cta-button">Get Started</button>
      </section>
    </div>
  );
};
