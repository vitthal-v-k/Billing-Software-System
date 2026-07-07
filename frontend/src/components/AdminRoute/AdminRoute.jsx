import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";

const AdminRoute = ({ children }) => {
    const { isLoggedIn, userRole } = useContext(AppContext);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (userRole !== "ROLE_ADMIN") {
        toast.error("Access denied. Admin only.", { id: "admin-access-denied" });
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default AdminRoute;
