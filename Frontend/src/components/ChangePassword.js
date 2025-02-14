import React, { useState } from 'react';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.new_password !== formData.confirm_password) {
            setError('New passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/password/change/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({
                    old_password: formData.old_password,
                    new_password: formData.new_password
                })
            });

            if (response.ok) {
                setMessage('Password changed successfully');
                setError('');
                setFormData({ old_password: '', new_password: '', confirm_password: '' });
            } else {
                const data = await response.json();
                setError(data.detail || 'Password change failed');
            }
        } catch (err) {
            setError('Password change failed. Please try again.');
        }
    };

    return (
        <section className="min-vh-100 d-flex align-items-center" style={{ backgroundColor: "#eee" }}>
            <div className="container py-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-lg" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5">
                                <div className="mb-4 text-center">
                                    <h3 className="fw-bold mb-3">Change Password</h3>
                                    <p className="text-muted mb-4">Please enter your current password and choose a new one</p>
                                </div>

                                {message && (
                                    <div className="alert alert-success d-flex align-items-center" role="alert">
                                        <i className="fas fa-check-circle me-2"></i>
                                        {message}
                                    </div>
                                )}

                                {error && (
                                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        <i className="fas fa-exclamation-circle me-2"></i>
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline mb-4">
                                        <label className="form-label">Current Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            value={formData.old_password}
                                            onChange={(e) => setFormData({ ...formData, old_password: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            value={formData.new_password}
                                            onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label">Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            value={formData.confirm_password}
                                            onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-lg w-100 gradient-custom-2"
                                        style={{
                                            background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                                            border: 'none'
                                        }}
                                    >
                                        Update Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;