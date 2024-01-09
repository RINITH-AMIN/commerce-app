import { useContext, useState } from "react";
import AppContext from "../context/Context";


// ProductCard component
const ProductCard = () => {
    // Destructuring values from AppContext
    const { product, cart, updateCart } = useContext(AppContext);

    const existingProduct = cart.find(item => item.id === product.id);

    // State for managing quantity input
    const [quantity, setQuantity] = useState(1);
    // State for managing quantity error message
    const [quantityError, setQuantityError] = useState('');
    // State for managing zoom effect
    const [isZoomed, setIsZoomed] = useState(false);

    // Function to update the cart and add the current product
    const updateCartItems = () => {

        if (existingProduct) {
          // If the product already exists in the cart, update the quantity
          const updatedCart = cart.map(item => {
            if (item.id === product.id) {
              return { ...item, quantity: item.quantity + Number(quantity) };
            }
            return item;
          });
          updateCart(updatedCart);
        } else {
          // If the product is not in the cart, add it
          updateCart(prevCart => [...prevCart, { ...product, quantity: Number(quantity) }]);
        }
      };

    // Event handler for updating the quantity and checking for errors
    const handleUpdateQuantity = (event) => {
        const value = event.target.value;
        if (value > 10) {
            setQuantityError('Maximum allowed quantity is 10');
            setQuantity(value);
        } else {
            setQuantityError('');
            setQuantity(value);
        }
    };

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
                className={`product-image ${isZoomed ? 'zoomed' : ''}`}
                onMouseEnter={zoomImage}
                onMouseLeave={zoomOut}
            >
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
                <input
                    id={`${product.name}-quantity`}
                    onChange={handleUpdateQuantity}
                    type="text"
                    name="quantity"
                    className="quantity"
                    value={existingProduct?.quantity || quantity}
                />
                <button
                    className="buy-button"
                    id={`${product.name}-add-to-cart`}
                    onClick={updateCartItems}
                    disabled={quantityError !== ''}
                >
                    Add to Cart
                </button>
                <p id={`${product.name}-quantity-error`} style={{ color: 'red' }}>{quantityError}</p>
            </div>
        </div>
    );
};


export default ProductCard;