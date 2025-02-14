import React, { useState, useEffect } from 'react';
import './Profile.css';
const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [message, setMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/auth/user/', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    setError('Failed to load profile');
                }
            } catch (err) {
                setError('Failed to load profile');
            }
        };

        fetchProfile();
    }, []);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (formData.new_password !== formData.confirm_password) {
            setPasswordError('New passwords do not match');
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
                setPasswordError('');
                setFormData({ old_password: '', new_password: '', confirm_password: '' });
                setShowChangePassword(false);
                alert('Password changed successfully');
            } else {
                const data = await response.json();
                setPasswordError(data.detail || 'Password change failed');
            }
        } catch (err) {
            setPasswordError('Password change failed. Please try again.');
        }
    };

    return (
        <div className="profile-container">
            <div className="card profile-card">
                <div className="card-body">
                    <h2 className="card-title mb-4">Profile</h2>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    {userData && (
                        <div className="profile-info">
                            <div className="mb-4">
                                <label>Username:</label>
                                <p>{userData.username}</p>
                            </div>
                            <div className="mb-4">
                                <label>Email:</label>
                                <p>{userData.email}</p>
                            </div>
                            <div className="profile-buttons">
                                <button className="btn btn-update-profile">
                                    Update Profile
                                </button>
                                <button 
                                    className="btn btn-change-password"
                                    onClick={() => setShowChangePassword(!showChangePassword)}
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    )}
                    {showChangePassword && (
                        <div>
                            <h3 className="mt-4">Change Password</h3>
                            {message && (
                                <div className="alert alert-success" role="alert">
                                    {message}
                                </div>
                            )}
                            {passwordError && (
                                <div className="alert alert-danger" role="alert">
                                    {passwordError}
                                </div>
                            )}
                            <form onSubmit={handlePasswordChange}>
                                <div className="mb-3">
                                    <label className="form-label">Current Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={formData.old_password}
                                        onChange={(e) => setFormData({ ...formData, old_password: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={formData.new_password}
                                        onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={formData.confirm_password}
                                        onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-danger w-100">Change Password</button>


                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;