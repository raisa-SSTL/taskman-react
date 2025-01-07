import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../context/AuthContext";

import {
    Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, CircularProgress, Button, Pagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  } from "@mui/material";

const EmployeeListTable = ({searchText, permissions}) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 5;
    const [open, setOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const {authData} = useContext(AuthContext);

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const getEmployeeList = () => {
                setLoading(true);

                const headers = {
                    Authorization: `Bearer ${authData.token}`,
                    "Content-Type": "application/json",
                };

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
                    setEmployees(data.data || data); 
                    setTotalPages(data.last_page || 1);
                  })
                  .catch((error) => {
                    console.error("Error fetching tasks:", error);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              };
          
        getEmployeeList();
          
    }, [page, searchText]);

    if (loading) {
            return (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "100vh",
                }}
              >
                <CircularProgress />
              </Box>
            );
    }

    const handleOpen = (empId) => {
        setSelectedEmployeeId(empId);
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
        setSelectedEmployeeId(null);
    };

    const handleConfirmDelete = () => {
        if (!selectedEmployeeId) return;
      
        axios.post(`http://localhost:8000/api/delete-employee/${selectedEmployeeId}`, {},
          {
            headers: {
              Authorization: `Bearer ${authData.token}`,
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            if (response.status === 200) {
              toast.success("Employee deleted successfully!");
              window.location.reload(); 
            }
          })
          .catch((error) => {
            console.error("Error deleting employee:", error);
            toast.error("Failed to delete the employee. Please try again.");
          })
          .finally(() => {
            handleClose(); 
          });
    };

    const handlePageChange = (event, value) => {
        setPage(value);
      };

    return(
        <>
            <Table
                      aria-label="simple table"
                      sx={{
                        mt: 3,
                        whiteSpace: "nowrap",
                      }}
            >
                 <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                SL
                            </Typography>                            
                        </TableCell>  
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Name
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography color="textSecondary" variant="h6">
                                Actions
                            </Typography>
                        </TableCell>                                                                    
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee, index) => (
                        <TableRow key={employee.id}>
                            <TableCell>
                              <Typography variant="h6">
                                {index + 1 + (page - 1) * perPage} 
                              </Typography>
                            </TableCell>   
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      fontWeight: "600",
                                    }}
                                  >
                                    {employee.name}
                                  </Typography>
                                  <Typography
                                    color="textSecondary"
                                    sx={{
                                      fontSize: "13px",
                                    }}
                                  >
                                    #{employee.id}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>   
                            <TableCell align="right">
                              <Button
                                          variant="outlined"
                                          color="primary"
                                          sx={{
                                            mr: 1,
                                            mb: {
                                              xs: 1,
                                              sm: 0,
                                              lg: 0,
                                            },
                                          }}
                                        //   onClick={() => navigate(`/task/show-task/${task.id}`)}
                                        >
                                          View
                                </Button>
                                <Button
                                          variant="outlined"
                                          color="secondary"
                                          sx={{
                                            mr: 1,
                                            mb: {
                                              xs: 1,
                                              sm: 0,
                                              lg: 0,
                                            },
                                          }}
                                        //   onClick={() => navigate(`/task/update-task/${task.id}`)}
                                        >
                                          Update
                                </Button>
                                {permissions.includes("delete employee") && (
                                  <Button
                                            variant="outlined"
                                            color="error"
                                            sx={{
                                              mr: 1,
                                              mb: {
                                                xs: 1,
                                                sm: 0,
                                                lg: 0,
                                              },
                                            }}
                                            onClick={() => handleOpen(employee.id)}
                                          >
                                            Delete
                                  </Button>
                                )}
                            </TableCell>                                                                                 
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Delete Confirmation Dialog */}
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                    Are you sure you want to delete this employee? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                    Delete
                    </Button>
                </DialogActions>
            </Dialog>   
            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} /> 
            {!searchText && (
                      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                        <Pagination
                          count={totalPages}
                          page={page}
                          onChange={handlePageChange}
                          color="primary"
                        />
                      </Box>
            )}        
        </>
    );


};

export default EmployeeListTable;