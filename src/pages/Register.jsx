// src/pages/Register.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    // Call Context Register
    const res = register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (res.success) {
      alert(res.message);
      navigate("/login");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">Register</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Full Name</label>
              <input type="text" name="name" className="form-control" required onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" name="email" className="form-control" required onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" name="password" className="form-control" required onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" className="form-control" required onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary w-100">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;