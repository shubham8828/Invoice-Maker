import React, { useState } from 'react';
import './Contact.css'; // Import the CSS file for styling
import Header from './Header';
import Footer  from './Footer'
import { db, collection, addDoc } from '../firebase'; // Import Firebase functions

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, 'contacts'), formData); // Save form data to Firebase
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Clear form data
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <>    
    <Header/>
    <div className="contact-form">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className='button' >Send</button>
      </form>
    </div>
    <Footer />
</>
  );
}

export default Contact;