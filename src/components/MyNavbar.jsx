// src/components/MyNavbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">UserApp</Link>
        <div className="d-flex">
          {user ? (
            <>
              <span className="navbar-text text-light me-3">
                Hello, {user.name}
              </span>
              <Link className="btn btn-outline-light me-2" to="/account">Account</Link>
              <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
              <Link className="btn btn-warning" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;