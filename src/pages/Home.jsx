import { Link } from "react-router-dom";
import "../styles/_home.scss";
import "font-awesome/css/font-awesome.min.css"; 

const Home = () => {
  const products = [
    { id: 1, name: "Product 1", description: "High quality product", price: "$19.99" },
    { id: 2, name: "Product 2", description: "Best value for money", price: "$29.99" },
    { id: 3, name: "Product 3", description: "Limited edition item", price: "$39.99" },
  ];

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="title">ShopXpress</h1>
        <Link to="/checkout">
        <button className="checkout-button">
            <i className="fa fa-shopping-cart"></i> 
          </button>        </Link>
      </header>

      <section className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2 className="product-title">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}</p>
            <Link to="/checkout">
              <button className="product-button">Add to Cart</button>
            </Link>
          </div>
        ))}
      </section>

      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            &copy; {new Date().getFullYear()} My Webshop. All Rights Reserved. | Built for{" "}
            <a href="https://www.bth.se/en/" target="_blank" rel="noopener noreferrer">
              BTH
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
