import './Menubar.css'
import {Link, useNavigate} from 'react-router-dom';
import {assets} from "../../assets/assets.js";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";

const Menubar = () =>{
    const navigate = useNavigate();
    const { logout: contextLogout, userRole, userName } = useContext(AppContext);
    const isAdmin = userRole === "ROLE_ADMIN";
    const logout = () =>{
        contextLogout();
        navigate("/login");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
            <a className="navbar-brand" href="#">
                <img src="/logo.png" alt="Logo" height="40" style={{borderRadius: '6px'}}/>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse p-2" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/explore">Explore</Link>
                    </li>
                    {isAdmin && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/items">Manage Items</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/category">Manage Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">Manage Users</Link>
                            </li>
                        </>
                    )}
                    <li className="nav-item">
                        <Link className="nav-link" to="/orders">Order History</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ms-auto ms-ms-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a href="#" className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                           id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={assets.profile} alt="" height={32} width={32}/>
                            {/* Inline name preview next to avatar */}
                            <span className="d-none d-lg-inline" style={{
                                fontSize: '0.82rem',
                                fontWeight: 600,
                                color: isAdmin ? '#a78bfa' : '#93c5fd'
                            }}>
                                {isAdmin ? '👑' : '👤'} {userName || (isAdmin ? 'Admin' : 'User')}
                            </span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown"
                            style={{minWidth: '180px'}}>
                            {/* User info header */}
                            <li>
                                <div style={{
                                    padding: '10px 16px 8px',
                                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                                }}>
                                    <div style={{
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        color: isAdmin ? '#a78bfa' : '#93c5fd'
                                    }}>
                                        {userName || 'User'}
                                    </div>
                                    <div style={{
                                        display: 'inline-block',
                                        marginTop: '4px',
                                        padding: '2px 8px',
                                        borderRadius: '20px',
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.5px',
                                        background: isAdmin
                                            ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                                            : 'linear-gradient(135deg,#3b82f6,#2563eb)',
                                        color: '#fff'
                                    }}>
                                        {isAdmin ? '👑 ADMIN' : '👤 USER'}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="#!" className="dropdown-item" onClick={logout}>
                                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default Menubar;