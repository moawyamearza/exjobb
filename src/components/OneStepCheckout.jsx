import React, { useState } from "react";
import posthog from "posthog-js";
import "../styles/_home.scss";

const OneStepCheckout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    payment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    posthog.capture("user_completed_checkout", { variant: "test" });
    alert("Order placed successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Complete Your Order VA</h2>
      <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="input-field" />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-field" />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} className="input-field" />
      <select name="payment" onChange={handleChange} className="input-field">
        <option value="">Select Payment Method</option>
        <option value="card">Credit Card</option>
        <option value="paypal">PayPal</option>
        
      </select>
      <button onClick={handleCheckout} className="btn-primary">Place Order</button>
    </div>
  );
};

export default OneStepCheckout;
