import { useContext, useState } from "react";
import AppContext from "../context/Context";

// ProductCard component
const ProductCard = () => {
  // Destructuring values from AppContext
  const { product, handleNavigation } = useContext(AppContext);

  const gotoProductsPage = () => handleNavigation(`/product/${product.id}`);

  // State for managing zoom effect
  const [isZoomed, setIsZoomed] = useState(false);

  // Function to apply zoom effect on image hover
  const zoomImage = () => {
    setIsZoomed(true);
  };

  // Function to revert zoom effect on image hover out
  const zoomOut = () => {
    setIsZoomed(false);
  };

  // Rendering the product card with dynamic values
  return (
    <div className="product-card">
      <div
        className={`product-image ${isZoomed ? "zoomed" : ""}`}
        onMouseEnter={zoomImage}
        onMouseLeave={zoomOut}
      >
        <img
          id={`${product.name}-logo`}
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
      <div className="product-details">
        <h2 onClick={gotoProductsPage}>{product.name}</h2>
        <div className="ratings">
          {Array(Math.round(product.ratings))
            .fill(null)
            .map((_, index) => (
              <span key={index}>⭐</span>
            ))}
          <span className="total-reviews">{product.totalReviews} reviews</span>
        </div>
        <p className="price">Price: {product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
