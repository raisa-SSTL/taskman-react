import React, { createContext, useState } from 'react';
import axios from 'axios';

// Create Context
export const GlobalContext = createContext();

// Create Provider Component
export const GlobalProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the token from localStorage
  const token = localStorage.getItem("authToken");
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : null;

  // Function to fetch employee data by ID using Promises
  const fetchEmployee = (id) => {
    if (!headers) {
      const errorMessage = "Authorization token is missing.";
      setError(errorMessage);
      setLoading(false);
      return Promise.reject(new Error(errorMessage));
    }
    setLoading(true);
    return axios
      .get(`http://localhost:8000/api/show-employee-details/${id}`, {
        headers,
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

  const [employeeList, setEmployeeList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch employee list
  const getEmployeeList = (searchText, page) => {
    setLoading(true);
    if (!headers) {
      const errorMessage = "Authorization token is missing.";
      setError(errorMessage);
      setLoading(false);
      return;
    }
    const url = searchText
      ? `http://localhost:8000/api/search-employee`
      : `http://localhost:8000/api/employee-list?page=${page}`;

    const payload = searchText ? { name: searchText } : null;

    const request = searchText
      ? axios.post(url, payload, { headers })
      : axios.get(url, { headers });

    request
      .then((response) => {
        const data = response.data.data || [];
        setEmployeeList(data.data || data);
        setTotalPages(data.last_page || 1);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [assignedTasksList, setAssignedTasksList] = useState([]);

  const getAssignedTasksList = () => {
    setLoading(true);
    if (!headers) {
      const errorMessage = "Authorization token is missing.";
      setError(errorMessage);
      setLoading(false);
      return;
    }
    axios.get(`http://localhost:8000/api/all-assigned-tasks`, {headers})
          .then((response) => {
            const data = response.data.data;
            setAssignedTasksList(data); 
            setLoading(false);
            console.log("assigned tasks list", data);
          })
          .catch((error) => {
            console.error("Error fetching assigned tasks list:", error);
            setLoading(false);
          });
  }

  return (
    <GlobalContext.Provider
      value={{
        employee,
        fetchEmployee,
        loading,
        error,
        employeeList,
        getEmployeeList,
        totalPages,
        token,
        headers,
        assignedTasksList,
        getAssignedTasksList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
