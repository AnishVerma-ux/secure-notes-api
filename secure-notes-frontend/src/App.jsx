import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";


const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          
            <Route path="/dashboard" element={
                <PrivateRoute><Dashboard /></PrivateRoute>
            } />
            <Route path="/profile" element={
                <PrivateRoute><Profile /></PrivateRoute>
            } />
        </Routes>
    );
}

export default App;