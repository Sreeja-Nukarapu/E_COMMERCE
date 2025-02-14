import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="text-center">ABOUT US</h1>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <p>
              Welcome to MyStore! We are passionate about bringing you the best products at unbeatable prices.
              Our journey began with the aim of creating a shopping experience as smooth and enjoyable as possible.
              We believe in quality, trust, and service that goes beyond the ordinary.
            </p>
            <p>
              Our curated collection features the latest trends and timeless classics, ensuring there’s something for everyone.
              We collaborate with trusted brands and artisans, ensuring that every item in our store is crafted with care.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://images.stockcake.com/public/b/d/a/bda38319-78d9-4dd1-ad15-d3d4c49448d4_large/joyful-children-smiling-stockcake.jpg"
              alt="About Us"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px', width: 'auto', objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4 text-center mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src="https://img.freepik.com/free-vector/product-quality-concept-illustration_114360-7401.jpg"
                alt="Quality Products"
                className="card-img-top p-3"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Quality Products</h5>
                <p className="card-text">
                  We take pride in offering only the finest products, carefully selected and tested to meet our high standards. Every item is guaranteed for quality and authenticity, ensuring you get the best value for your money.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src="https://img.freepik.com/premium-photo/handshake-collaboration-partnership-trust-support-cooperation-success-teamwork-shaking-hands-people-agreement-sport-deal-thank-you-solidarity-welcome-closeup_590464-208838.jpg"
                alt="Trusted Service"
                className="card-img-top p-3"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Trusted Service</h5>
                <p className="card-text">
                  Our dedicated customer service team is available 24/7 to assist you. We believe in building long-term relationships with our customers through transparency, reliability, and exceptional support.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 text-center mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHP1ovsGjLsW5wAIOCQBqCwk_iQyR_IcUJNQ&s"
                alt="Innovative Design"
                className="card-img-top p-3"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">Innovative Design</h5>
                <p className="card-text">
                  We stay ahead of trends by constantly innovating and bringing you the latest designs. Our products combine functionality with aesthetics to create unique solutions that enhance your lifestyle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
