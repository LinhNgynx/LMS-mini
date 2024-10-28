import { useState, useEffect } from "react";
import { createContext } from "react";
export const CartContext=createContext();
export const CartProvider = ({children})=>{
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("newcart");
        return savedCart ? JSON.parse(savedCart) : [];
      });
    
      useEffect(() => {
        localStorage.setItem("newcart", JSON.stringify(cart));
      }, [cart]);
   return (
    <CartContext.Provider value={{cart, setCart}}>
        {children}
    </CartContext.Provider>
   )
}