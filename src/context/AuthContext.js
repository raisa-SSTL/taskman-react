import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null); // Stores user data and token
  const [loading, setLoading] = useState(true); // To handle initial loading state

  const navigate = useNavigate();

  // Check for user authentication on initial load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (token && userData && expirationTime) {
        const timeLeft = expirationTime - Date.now();
        if (timeLeft > 0) {
            setAuthData({ token, user: JSON.parse(userData) });

            // Schedule automatic logout when token expires
            const timer = setTimeout(() => {
                handleLogout();
            }, timeLeft);

            return () => clearTimeout(timer); // Cleanup timeout
        } else {
            handleLogout(); // Token has expired
        }
    //   setAuthData({ token, user: JSON.parse(userData) });
    }
    setLoading(false);
  }, []);

  // Handle login
  const login = (token, user) => {
    const expirationTime = localStorage.getItem("tokenExpiration");
    // Schedule automatic logout based on expiration time
    const timeLeft = expirationTime - Date.now();
    const timer = setTimeout(() => {
        handleLogout();
    }, timeLeft);

    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(user));
    setAuthData({ token, user });
    navigate("/dashboard");
    return () => clearTimeout(timer); // Cleanup timer
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("tokenExpiration");
    setAuthData(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout: handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
