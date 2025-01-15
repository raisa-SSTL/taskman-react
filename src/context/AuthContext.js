import React, { createContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null); // Stores user data and token
  const [loading, setLoading] = useState(true); // To handle initial loading state
  const logoutTimer = useRef(null);
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
            // const timer = setTimeout(() => {
            //     handleLogout();
            // }, timeLeft);

            // return () => clearTimeout(timer); // Cleanup timeout
            // Schedule automatic logout when token expires
            startLogoutTimer(timeLeft);
        } else {
            // handleLogout(); // Token has expired
            clearLocalStorage();
        }
    //   setAuthData({ token, user: JSON.parse(userData) });
    }
    setLoading(false);
  }, []);

  // Start automatic logout timer
  const startLogoutTimer = (timeLeft) => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = setTimeout(() => {
        handleLogout();
    }, timeLeft);
  };

  // Clear localStorage and auth state
  const clearLocalStorage = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("tokenExpiration");
    setAuthData(null);
  };

  // Handle login
  const login = (token, user) => {
    const expirationTime = Date.now() + 60 * 60 * 1000; // Example: 1 hour

    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("tokenExpiration", expirationTime);
    setAuthData({ token, user });
    startLogoutTimer(60 * 60 * 1000);
    if (user.role === "employee") {
      navigate("/e-dashboard");
    } else if (user.role === "admin") {
        navigate("/dashboard");
    } else {
        console.warn("Unknown role, defaulting to login page");
        navigate("/");
    }
  };

  // Handle logout
  const handleLogout = () => {
    // localStorage.removeItem("authToken");
    // localStorage.removeItem("userData");
    // localStorage.removeItem("tokenExpiration");
    // setAuthData(null);
    clearLocalStorage();
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    navigate("/login");
  };

   // Clean up timers on component unmount
   useEffect(() => {
    return () => {
        if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authData, login, logout: handleLogout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
