// src/pages/Account.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Account = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  // Initialize form with current user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: user.password
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const res = updateProfile(formData);
    if (res.success) {
      setMessage(res.message);
      setIsEditing(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3>Account Settings</h3>
        </div>
        <div className="card-body">
          {message && <div className="alert alert-success">{message}</div>}

          {isEditing ? (
            // --- EDIT MODE ---
            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label>Email (ID)</label>
                <input type="email" name="email" value={formData.email} disabled className="form-control bg-light" />
                <small className="text-muted">Email cannot be changed.</small>
              </div>
              <div className="mb-3">
                <label>New Password</label>
                <input type="text" name="password" value={formData.password} onChange={handleChange} className="form-control" />
              </div>
              <button type="submit" className="btn btn-success me-2">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
            </form>
          ) : (
            // --- VIEW MODE ---
            <div>
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Password:</strong> ********</p>
              <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Profile</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;