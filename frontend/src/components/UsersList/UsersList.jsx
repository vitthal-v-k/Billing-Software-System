import { useState } from "react";
import { deleteUser } from "../../Service/UserService.js";
import toast from "react-hot-toast";
import './UsersList.css';

const UsersList = ({ users, setUsers }) => {
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    const deleteByUserId = async (id) => {
        setDeletingId(id);
        try {
            await deleteUser(id);
            setUsers(prev => prev.filter(u => u.userId !== id));
            toast.success("User deleted.");
        } catch (err) {
            console.error(err);
            toast.error("Could not delete user");
        } finally {
            setDeletingId(null);
        }
    };

    // Get initials for avatar
    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?';
    };

    // Deterministic color from name
    const avatarColors = [
        ['rgba(99,102,241,0.25)', '#818cf8'],
        ['rgba(16,185,129,0.25)', '#34d399'],
        ['rgba(251,191,36,0.25)', '#fbbf24'],
        ['rgba(239,68,68,0.25)', '#f87171'],
        ['rgba(139,92,246,0.25)', '#a78bfa'],
    ];

    const getAvatarColor = (name) => {
        const idx = (name?.charCodeAt(0) || 0) % avatarColors.length;
        return avatarColors[idx];
    };

    return (
        <div className="users-list-panel">
            {/* Header */}
            <div className="users-list-header">
                <div className="users-list-title-row">
                    <span className="users-list-title">
                        <i className="bi bi-people"></i>
                        All Users
                    </span>
                    <span className="users-count-badge">{filteredUsers.length}</span>
                </div>
                <div className="users-search-wrapper">
                    <i className="bi bi-search users-search-icon"></i>
                    <input
                        type="text"
                        className="users-list-search"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && (
                        <button className="users-search-clear" onClick={() => setSearch("")}>
                            <i className="bi bi-x"></i>
                        </button>
                    )}
                </div>
            </div>

            {/* List */}
            <div className="users-list-body">
                {filteredUsers.length === 0 ? (
                    <div className="users-list-empty">
                        <i className="bi bi-people"></i>
                        <p>{search ? "No users match" : "No users yet"}</p>
                        <span>Add one using the form</span>
                    </div>
                ) : (
                    filteredUsers.map((user) => {
                        const [bg, color] = getAvatarColor(user.name);
                        return (
                            <div key={user.userId} className="users-list-row">
                                {/* Avatar with initials */}
                                <div className="user-avatar-initials"
                                    style={{ background: bg, color: color, borderColor: color }}>
                                    {getInitials(user.name)}
                                </div>
                                <div className="users-list-info">
                                    <p className="users-list-name">{user.name}</p>
                                    <p className="users-list-email">
                                        <i className="bi bi-envelope"></i>
                                        {user.email}
                                    </p>
                                </div>
                                <button
                                    className={`users-delete-btn ${deletingId === user.userId ? 'deleting' : ''}`}
                                    onClick={() => deleteByUserId(user.userId)}
                                    disabled={deletingId === user.userId}
                                >
                                    {deletingId === user.userId
                                        ? <span className="users-del-spinner"></span>
                                        : <i className="bi bi-trash3"></i>
                                    }
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
export default UsersList;