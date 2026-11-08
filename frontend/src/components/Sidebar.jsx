import "../index.css";
import { NavLink, useNavigate } from "react-router-dom";

export const Sidebar = () => {
const navigate = useNavigate();

const handleLogout = () => {
localStorage.removeItem("token");
navigate("/login");
};

return (
<aside className="sidebar">
<h1>FileHub</h1>

  <nav>
    <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
      Dashboard
    </NavLink>

    <NavLink to="/files" className={({ isActive }) => isActive ? "active" : ""}>
      My Files
    </NavLink>

    <NavLink to="/upload" className={({ isActive }) => isActive ? "active" : ""}>
      Upload
    </NavLink>

    <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
      Profile
    </NavLink>

    <hr />

    <NavLink to="/login">Login</NavLink>
    <NavLink to="/register">Register</NavLink>

    <button onClick={handleLogout}>Leave Account</button>
  </nav>
</aside>

);
};
