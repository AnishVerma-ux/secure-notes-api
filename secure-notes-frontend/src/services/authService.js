import api from "../api/axiosConfig";

const login = (data) => api.post("/auth/login", data);

const register = (data) => api.post("/auth/register", data);

const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
};

const getUser = () => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload;
    } catch {
        return null;
    }
};

export default {
    login,
    register,
    logout,
    getUser,
};