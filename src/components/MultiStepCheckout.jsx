import React, { useState } from "react";
import posthog from "posthog-js";
import "../styles/_home.scss";

const MultiStepCheckout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    payment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleCheckout = () => {
    posthog.capture("user_completed_checkout", { variant: "control" });
    alert("Order placed successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 1: Contact Information VB</h2>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="input-field" />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-field" />
          <button onClick={nextStep} className="btn-primary">Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 2: Address</h2>
          <input type="text" name="address" placeholder="Address" onChange={handleChange} className="input-field" />
          <button onClick={prevStep} className="btn-secondary">Back</button>
          <button onClick={nextStep} className="btn-primary">Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 3: Payment</h2>
          <select name="payment" onChange={handleChange} className="input-field">
            <option value="">Select Payment Method</option>
            <option value="card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
          <button onClick={prevStep} className="btn-secondary">Back</button>
          <button onClick={handleCheckout} className="btn-primary">Place Order</button>
          
        </div>
      )}
    </div>
  );
};

export default MultiStepCheckout;
