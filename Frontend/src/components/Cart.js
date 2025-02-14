import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'credit'
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    upiId: '',
    paytmNumber: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username') || 'guest';
    const cartKey = `cart_${username}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(cart);
  }, []);

  const removeItem = (index) => {
    const username = localStorage.getItem('username') || 'guest';
    const cartKey = `cart_${username}`;
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    localStorage.setItem(cartKey, JSON.stringify(newCart));
    setCartItems(newCart);
    window.dispatchEvent(new Event('cartUpdate'));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const shipping = 5.0;
  const gst = subtotal * 0.18;
  const total = subtotal + shipping + gst;

  const handleCheckout = (e) => {
    e.preventDefault();
    // Handle payment processing here
    alert('Order placed successfully!');
  };

  const renderPaymentForm = () => {
    switch(checkoutData.paymentMethod) {
      case 'credit':
        return (
          <div className="payment-details-form">
            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 5678 9012 3456"
                maxLength="16"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cardholder Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name on card"
                value={paymentDetails.cardName}
                onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
                required
              />
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={paymentDetails.expiry}
                  onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})}
                  required
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">CVV</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="123"
                  maxLength="3"
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>
        );
      case 'upi':
        return (
          <div className="payment-details-form">
            <div className="mb-3">
              <label className="form-label">UPI ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="username@upi"
                value={paymentDetails.upiId}
                onChange={(e) => setPaymentDetails({...paymentDetails, upiId: e.target.value})}
                required
              />
            </div>
            <div className="upi-apps mt-3">
              <button type="button" className="btn btn-outline-primary me-2">Google Pay</button>
              <button type="button" className="btn btn-outline-primary me-2">PhonePe</button>
              <button type="button" className="btn btn-outline-primary">Paytm</button>
            </div>
          </div>
        );
      case 'paytm':
        return (
          <div className="payment-details-form">
            <div className="mb-3">
              <label className="form-label">Paytm Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter registered mobile number"
                maxLength="10"
                value={paymentDetails.paytmNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, paytmNumber: e.target.value})}
                required
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderCheckoutForm = () => (
    <div className="checkout-container">
      <h3 className="mb-4">Checkout Details</h3>
      <form onSubmit={handleCheckout}>
        <div className="row">
          {/* Personal Details */}
          <div className="col-md-6 mb-3">
            <h4 className="mb-3">Personal Information</h4>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={checkoutData.name}
                onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={checkoutData.email}
                onChange={(e) => setCheckoutData({...checkoutData, email: e.target.value})}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                value={checkoutData.phone}
                onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="col-md-6 mb-3">
            <h4 className="mb-3">Shipping Address</h4>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                value={checkoutData.address}
                onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                required
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={checkoutData.city}
                  onChange={(e) => setCheckoutData({...checkoutData, city: e.target.value})}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">PIN Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={checkoutData.pincode}
                  onChange={(e) => setCheckoutData({...checkoutData, pincode: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="col-12 mb-4">
            <h4 className="mb-3">Payment Method</h4>
            <div className="payment-methods">
              <div className="form-check mb-2">
                <input
                  type="radio"
                  className="form-check-input"
                  name="paymentMethod"
                  value="credit"
                  checked={checkoutData.paymentMethod === 'credit'}
                  onChange={(e) => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}
                />
                <label className="form-check-label">Credit/Debit Card</label>
              </div>
              <div className="form-check mb-2">
                <input
                  type="radio"
                  className="form-check-input"
                  name="paymentMethod"
                  value="upi"
                  checked={checkoutData.paymentMethod === 'upi'}
                  onChange={(e) => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}
                />
                <label className="form-check-label">UPI</label>
              </div>
              <div className="form-check mb-2">
                <input
                  type="radio"
                  className="form-check-input"
                  name="paymentMethod"
                  value="paytm"
                  checked={checkoutData.paymentMethod === 'paytm'}
                  onChange={(e) => setCheckoutData({...checkoutData, paymentMethod: e.target.value})}
                />
                <label className="form-check-label">Paytm</label>
              </div>
            </div>
            
            {/* Render payment details form based on selected method */}
            {renderPaymentForm()}
          </div>

          {/* Submit Button */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100 btn-lg">
              Pay ${total.toFixed(2)}
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="cart-container">
      <div className="cart-title">
        Shopping Cart ({cartItems.length} items)
      </div>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <div className="d-flex justify-content-center">
    <Link to="/products" className="btn btn-primary px-4 py-2 rounded-pill shadow-sm w-auto">
        Continue Shopping
    </Link>
</div>

          {/* <Link to="/products" className="btn btn-primary px-20 py-2 rounded-pill shadow-sm w-auto">Continue Shopping</Link> */}
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h5>{item.name}</h5>
                  <p className="text-muted small">{item.description?.substring(0, 50)}...</p>
                  <button 
                    className="btn btn-outline-danger"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-item-price">
                  ${parseFloat(item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>GST (18%)</span>
                  <span>${gst.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total</strong>
                  <strong className="text-primary">${total.toFixed(2)}</strong>
                </div>
                
                {/* Checkout Button */}
                {!showCheckout && (
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => navigate('/payment')}
                  >
                    Proceed to Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
