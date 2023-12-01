import './App.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="ratings">
          {Array(Math.round(product.ratings)).fill(null).map(rating=> ( <span>⭐</span>))}
          <span className="total-reviews">{product.totalReviews} reviews</span>
        </div>
        <p className="price">Price: {product.price}</p>
        <button className="buy-button">Add to Cart</button>
      </div>
    </div>
  );
};

function App() {
  const products = [
    {
      name: 'iPhone 15 Pro Max',
      description: 'The latest iPhone with advanced features and powerful performance.',
      price: '$1,199.99',
      imageUrl: 'https://m.media-amazon.com/images/I/81dT7CUY6GL._AC_UY218_.jpg', // Placeholder image URL
      ratings: 4.7,
      totalReviews: 150,
    },
    {
      name: 'Nokia 3310',
      description: 'A reliable Nokia phone with a durable design and long battery life.',
      price: '$299.99',
      imageUrl: 'https://www.businessinsider.in/photo/53696507/Nokia3310.jpg', // Placeholder image URL
      ratings: 4.2,
      totalReviews: 80,
    },
    {
      name: 'Toshiba T1100',
      description: 'The Toshiba T1100 is a laptop manufactured by Toshiba in 1985',
      price: '$2999.99',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Toshiba_T1100_In_Betrieb.jpg', // Placeholder image URL
      ratings: 4.2,
      totalReviews: 80,
    },
    // Add more products as needed
  ];

  return (
    <main>
      <header>
        <img src="https://apexit.com/wp-content/uploads/2022/02/apexit-white-white2.png" height={80} width={160} alt="logo" />
        <div className="cart-section">
          <img className="cart-logo" src="cart.svg" alt="cart" width={25} height={25} />
          <span className="cart-items-count">0</span>
        </div>
      </header>
      <section>
      <div className="products">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      </section>
      <footer>
        <ul>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="about.html">About</a></li>
        </ul>
      </footer>
    </main>
  );
}

export default App;
