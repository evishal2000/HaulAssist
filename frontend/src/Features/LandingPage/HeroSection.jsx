import React from 'react';
import Lottie from 'react-lottie-player';
import deliveryAnimation from '../../Animations/delivery.json';
import './styles.css';

const HeroSection = () => {
  return (
    <header className="hero-section">
      <div className="container">
        <div className="hero-content">
          {/* Left Side: Text */}
          <div className="hero-text">
            <h1>Your Trusted Logistics Partner</h1>
            <p>
              Fast, reliable, and efficient transportation solutions for your business.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary" type="button">
                Book Now
              </button>
              <button className="btn-secondary" type="button">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side: Animation */}
          <div className="hero-animation">
            <Lottie
              loop
              animationData={deliveryAnimation}
              play
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
