import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import authService from "../../services/authService";
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = authService.getUser();
        if (!userData) {
            navigate("/login");
            return;
        }
        setUser(userData);
    }, []);

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-main">
                <div className="profile-container">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            {user?.sub?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                            <h2 className="profile-name">{user?.sub}</h2>
                            <p className="profile-role">Account holder</p>
                        </div>
                    </div>

                    <div className="profile-card">
                        <h3 className="profile-section-title">Account info</h3>
                        <div className="profile-row">
                            <span className="profile-key">📧 Email</span>
                            <span className="profile-val">{user?.sub}</span>
                        </div>
                        <div className="profile-row">
                            <span className="profile-key">🆔 User ID</span>
                            <span className="profile-val">{user?.userId}</span>
                        </div>
                        <div className="profile-row">
                            <span className="profile-key">🔑 Token expires</span>
                            <span className="profile-val">
                                {user?.exp
                                    ? new Date(user.exp * 1000).toLocaleString()
                                    : "—"}
                            </span>
                        </div>
                    </div>

                    <button
                        className="profile-logout-btn"
                        onClick={() => authService.logout()}
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;