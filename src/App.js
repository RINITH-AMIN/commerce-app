import React from "react";
import "./App.css";

const ProductCard = () => {
  const product = {
    name: "Nokia 3310",
    description:
      "A reliable Nokia phone with a durable design and long battery life.",
    price: "$299.99",
    imageUrl: "https://www.businessinsider.in/photo/53696507/Nokia3310.jpg",
    ratings: 4.2,
    totalReviews: 80,
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
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
        <button className="buy-button">Add to Cart</button>
      </div>
    </div>
  );
};

function App() {

  return (

    <React.Fragment>
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
        <ProductCard />
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
    </React.Fragment>
  );
}

export default App;
