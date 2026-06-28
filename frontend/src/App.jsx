import Menubar from "./components/Menubar/Menubar.jsx";
import {Route, Routes, useLocation, Navigate} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import OrderHistory from "./pages/OrderHistory/OrderHistory.jsx";

const App = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login" || location.pathname === "/";

    return (
        <div>
            {!isAuthPage && <Menubar/>}

            <Toaster/>

            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/login" replace />}/>
                <Route path="/login" element={<Login/>}/>

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard/></ProtectedRoute>
                }/>
                <Route path="/category" element={
                    <ProtectedRoute><ManageCategory/></ProtectedRoute>
                }/>
                <Route path="/users" element={
                    <ProtectedRoute><ManageUsers/></ProtectedRoute>
                }/>
                <Route path="/items" element={
                    <ProtectedRoute><ManageItems/></ProtectedRoute>
                }/>
                <Route path="/explore" element={
                    <ProtectedRoute><Explore/></ProtectedRoute>
                }/>
                <Route path="/orders" element={
                    <ProtectedRoute><OrderHistory/></ProtectedRoute>
                }/>

                {/* Catch-all → login */}
                <Route path="*" element={<Navigate to="/login" replace />}/>
            </Routes>
        </div>
    )
}
export default App;