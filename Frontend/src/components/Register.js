import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.password2) {
            setError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.detail || data.non_field_errors?.join(", ") || 'Registration failed');
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error("Registration Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-wrapper">
            <section className="gradient-form">
            <div className="container py-2 h-auto mt-4">
            <div className="row d-flex justify-content-center align-items-center h-10">
                        <div className="col-xl-15">
                        <div className="card rounded-3 text-black">
                                <div className="row g-0">
                                    <div className="col-lg-6">
                                        <div className="card-body p-md-4 mx-md-3">
                                            <div className="text-center">
                                                <img 
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                    style={{ width: '150px' }} 
                                                    alt="logo" 
                                                />
                                                <h4 className="mt-1 mb-4 pb-1">Create an Account</h4>
                                            </div>

                                            {error && (
                                                <div className="alert alert-danger" role="alert">
                                                    {error}
                                                </div>
                                            )}

                                            <form onSubmit={handleSubmit}>
                                                <p>Please fill in your details</p>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Username"
                                                        value={formData.username}
                                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                        required
                                                    />
                                                  
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        required
                                                    />
                                                  
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Password"
                                                        value={formData.password}
                                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                        required
                                                    />
                                                 
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Confirm Password"
                                                        value={formData.password2}
                                                        onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                                                        required
                                                    />
                                                   
                                                </div>

                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button
                                                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                        type="submit"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? 'Creating Account...' : 'Register'}
                                                    </button>
                                                </div>

                                                <div className="d-flex align-items-center justify-content-center pb-4">
                                                    <p className="mb-0 me-2">Already have an account?</p>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger"
                                                        onClick={() => navigate('/login')}
                                                    >
                                                        Log in
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="gradient-custom-2">
                                            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                                <h4 className="mb-4">Join our Community</h4>
                                                <p className="small mb-0">
                                                    Create an account to enjoy exclusive benefits, 
                                                    track your orders, and get access to special offers. 
                                                    Join thousands of satisfied customers who trust our services.
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

export default Register;