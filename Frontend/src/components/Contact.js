import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-container">
      <h1 className="text-center">Contact Us</h1>
      
      <div className="row mb-5">
        <div className="col-md-4 mb-4">
          <div className="contact-card">
            <i className="fas fa-map-marker-alt contact-icon"></i>
            <h3>Address</h3>
            <p>123 Shopping Street<br />Commerce City, ST 12345</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="contact-card">
            <i className="fas fa-phone contact-icon"></i>
            <h3>Phone</h3>
            <p>+1 (555) 123-4567<br />Mon-Fri 9:00 AM - 6:00 PM</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="contact-card">
            <i className="fas fa-envelope contact-icon"></i>
            <h3>Email</h3>
            <p>info@mystore.com<br />support@mystore.com</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="contact-form-container">
            <h2 className="mb-4">Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="map-container">
            <iframe
              title="Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970721!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1687523234983!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup">
            <div className="success-icon">✓</div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for your message. We will get back to you soon!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
