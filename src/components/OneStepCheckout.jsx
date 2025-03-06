import React, { useState } from "react";
import posthog from "posthog-js";
import "../styles/_home.scss";
import "../styles/checkout.scss";
import { useCart } from "../context/CartContext";

const OneStepCheckout = () => {
  const { cart, addToCart, removeFromCart, totalPrice, clearCart} = useCart();
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
    window.location.href = "https://docs.google.com/forms/d/1Tg7XHL7bpuFF-3zTjfG1-sYKUIyWUyi47iT06X4wSP0/edit?ts=67c58c23";
    clearCart();
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel?");
    if (confirmCancel) {
      window.location.href = "https://docs.google.com/forms/d/1Tg7XHL7bpuFF-3zTjfG1-sYKUIyWUyi47iT06X4wSP0/edit?ts=67c58c23";
    }
    clearCart();
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
      {/* 🟢 CART SIDEBAR */}
      {cartOpen && (
        <div className="cart-sidebar">
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <span>{item.name} - {item.price}</span>
                  <div className="quantity-controls">
                    <button className="quantity-btn" onClick={() => removeFromCart(item.id)}> - </button>
                    <span>{item.quantity}</span>
                    <button className="quantity-btn" onClick={() => addToCart(item)}> + </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={toggleCart} className="close-cart">Close</button>
        </div>
      )}

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
                    <img src={item.image} alt={item.name} className="checkout-image" />{/* ✅ Display image */}

                    <span className="item-name">{item.name}</span>
                    <span className="item-price">{item.price}</span>
                    
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
      <section className="shopping-cart-container">
         <div className="step-card">

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
            <select name="shipping" onChange={handleChange} className="select" value={formData.shipping}>
              <option value="">Select Shipping Method</option>
              <option value="standard">Home Shipping (3-5 days)</option>
              <option value="express">Bring from the warehouse in your city</option>
            </select>
          </div>

          {/* Payment Method */}
          <div className="form-group">
            <h3>Payment Method</h3>
            <select name="payment" onChange={handleChange} className="select" value={formData.payment}>
              <option value="">Select Payment Method</option>
              <option value="card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="apple_pay">Apple Pay</option>
              <option value="google_pay">Google Pay</option>
            </select>
          </div>

          <div className="button-container">
          <button onClick={handleCheckout} className="step-button">Place Order</button>
          <button onClick={handleCancel} className="cancel-button">Cancel Order</button>
        </div>
        </div>
      </section>
      
      {/* FOOTER */}
        <footer className="footer">
       

        <p className="footer-text">
          &copy; {new Date().getFullYear()} ShopXpress. All Rights Reserved. 
        </p>
      </footer>
    </div>
  );
};

export default OneStepCheckout;
