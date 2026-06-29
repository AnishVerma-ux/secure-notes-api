import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaShieldAlt,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

import authService from "../../services/authService";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await authService.login(formData);

      // Save JWT
      localStorage.setItem("token", response.data);

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* LEFT PANEL */}

      <div className="login-left">
        <div className="logo">
          <FaShieldAlt />

          <h1>Secure Notes</h1>
        </div>

       

        <p>
          Store your personal notes securely using JWT Authentication and Email
          Verification.
          <br />
          Fast. Secure. Reliable.
        </p>

        <div className="features">
          <div className="ai-preview-card">
    <div className="ai-icon">🤖</div>

    <div className="ai-content">
        <h4>AI Notes Assistant</h4>
        <p>
            Ask questions about your notes using RAG.
        </p>
    </div>
</div>
          <div className="feature">
            <FaCheckCircle />
            <span>JWT Authentication</span>
          </div>

          <div className="feature">
            <FaCheckCircle />
            <span>Email Verification</span>
          </div>

          <div className="feature">
            <FaCheckCircle />
            <span>Private Notes</span>
          </div>

          <div className="feature">
            <FaCheckCircle />
            <span>Responsive Dashboard</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back 👋</h2>

          <p>Login to continue</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <FaEnvelope className="icon" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <FaLock className="icon" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="bottom-text">
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;