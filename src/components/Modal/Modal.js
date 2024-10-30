import React, { useContext, useState } from "react";
import { CouponContext } from "../../context/CouponContext";
import { coupons as CouponData } from "../../db/coupons";

export default function Modal({ setIsSelect }) {
  const { setCoupons } = useContext(CouponContext);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const code = input.trim();
      const today = new Date();
      const matchCoupon = CouponData.find(
        (coupon) => coupon.code === code && new Date(coupon.expirationDate) >= today
      );

      if (matchCoupon) {
        setSelectedCoupon(matchCoupon);
        setError("");
      } else {
        setError("Invalid or expired coupon code.");
        setSelectedCoupon(null);
      }
      setInput("");
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleBack = () => {
    setIsSelect(false);
  };

  const handleApply = () => {
    if (selectedCoupon) {
      setCoupons(selectedCoupon);
      setIsSelect(false);
    }
  };

  return (
    <div className="modal">
      <label htmlFor="code">Enter Coupon Code:</label>
      <input
        type="text"
        name="code"
        id="code"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyPress}  
      />
      {error && <>
        <p className="error-message">{error}</p>
      <button onClick={handleBack}>Back</button>
      </>
      }
      {selectedCoupon && (
        <div className="coupon-details">
          <p>{selectedCoupon.description}</p>
          <p>Expires on: {selectedCoupon.expirationDate}</p>
          <button onClick={handleApply}>Apply</button>
          <button onClick={handleBack}>Back</button>
        </div>
      )}
    </div>
  );
}
