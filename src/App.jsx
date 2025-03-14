import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";
import CheckOut from "./pages/CheckOut";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
