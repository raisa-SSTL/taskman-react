import React, { createContext, useState } from 'react';
import axios from 'axios';

// Create Context
export const GlobalContext = createContext();

// Create Provider Component
export const GlobalProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch employee data by ID using Promises
  const fetchEmployee = (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
    //   setError("Authorization token is missing.");
    //   return;
        const errorMessage = "Authorization token is missing.";
        setError(errorMessage);
        setLoading(false); 
        return Promise.reject(new Error(errorMessage));
    }

    setLoading(true);
    return axios
      .get(`http://localhost:8000/api/show-employee-details/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setEmployee(response.data.data);
        setLoading(false);
        return response.data.data;
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        return Promise.reject(err);
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        employee,
        fetchEmployee,
        loading,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
