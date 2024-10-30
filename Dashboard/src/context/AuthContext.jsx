// /src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";

// Create authentication context
export const AuthContext = createContext();

// AuthProvider component to manage global authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  // Load authentication state from localStorage when app loads
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  // Function to log in (store token)
  const login = (token) => {
    localStorage.setItem("authToken", token); // Save token in localStorage
    setAuthToken(token);
    setIsAuthenticated(true);
  };

  // Function to log out (remove token)
  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
