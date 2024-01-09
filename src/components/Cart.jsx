import React, { useCallback, useContext } from "react";
import AppContext from "../context/Context";

const Cart = () => {
  // Destructuring values from AppContext
  const { cart, updateCart, gotoProductsPage } = useContext(AppContext);

  // Function to handle incrementing the quantity of a cart item
  const incrementQuantity = useCallback((index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity++;
    updateCart(updatedCart);
  }, [cart, updateCart]);

  // Function to handle decrementing the quantity of a cart item
  const decrementQuantity = useCallback((index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      updateCart(updatedCart);
    }
  }, [cart, updateCart]);

  // Function to handle removing a product from the cart
  const removeFromCart = useCallback((index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    updateCart(updatedCart);
  }, [cart, updateCart]);

  // Function to handle the checkout process
  const handleCheckout = () => {
    // Implement your checkout logic here
    // For example, you can display a confirmation message or redirect to a checkout page
    alert("Checkout clicked! Implement your checkout logic here.");
  };

  return (
    <div className="cart-container">
      <h2>Your Cart {cart.length <= 0 && `is Empty`}</h2>
      <button className="go-home" onClick={gotoProductsPage}>
        Go Back to Products Page
      </button>
      <ul className="cart-items-list">
        {cart?.map((item, index) => (
          <li key={index} className="product-row">
            <img
              className="cart-product"
              id={`${item.name}-logo`}
              src={item.imageUrl}
              alt={item.name}
            />
            <span className="full-width">
              {item.name} - ${item.price}
              <p>Quantity: {item.quantity}</p>
              <span className="float-right">
                <button onClick={() => decrementQuantity(index)}>-</button>
                <button onClick={() => incrementQuantity(index)}>+</button>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </span>
            </span>
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <button className="checkout" onClick={handleCheckout}>
          Checkout
        </button>
      )}
    </div>
  );
};

export default React.memo(Cart);
