import React, { useContext, useState } from "react";
import { products } from "../../db/products";
import { CartContext } from "../../context/CartContext";
export default function Menu() {
  const { cart, setCart } = useContext(CartContext);
  const [productsDisplay, setProducts] = useState(
    products.map((product) => {
      return { ...product, quantity: 1 };
    })
  );
  const handleAdd = (product) => {
    const existItem = cart.find((item) => item.id === product.id);
    if (existItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, buyNow: false }]);
    }
    const index=productsDisplay.indexOf(product);
    const newProducts=[...productsDisplay];
    newProducts[index] = { ...product, quantity: 1 };
    setProducts(newProducts);
  };
  const handleIncrease = (index) => {
    const newList = [...productsDisplay];
    newList[index].quantity++;
    setProducts(newList);
  };
  const handleDecrease = (index) => {
    const newList = [...productsDisplay];
    newList[index].quantity =
      newList[index].quantity === 1 ? 1 : newList[index].quantity - 1;
    setProducts(newList);
  };
  return (
    <div>
      <h2>Menu</h2>
      <div>
        <h3>Today Menu</h3>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {productsDisplay.map((product, i) => (
            <div key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "200px", height: "200px" }}
              ></img>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.price} $</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  style={{ height: "20px" }}
                  onClick={() => handleDecrease(i)}
                >
                  -
                </button>
                <p>{product.quantity}</p>
                <button
                  style={{ height: "20px" }}
                  onClick={() => handleIncrease(i)}
                >
                  +
                </button>
              </div>
              <p>Total Price: {product.quantity * product.price} $</p>
              <button onClick={() => handleAdd(product)}>Add To Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
