import { useState } from "react";
import { addUser } from "../../Service/UserService.js";
import toast from "react-hot-toast";
import './UserForm.css';

const UserForm = ({ setUsers }) => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: "", email: "", password: "", role: "ROLE_USER"
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await addUser(data);
            setUsers(prev => [...prev, response.data]);
            toast.success("User added!");
            setData({ name: "", email: "", password: "", role: "ROLE_USER" });
        } catch (err) {
            console.error(err);
            toast.error("Error adding user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-form-card">

            {/* Header */}
            <div className="user-form-header">
                <div className="user-form-header-icon">
                    <i className="bi bi-person-plus"></i>
                </div>
                <div>
                    <h2 className="user-form-title">Add New User</h2>
                    <p className="user-form-subtitle">Create a staff account with role access</p>
                </div>
            </div>

            <form onSubmit={onSubmitHandler} className="user-form-body">

                {/* Avatar placeholder */}
                <div className="user-avatar-preview">
                    <div className="user-avatar-ring">
                        <i className="bi bi-person"></i>
                    </div>
                    <p className="user-avatar-label">New Staff Member</p>
                </div>

                {/* Name */}
                <div className="user-form-group">
                    <label className="user-form-label" htmlFor="u-name">
                        <i className="bi bi-person"></i> Full Name
                    </label>
                    <div className="user-input-wrap">
                        <input type="text" id="u-name" name="name"
                            className="user-form-input"
                            placeholder="e.g. Vittal Kumar"
                            value={data.name} onChange={onChangeHandler} required />
                    </div>
                </div>

                {/* Email */}
                <div className="user-form-group">
                    <label className="user-form-label" htmlFor="u-email">
                        <i className="bi bi-envelope"></i> Email Address
                    </label>
                    <div className="user-input-wrap">
                        <input type="email" id="u-email" name="email"
                            className="user-form-input"
                            placeholder="yourname@example.com"
                            value={data.email} onChange={onChangeHandler} required />
                    </div>
                </div>

                {/* Password */}
                <div className="user-form-group">
                    <label className="user-form-label" htmlFor="u-password">
                        <i className="bi bi-lock"></i> Password
                    </label>
                    <div className="user-input-wrap user-pass-wrap">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="u-password" name="password"
                            className="user-form-input"
                            placeholder="Min 6 characters"
                            value={data.password} onChange={onChangeHandler} required
                        />
                        <button
                            type="button"
                            className="pass-toggle"
                            onClick={() => setShowPassword(v => !v)}
                        >
                            <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                        </button>
                    </div>
                </div>

                {/* Role selector */}
                <div className="user-form-group">
                    <label className="user-form-label">
                        <i className="bi bi-shield-check"></i> Role
                    </label>
                    <div className="role-selector">
                        <button
                            type="button"
                            className={`role-btn ${data.role === 'ROLE_USER' ? 'active' : ''}`}
                            onClick={() => setData(d => ({ ...d, role: 'ROLE_USER' }))}
                        >
                            <i className="bi bi-person-badge"></i> Staff
                        </button>
                        <button
                            type="button"
                            className={`role-btn ${data.role === 'ROLE_ADMIN' ? 'active' : ''}`}
                            onClick={() => setData(d => ({ ...d, role: 'ROLE_ADMIN' }))}
                        >
                            <i className="bi bi-shield-lock"></i> Admin
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button type="submit" className="user-submit-btn" disabled={loading}>
                    {loading ? (
                        <><span className="user-btn-spinner"></span>Saving...</>
                    ) : (
                        <><i className="bi bi-person-check"></i>Add User</>
                    )}
                </button>
            </form>
        </div>
    );
};
export default UserForm;