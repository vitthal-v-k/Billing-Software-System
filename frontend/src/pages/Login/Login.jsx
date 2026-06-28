import './Login.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/v1.0/login', {
                email,
                password
            });
            const { token, role } = response.data;
            login(token, role);
            navigate('/dashboard');
        } catch (err) {
            const msg = err.response?.data?.message || 'Invalid email or password';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="login-wrapper">
            {/* Animated Background */}
            <div className="login-bg">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
                <div className="grid-overlay"></div>
            </div>



            {/* Card */}
            <div className="login-card">


                <div className="card-header-text">
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to your account to continue</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className={`input-group-custom ${emailFocused || email ? 'active' : ''}`}>
                        <label className="floating-label">Email Address</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5"/>
                                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5"/>
                                </svg>
                            </span>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                placeholder="you@example.com"
                                className="login-input"
                                autoComplete="email"
                            />
                        </div>
                        <div className="input-glow"></div>
                    </div>

                    {/* Password Field */}
                    <div className={`input-group-custom ${passwordFocused || password ? 'active' : ''}`}>
                        <label className="floating-label">Password</label>
                        <div className="input-wrapper">
                            <span className="input-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5"/>
                                    <path d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11" stroke="currentColor" strokeWidth="1.5"/>
                                </svg>
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                placeholder="••••••••••"
                                className="login-input"
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.73 16.39 1 11.5C1.91 9.07 3.55 6.96 5.71 5.5M9.9 4.24A9.12 9.12 0 0 1 12 4C17 4 21.27 7.61 23 12.5C22.18 14.62 20.79 16.46 19 17.77M1 1L23 23M10.73 10.73A3 3 0 0 0 13.27 13.27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                        <path d="M1 12C2.73 7.61 7 4 12 4C17 4 21.27 7.61 23 12C21.27 16.39 17 20 12 20C7 20 2.73 16.39 1 12Z" stroke="currentColor" strokeWidth="1.5"/>
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                        <div className="input-glow"></div>
                    </div>



                    {/* Submit Button */}
                    <button type="submit" className="login-btn" id="login-submit-btn" disabled={loading}>
                        <span className="btn-text">{loading ? 'Signing in...' : 'Sign In'}</span>
                        <span className="btn-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        <div className="btn-shine"></div>
                    </button>
                </form>

                {/* Divider */}
                <div className="divider">
                    <span>Billing Management System</span>
                </div>
            </div>
        </div>
    );
};

export default Login;