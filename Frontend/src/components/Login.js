import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                // Store the logged in username for user-specific cart
                localStorage.setItem('username', formData.username);
                onLoginSuccess();
                navigate('/products');
            } else {
                // Improved error handling:  Display specific error messages if available
                if (data && data.detail) {
                  setError(data.detail);
                } else if (data && data.non_field_errors) {
                  setError(data.non_field_errors.join(", ")); // Display non_field_errors as a list
                } else {
                  setError('Invalid credentials');
                }
            }
        } catch (err) {
            setError('Login failed. Please try again.');
            console.error("Login Error:", err); // Log the actual error for debugging
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-wrapper">
            <section className="gradient-form">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-5 mx-md-4">
                                            <div className="text-center">
                                                <img
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                    className="logo"
                                                    alt="logo"
                                                />
                                                <h4 className="mt-1 mb-5 pb-1">We are The MyStore Team</h4>
                                            </div>

                                            {error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {error}
                                                </div>
                                            )}

                                            <form onSubmit={handleSubmit}>
                                                <p>Please login to your account</p>

                                                <div className="form-outline mb-4">
                                                
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter username"
                                                        value={formData.username}
                                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                        required
                                                    />
                                                    
                                                </div>

                                                <div className="form-outline mb-4">
                                               
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Enter password"
                                                        value={formData.password}
                                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                        required
                                                    />
                                                    
                                                </div>

                                                <div className="text-center pt-1 mb-5 pb-1">
                                                {/* btn btn-primary btn-block gradient-custom-2 mb-3 login-button*/}
                                                    <button type="submit" className="btn btn-primary w-100 mb-3" style={{ background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)", border: "none" }} disabled={isLoading}>
                                                        {isLoading ? 'Logging in...' : 'Log in'}
                                                    </button>
                                                    <a className="text-muted forgot-password" href="/forgot-password">Forgot password?</a>
                                                </div>

                                                <div className="d-flex align-items-center justify-content-center pb-3">
                                                    <p className="mb-0 me-2">Don't have an account?</p>
                                                    <button type="button" className="btn btn-outline-danger create-new-button" onClick={() => navigate('/register')}>Create new</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="gradient-custom-2">
                                            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                                <h4 className="mb-4">Welcome to MyStore</h4>
                                                <p className="small mb-0">
                                                Create an account to unlock exclusive deals, track your orders in real-time, 
    and receive special discounts. Join thousands of happy customers who shop 
    with confidence at MyStore.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;