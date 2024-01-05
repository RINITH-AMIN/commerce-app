import { useState } from "react";
import "./App.css";
import catalog from './products.json';
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const ProductContext = createContext();

const ProductCard = () => {

  const product = useContext(ProductContext);

  const updateCartCount = () => {
    const initialQuantity = document.querySelector('.cart-items-count').innerHTML;
    const quantity = document.getElementById(`${product.name}-quantity`).value;
    const updatedQuantity = Number(initialQuantity) + Number(quantity)
    document.querySelector('.cart-items-count').innerHTML = updatedQuantity;
  }

  const handleUpdateQuantity = (event) => {
    const value = event.target.value;
    const quantityErrorElement = document.getElementById(`${product.name}-quantity-error`);
    const addToCartButton = document.getElementById(`${product.name}-add-to-cart`);

    if (value > 10) {
      addToCartButton.disabled = true;
      quantityErrorElement.innerHTML = 'Maximum allowed quantity is 10';
      quantityErrorElement.style = 'color:red'
    } else {
      addToCartButton.disabled = false;
      quantityErrorElement.innerHTML = '';
    }
  }

  function zoomImage() {
    const image = document.getElementById(`${product.name}-logo`);
    // Apply the zoom effect by adjusting the transform property
    image.style.transform = `scale(1.1)`;
  }

  function zoomOut() {
    const image = document.getElementById(`${product.name}-logo`);
    // Apply the zoom effect by adjusting the transform property
    image.style.transform = `scale(1)`;
  }


  return (
    <div className="product-card">
      <div className="product-image"
        onMouseEnter={zoomImage}
        onMouseLeave={zoomOut}>
        <img id={`${product.name}-logo`} src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="ratings">
          {Array(Math.round(product.ratings))
            .fill(null)
            .map((_, index) => (
              <span key={index}>⭐</span>
            ))}
          <span className="total-reviews">{product.totalReviews} reviews</span>
        </div>
        <p className="price">Price: {product.price}</p>
        <input id={`${product.name}-quantity`} onChange={handleUpdateQuantity} type="text" name="quantity" className="quantity" defaultValue={1} />
        <button className="buy-button" id={`${product.name}-add-to-cart`} onClick={updateCartCount}>Add to Cart</button>
        <p id={`${product.name}-quantity-error`}></p>
      </div>
    </div>
  );
};

function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    cart.length > 0 && alert('Product has been added to the cart')
  }, [cart]);

  return (
    <main>
      <header>
        <img
          src="https://apexit.com/wp-content/uploads/2022/02/apexit-white-white2.png"
          height={80}
          width={160}
          alt="logo"
        />
        <div className="cart-section">
          <img
            className="cart-logo"
            src="cart.svg"
            alt="cart"
            width={25}
            height={25}
          />
          <span className="cart-items-count">0</span>
        </div>
      </header>
      <section>
        {catalog.products.map(product =>
          <ProductContext.Provider key={product.name} value={product}>
            <ProductCard />
          </ProductContext.Provider>
        )}
      </section>
      <footer>
        <ul>
          <li>
            <a href="contact.html">Contact</a>
          </li>
          <li>
            <a href="about.html">About</a>
          </li>
        </ul>
      </footer>
    </main>
  );
}

export default App;
