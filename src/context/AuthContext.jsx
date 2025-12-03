// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load logged-in user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // --- Registration Logic ---
  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if email already exists
    const exists = users.find((u) => u.email === userData.email);
    if (exists) {
      return { success: false, message: "Email already registered!" };
    }

    // Save new user to the "database"
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true, message: "Registration successful! Please login." };
  };

  // --- Login Logic ---
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (validUser) {
      // Create a session
      setUser(validUser);
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      return { success: true };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  };

  // --- Logout Logic ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  // --- Update Profile Logic ---
  const updateProfile = (updatedData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Update the specific user in the users array
    const updatedUsers = users.map((u) => 
      u.email === user.email ? { ...u, ...updatedData } : u
    );

    // Save back to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Update current session
    const newUserSession = { ...user, ...updatedData };
    setUser(newUserSession);
    localStorage.setItem("currentUser", JSON.stringify(newUserSession));

    return { success: true, message: "Profile updated successfully!" };
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};