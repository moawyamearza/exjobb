import React, { useState } from "react";
import posthog from "posthog-js";
import "../styles/_home.scss";
import "../styles/checkout.scss";
import { useCart } from "../context/CartContext";

const OneStepCheckout = () => {
  const { cart, addToCart, removeFromCart, totalPrice } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const toggleCart = () => setCartOpen(!cartOpen);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    tel: "",
    street: "",
    number: "",
    city: "",
    postalCode: "",
    shipping: "",
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
    <div className="checkout-container">
      {/* HEADER */}
      <header className="header">
        <h1 className="title">ShopXpress</h1>
        <button className="checkout-button" onClick={toggleCart}>
          <i className="fa fa-shopping-cart"></i>
          <span className="cart-count">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        </button>
      </header>

      {/* SHOPPING CART */}
      <section className="shopping-cart-container">
        <div className="shopping-cart">
          <h2 className="cart-title">Your Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty.</p>
          ) : (
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price}</span>
                  </div>
                  <div className="quantity-controls">
                    <button className="quantity-btn minus" onClick={() => removeFromCart(item.id)}> - </button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button className="quantity-btn plus" onClick={() => addToCart(item)}> + </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && <h3 className="cart-total">Total: <span>${totalPrice.toFixed(2)}</span></h3>}
        </div>
      </section>

      {/* ONE STEP CHECKOUT FORM */}
      <section className="step-card">
        <div className="form-container">
         

          {/* Contact Information */}
          <div className="form-group">
            <h3>Contact Information</h3>
            <input type="text" name="firstname" placeholder="First Name" onChange={handleChange} className="input-field" value={formData.firstname} />
            <input type="text" name="lastname" placeholder="Last Name" onChange={handleChange} className="input-field" value={formData.lastname} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-field" value={formData.email} />
            <input type="tel" name="tel" placeholder="Tel" onChange={handleChange} className="input-field" value={formData.tel} />
          </div>

          {/* Address */}
          <div className="form-group">
            <h3>Address</h3>
            <input type="text" name="street" placeholder="Street" onChange={handleChange} className="input-field" value={formData.street} />
            <input type="text" name="number" placeholder="Street Number" onChange={handleChange} className="input-field" value={formData.number} />
            <input type="text" name="city" placeholder="City" onChange={handleChange} className="input-field" value={formData.city} />
            <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} className="input-field" value={formData.postalCode} />
          </div>

          {/* Shipping Method */}
          <div className="form-group">
            <h3>Shipping Method</h3>
            <select name="shipping" onChange={handleChange} className="input-field" value={formData.shipping}>
              <option value="">Select Shipping Method</option>
              <option value="standard">Home Shipping (3-5 days)</option>
              <option value="express">Bring from the warehouse in your city</option>
            </select>
          </div>

          {/* Payment Method */}
          <div className="form-group">
            <h3>Payment Method</h3>
            <select name="payment" onChange={handleChange} className="input-field" value={formData.payment}>
              <option value="">Select Payment Method</option>
              <option value="card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="apple_pay">Apple Pay</option>
              <option value="google_pay">Google Pay</option>
            </select>
          </div>

          <button onClick={handleCheckout} className="step-button">Place Order</button>
        </div>
      </section>
    </div>
  );
};

export default OneStepCheckout;
