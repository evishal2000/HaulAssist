// Features.jsx
import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <div className="features-container">
      <div className="features-header">
        <h1>HaulAssist Features</h1>
        <p>Discover how HaulAssist makes logistics and delivery simple, reliable, and efficient</p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <h3>Real-Time Tracking</h3>
          <p>Track your deliveries in real-time with GPS location services to know exactly when your items will arrive.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-user-check"></i>
          </div>
          <h3>Verified Service Providers</h3>
          <p>All our service providers undergo thorough background checks to ensure reliability and trustworthiness.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-clock"></i>
          </div>
          <h3>On-Demand Scheduling</h3>
          <p>Schedule deliveries at your convenience with flexible time slots and immediate service options.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-comment-dots"></i>
          </div>
          <h3>In-App Communication</h3>
          <p>Easily communicate with your service provider through our integrated messaging system.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-credit-card"></i>
          </div>
          <h3>Secure Payments</h3>
          <p>Process payments securely within the app using multiple payment methods for your convenience.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <i className="fas fa-route"></i>
          </div>
          <h3>Smart Matching Algorithm</h3>
          <p>Our intelligent system matches your delivery needs with the closest available service provider.</p>
        </div>
      </div>

      <div className="feature-spotlight">
        <h2>How HaulAssist Works</h2>
        <div className="spotlight-content">
          <div className="spotlight-step">
            <div className="step-number">1</div>
            <h3>Request Service</h3>
            <p>Enter pickup and drop-off locations, item details, and preferred delivery time.</p>
          </div>
          <div className="spotlight-step">
            <div className="step-number">2</div>
            <h3>Get Matched</h3>
            <p>Our system automatically matches you with the best available service provider.</p>
          </div>
          <div className="spotlight-step">
            <div className="step-number">3</div>
            <h3>Track Progress</h3>
            <p>Monitor your delivery in real-time and communicate with your service provider as needed.</p>
          </div>
          <div className="spotlight-step">
            <div className="step-number">4</div>
            <h3>Delivery Complete</h3>
            <p>Receive your items and rate your experience to help maintain our service quality.</p>
          </div>
        </div>
      </div>

      <div className="customer-types">
        <h2>Who Benefits from HaulAssist?</h2>
        <div className="customer-grid">
          <div className="customer-card">
            <h3>Travelers</h3>
            <p>Get assistance with luggage at airports, train stations, and hotels without the hassle.</p>
          </div>
          <div className="customer-card">
            <h3>Small Businesses</h3>
            <p>Reliable last-mile delivery solutions that scale with your business needs.</p>
          </div>
          <div className="customer-card">
            <h3>Individuals</h3>
            <p>Help with moving items, furniture delivery, or transporting goods across town.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
