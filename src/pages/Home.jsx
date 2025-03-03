import { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/_home.scss";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";
import products from "../services/products"; 

const Home = () => {
  const { cart, addToCart, removeFromCart ,totalPrice } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => setCartOpen(!cartOpen);

  
  return (
    <div className="home-container">
      {/* HEADER */}
      <header className="header">
        <h1 className="title">ShopXpress</h1>
        <button className="checkout-button" onClick={toggleCart}>
          <i className="fa fa-shopping-cart"></i> 
          <span className="cart-count">{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        </button>
      </header>

    {/* PRODUCTS SECTION */}
    <section className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" /> {/* ✅ Display image */}
            <h2 className="product-title">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}</p>
            <button 
              className="product-button"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>

      {/* CART SIDEBAR */}
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
                    <button 
                      className="quantity-btn" 
                      onClick={() => removeFromCart(item.id)}
                    > - </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => addToCart(item)}
                    > + </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={toggleCart} className="close-cart">Close</button>
          <Link to="/m">
            <button className="close-cart">Check out</button>
          </Link>
        </div>
      )}



      {/* FOOTER */}
      <footer className="footer">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} ShopXpress. All Rights Reserved. 
        </p>
      </footer>
    </div>
  );
};

export default Home;
