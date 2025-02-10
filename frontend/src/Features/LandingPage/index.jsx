import React from 'react';

// Navbar Component
const Navbar = () => (
  <nav className="bg-white shadow-md fixed w-full z-10">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">Haul Asist</div>
      <div className="hidden md:flex space-x-8">
        <button 
          onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
          className="hover:text-blue-600">
          Services
        </button>
        <button 
          onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
          className="hover:text-blue-600">
          Features
        </button>
        <button 
          onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          className="hover:text-blue-600">
          Contact
        </button>
      </div>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
        Download App
      </button>
    </div>
  </nav>
);

// Stats Section Component
const StatsSection = () => (
  <section className="bg-white py-16">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        <div>
          <h4 className="text-4xl font-bold text-blue-600">5000+</h4>
          <p className="text-gray-600">Active Users</p>
        </div>
        <div>
          <h4 className="text-4xl font-bold text-blue-600">95%</h4>
          <p className="text-gray-600">Customer Satisfaction</p>
        </div>
        <div>
          <h4 className="text-4xl font-bold text-blue-600">50+</h4>
          <p className="text-gray-600">Cities Covered</p>
        </div>
        <div>
          <h4 className="text-4xl font-bold text-blue-600">24/7</h4>
          <p className="text-gray-600">Customer Support</p>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-10">
    <div className="container mx-auto text-center">
      <p className="text-sm">&copy; 2025 Haul Asist. All rights reserved.</p>
    </div>
  </footer>
);

const ServiceCard = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeatureCard = ({ title, description }) => (
  <div className="text-center p-6 hover:bg-gray-50 rounded-lg transition">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const LandingPage=()=> {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-32 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">
            Your Trusted Logistics Partner
          </h1>
          <p className="text-xl mb-8">
            Fast, reliable, and efficient transportation solutions for your business
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition">
              Book Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition">
              Learn More
            </button>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              title="Local Delivery"
              description="Same-day delivery within city limits"
              icon={<div>🚚</div>}
            />
            <ServiceCard 
              title="Interstate Transport"
              description="Reliable long-distance freight solutions"
              icon={<div>🚛</div>}
            />
            <ServiceCard 
              title="Express Shipping"
              description="Priority handling for urgent deliveries"
              icon={<div>📦</div>}
            />
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Haul Asist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Real-time Tracking"
              description="Track your shipments 24/7"
            />
            <FeatureCard
              title="Secure Handling"
              description="Your cargo's safety is our priority"
            />
            <FeatureCard
              title="Competitive Rates"
              description="Best prices in the market"
            />
            <FeatureCard
              title="24/7 Support"
              description="Always here to help you"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-8">Join thousands of satisfied customers who trust Haul Asist</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition">
            Contact Us
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
