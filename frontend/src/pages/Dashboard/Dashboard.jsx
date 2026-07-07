import './Dashboard.css';
import { useEffect, useState, useContext } from 'react';
import { latestOrders, allOrders } from '../../Service/OrderService.js';
import { AppContext } from '../../context/AppContext.jsx';

const Dashboard = () => {
    const { userRole } = useContext(AppContext);
    const isAdmin = userRole === "ROLE_ADMIN";
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = isAdmin ? await allOrders() : await latestOrders();
                setOrders(res.data || []);
            } catch (err) {
                console.error('Failed to load orders:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [isAdmin]);

    // Compute today's stats — timezone-safe local date comparison
    const toLocalDateStr = (d) => {
        const dt = new Date(d);
        return `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`;
    };
    const todayStr = toLocalDateStr(new Date());
    const todayOrders = orders.filter(o => toLocalDateStr(o.createdAt) === todayStr);
    const todaySales = todayOrders
        .filter(o => o.paymentDetails?.status === 'COMPLETED')
        .reduce((sum, o) => sum + (o.grandTotal || 0), 0);

    // Also compute totals for context
    const totalRevenue = orders
        .filter(o => o.paymentDetails?.status === 'COMPLETED')
        .reduce((sum, o) => sum + (o.grandTotal || 0), 0);

    const getStatusBadge = (order) => {
        const status = order.paymentDetails?.status;
        if (status === 'COMPLETED') return <span className="badge-paid">Paid</span>;
        if (status === 'FAILED')    return <span className="badge-failed">Failed</span>;
        return <span className="badge-pending">Pending</span>;
    };

    const formatTime = (dateStr) => {
        if (!dateStr) return '-';
        const d = new Date(dateStr);
        return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div className="dashboard-container">

            {/* ── Stat Cards ── */}
            <div className="stats-row">
                <div className="stat-card yellow">
                    <div className="stat-icon">
                        <i className="bi bi-currency-rupee"></i>
                    </div>
                    <div className="stat-info">
                        <p>Today's Sales</p>
                        <h3>₹{todaySales.toFixed(2)}</h3>
                        <span className="stat-sub">Completed payments</span>
                    </div>
                </div>

                <div className="stat-card green">
                    <div className="stat-icon">
                        <i className="bi bi-cart3"></i>
                    </div>
                    <div className="stat-info">
                        <p>Today's Orders</p>
                        <h3>{todayOrders.length}</h3>
                        <span className="stat-sub">Orders placed today</span>
                    </div>
                </div>

                <div className="stat-card purple">
                    <div className="stat-icon">
                        <i className="bi bi-graph-up-arrow"></i>
                    </div>
                    <div className="stat-info">
                        <p>Total Revenue</p>
                        <h3>₹{totalRevenue.toFixed(2)}</h3>
                        <span className="stat-sub">All completed orders</span>
                    </div>
                </div>

                <div className="stat-card blue">
                    <div className="stat-icon">
                        <i className="bi bi-receipt"></i>
                    </div>
                    <div className="stat-info">
                        <p>Total Orders</p>
                        <h3>{orders.length}</h3>
                        <span className="stat-sub">All time</span>
                    </div>
                </div>
            </div>


            {/* ── Recent Orders ── */}
            <div className="recent-bills-card">
                <div className="card-heading">
                    <i className="bi bi-clock-history"></i>
                    Recent Orders
                </div>

                {loading ? (
                    <div className="dashboard-loading">
                        <div className="spinner-border" role="status"></div>
                        <span>Loading orders…</span>
                    </div>
                ) : (
                    <table className="bills-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="empty-orders">
                                            <i className="bi bi-inbox"></i>
                                            No recent orders
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order, idx) => (
                                    <tr key={idx}>
                                        <td>{order.orderId || '-'}</td>
                                        <td>{order.customer || order.customerName || '-'}</td>
                                        <td>₹{(order.grandTotal || 0).toFixed(2)}</td>
                                        <td>{order.paymentMethod || '-'}</td>
                                        <td>{getStatusBadge(order)}</td>
                                        <td>{formatTime(order.createdAt)}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Dashboard;