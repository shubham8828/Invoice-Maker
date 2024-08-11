// src/About.js
import React from "react";
import "./About.css"; // Import the CSS file for styling
import Header from "./Header";
import Footer from "./Footer";

function About() {
  return (
    <>
      <Header />
      <section className="about">
        <h1>About Us</h1>
        <p>
          Welcome to, <strong>Bill Generator Pro</strong> the premier solution
          for all your invoicing and billing needs. We are dedicated to
          simplifying the process of creating, managing, and sending invoices,
          so you can focus on what you do best—running your business..
        </p>
        <h1>Our Mission</h1>
        <p>
          At Bill Generator Pro, our mission is to empower businesses and
          freelancers with intuitive, efficient, and reliable invoicing tools.
          We understand that time is money, and our goal is to streamline your
          billing process to save you both. With our innovative features and
          user-friendly design, we aim to reduce administrative hassle and
          enhance your professional workflow.
        </p>
        <h1>What We Offer </h1>
        <ul>
          <li><b>Easy-to-Use Interface:</b>Our platform is designed with simplicity in mind. Create, customize, and send invoices with just a few clicks.</li>
          <li><b>Professional Templates</b>Choose from a variety of professionally designed templates that reflect your brand's image and make a great impression on your clients.</li>
          <li><b>Automated Billing:</b> Set up recurring invoices and automated reminders to ensure you never miss a payment and maintain smooth cash flow.</li>
            
        </ul>
        <h1>Our Commitment</h1>
        <p>With years of experience and a passion for innovation, our team is committed to providing top-notch solutions and exceptional customer support. We continuously update our platform to incorporate the latest advancements and respond to user feedback, ensuring that Bill Generator Pro remains at the forefront of invoicing technology.</p>
        <h1>Get in Touch</h1>

        <p>We value your feedback and are here to assist you with any questions or concerns. Please feel free to reach out to our support team at support@billgeneratorpro.com or connect with us on social media. We look forward to helping you streamline your billing process and achieve your business goals.</p> <br /><br />

        <p>Thank you for choosing <strong>Bill Generator Pro!</strong>

</p>
      </section>
      <Footer />
    </>
  );
}

export default About;
