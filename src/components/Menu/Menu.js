import React, { useContext } from "react";
import { products } from "../../db/products";
import { CartContext } from "../../context/CartContext";
export default function Menu() {
  const {cart, setCart}=useContext(CartContext);
  const handleAdd= (product)=>{
    const existItem=cart.find((item)=>item.id===product.id);
    if(existItem){
       setCart(cart.map((item)=>
        item.id===product.id? {...item, quantity: item.quantity+1} : item
      ));
    }
    else{
       setCart([...cart, {...product, quantity: 1, buyNow: false}]);
    }
  }
  return (
    <div>
      <h2>Menu</h2>
      <div>
        <h3>Today Menu</h3>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {products.map((product, i) => (
            <div key={product.id}>
                <img src={product.image} alt={product.name} style={{width: '200px', height:'200px'}}></img>
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.price} $</p>
                <button onClick={()=>handleAdd(product)}>Add To Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
