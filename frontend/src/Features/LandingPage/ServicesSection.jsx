// src/Features/LandingPage/ServicesSection.jsx
import React from 'react';
import './styles.css';

const services = [
  { title: 'Local Delivery', description: 'Same-day delivery within city limits', icon: '🚚' },
  { title: 'Express Shipping', description: 'Priority handling for urgent deliveries', icon: '📦' },
  { title: 'Interstate Transport', description: 'Reliable long-distance freight solutions', icon: '🚛' },
];

const ServicesSection = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
