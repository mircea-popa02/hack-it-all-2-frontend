import React, { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log(formData);
  };

  return (
    <div className="contact-form-container">
      <h2>HAVE YOU DECIDED?</h2>
      <p>
        Fill the form and we will contact you with all the information needed!
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="lastName">Last name*</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          onChange={handleChange}
        />

        <label htmlFor="firstName">First name*</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          onChange={handleChange}
        />

        <label htmlFor="email">Email address*</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone*</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          onChange={handleChange}
        />

        <label htmlFor="birthDate">Birth date (MM/YYYY)*</label>
        <input
          type="text"
          id="birthDate"
          name="birthDate"
          placeholder="MM/YYYY"
          required
          onChange={handleChange}
        />

        <div>
          <input type="checkbox" id="terms" name="terms" required />
          <label htmlFor="terms">
            By checking this field I understand that BRD processes my personal
            data in accordance with the mentions of the Information Note and I
            have read the Terms and conditions of use of the BRD site.*
          </label>
        </div>

        <button type="submit">APPLY ONLINE NOW</button>
      </form>
    </div>
  );
};

export default ContactForm;
