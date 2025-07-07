import React from 'react'
import Header from '../../components/Header'

function Contact() {
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2>Contact Us</h2>
        <p>Have any questions, feedback, or technical issues? We'd love to hear from you.</p>

        <ul>
          <li>Email: support@univstore.com</li>
          <li>Phone: +91 98765 43210</li>
          <li>Working Hours: Mon - Fri, 9:00 AM – 6:00 PM</li>
        </ul>

        <p>You can also reach out to us through the support page for quicker help.</p>
      </div>
    </div>
  );
}

export default Contact
