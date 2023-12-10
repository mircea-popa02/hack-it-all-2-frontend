import React, { useState } from "react";
import "./ContactForm.css";
import { Button } from "react-bootstrap";

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

  const handleSubmit = () => {
    console.log(formData);
  };



  return (
    <div className="contact-form-container">
      <h2 className="headline">Contact us</h2>
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

        <div>
          <input type="checkbox" id="terms" name="terms" required />
          <label htmlFor="terms">
            I agree to the <a href="/">Terms and Conditions</a>
          </label>

        </div>
        <br></br>
        <Button type="submit" id="but-2">Send</Button>
      </form>
    </div>
  );
};

export default ContactForm;
