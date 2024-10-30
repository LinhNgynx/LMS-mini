import { createContext, useEffect, useState } from "react";
export const CouponContext = createContext();
export const CouponProvider = ({ children }) => {
  const [coupons, setCoupons] = useState(() => {
    const savedCoupon = localStorage.getItem("coupon");
    return savedCoupon ? JSON.parse(savedCoupon) : {};
  });
  useEffect(() => {
    localStorage.setItem("coupon", JSON.stringify(coupons));
  }, [coupons]);
  return (
    <CouponContext.Provider value={{ coupons, setCoupons }}>
      {children}
    </CouponContext.Provider>
  );
};
