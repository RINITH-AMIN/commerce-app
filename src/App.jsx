import React, { useState } from "react";
import "./App.css";
import catalog from "./products.json";
import { useEffect } from "react";
import AppContext from "./context/Context";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import ProductDescription from "./components/ProductDescription";

// App component
function App() {
  // State for managing the cart
  const [cart, updateCart] = useState([]);

  // State to track the current route
  const [route, setRoute] = useState(window.location.pathname);

  // Function to handle navigation and update route
  const handleNavigation = (path) => {
    window.history.pushState({}, "", path);
    setRoute(path);
  };

  // Function to navigate to the cart page
  const gotoCartPage = () => {
    handleNavigation("/cart");
  };

  // Function to navigate to the home/products page
  const gotoProductsPage = () => {
    handleNavigation("/");
  };

  // Effect to show an alert when a product is added to the cart
  useEffect(() => {
    cart.length > 0 && alert("Product has been added to the cart");
  }, [cart]);

  // Rendering the main component with product cards
  return (
    <main>
      <header>
        <img
          src="https://apexit.com/wp-content/uploads/2022/02/apexit-white-white2.png"
          onClick={gotoProductsPage}
          height={80}
          width={160}
          alt="logo"
        />
        <div className="cart-section" onClick={gotoCartPage}>
          <img
            className="cart-logo"
            src={process.env.PUBLIC_URL + "/cart.svg"}
            alt="cart"
            width={25}
            height={25}
          />
          <span className="cart-items-count">{cart.length}</span>
        </div>
      </header>
      <section>
        <div className="products">
          {/* Mapping through products and providing context to each ProductCard */}
          {route === "/" &&
            catalog?.products?.map((product) => (
              <AppContext.Provider
                key={product.name}
                value={{ product, handleNavigation }}
              >
                <ProductCard />
              </AppContext.Provider>
            ))}
        </div>
        {route === "/cart" && (
          <AppContext.Provider value={{ cart, updateCart, gotoProductsPage }}>
            <Cart />
          </AppContext.Provider>
        )}
        {route.includes("/product") && (
          <AppContext.Provider
            value={{
              product: catalog?.products?.find(
                (item) => item.id === Number(route.split("/")[2]),
              ),
              cart,
              updateCart,
              gotoProductsPage,
            }}
          >
            <ProductDescription />
          </AppContext.Provider>
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
