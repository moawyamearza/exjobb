import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CheckOut from "./pages/CheckOut";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckOut />} />

      </Routes>
    </Router>
  );
}

export default App;
