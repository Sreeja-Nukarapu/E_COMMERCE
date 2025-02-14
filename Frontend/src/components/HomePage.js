import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (minPrice === '' || product.price >= parseFloat(minPrice)) &&
      (maxPrice === '' || product.price <= parseFloat(maxPrice)) &&
      (minRating === '' || product.rating >= parseFloat(minRating))
    );
  });

  const addToCart = (product) => {
    const username = localStorage.getItem('username') || 'guest';
    const cartKey = `cart_${username}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    cart.push(product);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    // Dispatch custom event so Navbar can update cart count
    window.dispatchEvent(new Event('cartUpdate'));
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <div className="homepage-container">
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        />
      </div>

      <div className="products-section">
        <h2 className="mb-4">Our Products</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {filteredProducts.map((product) => (
            <div key={product.product_id} className="col">
              <div className="card h-100 product-card">
                <img
                  src={product.image_url}
                  className="card-img-top product-image"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text description">{product.description}</p>
                  <div className="product-details">
                    <p className="price">${parseFloat(product.price).toFixed(2)}</p>
                    <div className="rating">
                      <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
                      <span className="rating-text">({product.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className={`badge ${product.stock_status === 'in_stock' ? 'bg-success' : 'bg-danger'}`}>
                      {product.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <span className="text-muted">{product.brand}</span>
                  </div>
                  <button 
                    className="btn btn-primary mt-2 w-100"
                    disabled={product.stock_status !== 'in_stock'}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
