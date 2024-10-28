import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const handleRemove = (itemRemove) => {
    const newCart = cart.filter((item) => item !== itemRemove);
    setCart(newCart);
  };

  const handleIncrease = (index) => {
    setCart(
      cart.map((item) =>
        item.id === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (index) => {
    setCart(
      cart.map((item) =>
        item.id === index
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const handleBuyNow = (index) => {
    setCart(
      cart.map((item) =>
        item.id === index ? { ...item, buyNow: !item.buyNow } : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => (item.buyNow ? total + item.price * item.quantity : total),
    0
  );

  return (
    <div>
      <h2>Cart</h2>
      <div>
        <h3>Your Cart</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "50px" }}>
          {cart.map((item) => (
            <div key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "200px", height: "200px" }}
              />
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.price} $</p>
              <div>
                <label htmlFor={`buynow-${item.id}`}>Buy Now</label>
                <input
                  type="checkbox"
                  id={`buynow-${item.id}`}
                  name="buynow"
                  checked={item.buyNow || false}
                  onChange={() => handleBuyNow(item.id)}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  style={{ height: "20px" }}
                  onClick={() => handleDecrease(item.id)}
                >
                  -
                </button>
                <p>{item.quantity}</p>
                <button
                  style={{ height: "20px" }}
                  onClick={() => handleIncrease(item.id)}
                >
                  +
                </button>
              </div>
              <p>Total Price: {item.quantity * item.price} $</p>
              <button onClick={() => handleRemove(item)}>Remove</button>
            </div>
          ))}
        </div>
        <div>
          <p>Total: {totalPrice} $</p>
          <button>Purchase</button>
          <button>Coupon</button>
        </div>
      </div>
    </div>
  );
}
