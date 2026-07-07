import './OrderHistory.css';
import { useContext, useEffect, useState } from "react";
import { latestOrders, allOrders } from "../../Service/OrderService.js";
import { AppContext } from "../../context/AppContext.jsx";

const OrderHistory = () => {
    const { userRole } = useContext(AppContext);
    const isAdmin = userRole === "ROLE_ADMIN";

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("ALL"); // ALL | COMPLETED | PENDING

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = isAdmin ? await allOrders() : await latestOrders();
                setOrders(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [isAdmin]);

    const formatDate = (dateString) => {
        const d = new Date(dateString);
        return {
            date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            time: d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
        };
    };

    const getStatus = (order) => order.paymentDetails?.status || "PENDING";

    const filtered = orders.filter(o => {
        const matchSearch =
            o.orderId?.toLowerCase().includes(search.toLowerCase()) ||
            o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
            o.placedByName?.toLowerCase().includes(search.toLowerCase()) ||
            o.phoneNumber?.includes(search);
        const matchFilter = filter === "ALL" || getStatus(o) === filter;
        return matchSearch && matchFilter;
    });

    const totalRevenue = orders
        .filter(o => getStatus(o) === "COMPLETED")
        .reduce((sum, o) => sum + (o.grandTotal || 0), 0);

    const completedCount = orders.filter(o => getStatus(o) === "COMPLETED").length;
    const pendingCount   = orders.filter(o => getStatus(o) === "PENDING").length;

    if (loading) {
        return (
            <div className="oh-loading">
                <div className="oh-spinner"></div>
                <p>Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="oh-page">

            {/* ── Page Header ────────────────── */}
            <div className="oh-header">
                <div className="oh-header-left">
                    <div className="oh-header-icon">
                        <i className="bi bi-receipt"></i>
                    </div>
                    <div>
                        <h1 className="oh-title">
                            {isAdmin ? "All Users Transaction History" : "Order History"}
                        </h1>
                        <p className="oh-subtitle">
                            {isAdmin
                                ? `${orders.length} total orders across all users`
                                : `${orders.length} total orders`}
                        </p>
                    </div>
                </div>

                {/* Stats row */}
                <div className="oh-stats">
                    <div className="oh-stat oh-stat--revenue">
                        <span className="oh-stat-label">Revenue</span>
                        <span className="oh-stat-value">₹{totalRevenue.toFixed(2)}</span>
                    </div>
                    <div className="oh-stat oh-stat--completed">
                        <span className="oh-stat-label">Completed</span>
                        <span className="oh-stat-value">{completedCount}</span>
                    </div>
                    <div className="oh-stat oh-stat--pending">
                        <span className="oh-stat-label">Pending</span>
                        <span className="oh-stat-value">{pendingCount}</span>
                    </div>
                </div>
            </div>

            {/* ── Toolbar ────────────────────── */}
            <div className="oh-toolbar">
                <div className="oh-search-wrap">
                    <i className="bi bi-search oh-search-icon"></i>
                    <input
                        type="text"
                        className="oh-search"
                        placeholder={isAdmin
                            ? "Search by order ID, user name, customer, phone..."
                            : "Search by order ID, customer, phone..."}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && (
                        <button className="oh-search-clear" onClick={() => setSearch("")}>
                            <i className="bi bi-x"></i>
                        </button>
                    )}
                </div>

                <div className="oh-filters">
                    {['ALL', 'COMPLETED', 'PENDING'].map(f => (
                        <button
                            key={f}
                            className={`oh-filter-btn ${filter === f ? 'active-' + f.toLowerCase() : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f === 'ALL' && <i className="bi bi-list-ul"></i>}
                            {f === 'COMPLETED' && <i className="bi bi-check-circle"></i>}
                            {f === 'PENDING' && <i className="bi bi-clock"></i>}
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Orders Table ───────────────── */}
            {filtered.length === 0 ? (
                <div className="oh-empty">
                    <i className="bi bi-inbox"></i>
                    <p>{search || filter !== 'ALL' ? 'No orders match your filter' : 'No orders yet'}</p>
                </div>
            ) : (
                <div className="oh-table-wrap">
                    <table className="oh-table">
                        <thead>
                            <tr>
                                <th><i className="bi bi-hash"></i> Order ID</th>
                                {isAdmin && <th><i className="bi bi-person-badge"></i> Placed By</th>}
                                <th><i className="bi bi-person"></i> Customer</th>
                                <th><i className="bi bi-box-seam"></i> Items</th>
                                <th><i className="bi bi-currency-rupee"></i> Total</th>
                                <th><i className="bi bi-credit-card"></i> Payment</th>
                                <th><i className="bi bi-circle-fill"></i> Status</th>
                                <th><i className="bi bi-calendar3"></i> Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((order, i) => {
                                const status = getStatus(order);
                                const { date, time } = formatDate(order.createdAt);
                                const isUPI = order.paymentMethod === 'UPI';
                                return (
                                    <tr key={order.orderId} style={{ animationDelay: `${i * 30}ms` }}>
                                        {/* Order ID */}
                                        <td>
                                            <span className="oh-order-id">{order.orderId?.slice(0, 16)}...</span>
                                        </td>

                                        {/* Placed By — admin only */}
                                        {isAdmin && (
                                            <td>
                                                <div className="oh-customer">
                                                    <div className="oh-avatar" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                                                        {order.placedByName?.[0]?.toUpperCase() || '?'}
                                                    </div>
                                                    <div>
                                                        <p className="oh-cust-name" style={{ color: '#a78bfa' }}>
                                                            {order.placedByName || '—'}
                                                        </p>
                                                        <p className="oh-cust-phone">
                                                            <i className="bi bi-envelope"></i>
                                                            {order.placedBy}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        )}

                                        {/* Customer */}
                                        <td>
                                            <div className="oh-customer">
                                                <div className="oh-avatar">{order.customerName?.[0]?.toUpperCase() || '?'}</div>
                                                <div>
                                                    <p className="oh-cust-name">{order.customerName || '—'}</p>
                                                    <p className="oh-cust-phone">
                                                        <i className="bi bi-telephone"></i>
                                                        {order.phoneNumber}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Items count */}
                                        <td>
                                            <span className="oh-items-badge">
                                                {order.items?.length ?? 0}
                                            </span>
                                        </td>

                                        {/* Total */}
                                        <td>
                                            <span className="oh-total">₹{order.grandTotal}</span>
                                        </td>

                                        {/* Payment method */}
                                        <td>
                                            <span className={`oh-payment-badge ${isUPI ? 'upi' : 'cash'}`}>
                                                <i className={`bi bi-${isUPI ? 'phone' : 'cash-coin'}`}></i>
                                                {order.paymentMethod}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td>
                                            <span className={`oh-status-badge ${status === 'COMPLETED' ? 'completed' : 'pending'}`}>
                                                <span className="oh-status-dot"></span>
                                                {status}
                                            </span>
                                        </td>

                                        {/* Date */}
                                        <td>
                                            <div className="oh-date">
                                                <span className="oh-date-main">{date}</span>
                                                <span className="oh-date-time">{time}</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
export default OrderHistory;