import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Calculate cart total when component mounts
    const username = localStorage.getItem('username') || 'guest';
    const cartKey = `cart_${username}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const shipping = 5.0;
    const gst = subtotal * 0.18;
    const total = subtotal + shipping + gst;
    setCartTotal(total);
  }, []);

  const clearCart = () => {
    const username = localStorage.getItem('username') || 'guest';
    const cartKey = `cart_${username}`;
    localStorage.setItem(cartKey, JSON.stringify([]));
    // Dispatch event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdate'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate random tracking ID and estimated delivery date
    const trackingId = 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5); // Delivery in 5 days

    setOrderDetails({
      trackingId,
      deliveryDate: deliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      amount: `₹${cartTotal.toFixed(2)}` // Use actual cart total
    });

    // Clear the cart
    clearCart();

    setShowSuccessPopup(true);
  };

  return (
    <div className="container py-4">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card shadow">
                    <div class="p-3 mb-2 bg-warning text-dark">
                        <h3 className="mb-0">Checkout</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <h4 className="border-bottom pb-2">1. Delivery Address</h4>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Full Name"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <textarea
                                            className="form-control"
                                            placeholder="Address"
                                            rows="2"
                                            value={formData.address}
                                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="State"
                                            value={formData.state}
                                            onChange={(e) => setFormData({...formData, state: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="PIN Code"
                                            value={formData.pincode}
                                            onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="border-bottom pb-2">2. Payment Method</h4>
                                <div className="row g-3">
                                    {['credit', 'upi', 'netbanking'].map((method) => (
                                        <div className="col-md-4" key={method}>
                                            <div 
                                                className={`card text-center p-3 cursor-pointer ${paymentMethod === method ? 'border-primary' : ''}`}
                                                onClick={() => setPaymentMethod(method)}
                                            >
                                                <div className="h4 mb-2">
                                                    {method === 'credit' ? '💳' : method === 'upi' ? '📱' : '🏦'}
                                                </div>
                                                <h5 className="mb-0">{method === 'credit' ? 'Card' : method === 'upi' ? 'UPI' : 'Net Banking'}</h5>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    {paymentMethod === 'credit' && (
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Card Number"
                                                    maxLength="16"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="MM/YY"
                                                    maxLength="5"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="CVV"
                                                    maxLength="3"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === 'upi' && (
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter UPI ID"
                                                />
                                            </div>
                                            <div className="col-12 d-flex gap-2 justify-content-center">
                                                <button type="button" className="btn btn-outline-secondary">Google Pay</button>
                                                <button type="button" className="btn btn-outline-secondary">PhonePe</button>
                                                <button type="button" className="btn btn-outline-secondary">Paytm</button>
                                            </div>
                                        </div>
                                    )}

                                    {paymentMethod === 'netbanking' && (
                                        <select className="form-select">
                                            <option>Choose your bank</option>
                                            <option>SBI</option>
                                            <option>HDFC</option>
                                            <option>ICICI</option>
                                        </select>
                                    )}
                                </div>
                            </div>

                            <div className="d-grid gap-2">
                                <button type="submit" class="p-3 mb-2 bg-warning text-dark">Place Order</button>
                                <button 
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => navigate('/cart')}
                                >
                                    Back to Cart
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        {showSuccessPopup && (
            <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center p-4">
                            <div className="display-1 text-success mb-3">✓</div>
                            <h2>Order Placed Successfully!</h2>
                            <div className="alert alert-light my-3">
                                <p className="mb-1"><strong>Tracking ID:</strong> {orderDetails.trackingId}</p>
                                <p className="mb-1"><strong>Expected Delivery:</strong> {orderDetails.deliveryDate}</p>
                                <p className="mb-0"><strong>Amount Paid:</strong> {orderDetails.amount}</p>
                            </div>
                            <p className="text-muted">Thank you for shopping with us!</p>
                            <button 
                                className="btn btn-primary"
                                onClick={() => {
                                    setShowSuccessPopup(false);
                                    navigate('/products');
                                }}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default PaymentPage;
