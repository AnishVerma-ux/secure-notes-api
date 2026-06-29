import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaShieldAlt,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

import authService from "../../services/authService";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      toast.success(
        "Registration successful! Please verify your email."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* LEFT */}

      <div className="register-left">

        <div className="logo">

          <FaShieldAlt />

          <h1>Secure Notes</h1>

        </div>

        <h2>Create Your Secure Workspace</h2>

        <p>
          Start organizing your notes with
          secure authentication and email verification.
        </p>

        <div className="features">

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

      {/* RIGHT */}

      <div className="register-right">

        <div className="register-card">

          <h2>Create Account 🚀</h2>

          <p>Register to continue</p>

          <form onSubmit={handleRegister}>

            <div className="input-group">

              <FaUser className="icon" />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>

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

            <div className="input-group">

              <FaLock className="icon" />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

            </div>

            <button type="submit" disabled={loading}>

              {loading ? "Creating Account..." : "Create Account"}

            </button>

          </form>

          <p className="bottom-text">

            Already have an account?

            <Link to="/login"> Login</Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;