import { useNavigate, useLocation } from "react-router-dom";
import authService from "../../services/authService";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        const confirm = window.confirm("Are you sure you want to logout?");
        if (!confirm) return;
        authService.logout();
    };

    return (
        <div className="sidebar">
            <div className="sidebar-brand">
                <span className="brand-icon">🔒</span>
                <span>Secure Notes</span>
            </div>
            <ul className="sidebar-nav">
                <li
                    className={location.pathname === "/dashboard" ? "active" : ""}
                    onClick={() => navigate("/dashboard")}
                >
                    <span>📋</span> Dashboard
                </li>
                <li
                    className={location.pathname === "/profile" ? "active" : ""}
                    onClick={() => navigate("/profile")}
                >
                    <span>👤</span> Profile
                </li>
                <li className="logout" onClick={handleLogout}>
                    <span>🚪</span> Logout
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;