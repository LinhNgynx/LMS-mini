import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";
import { CartProvider } from "./context/CartContext";
import { CouponProvider } from "./context/CouponContext";
function CartApp() {
  return (
    <CartProvider>
      <CouponProvider>
        <Router>
          <nav>
            <Link to="/">Menu</Link>
            <Link to="/cart">Cart</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </CouponProvider>
    </CartProvider>
  );
}

export default CartApp;
