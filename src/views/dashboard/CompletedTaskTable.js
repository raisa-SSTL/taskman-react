import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import {
    Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,
    Chip,
    CircularProgress,
    Button,
    Pagination,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";

  const CompletedTaskTable = ({ selectedDate }) => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [tasksPerPage] = useState(5);

    useEffect(() => {

      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No authorization token found");
      } 

        if (selectedDate.month && selectedDate.year) {
          // Make API request only when both month and year are selected
          const fetchCompletedTasks = () => {
            axios
              .post("http://localhost:8000/api/month-year-completed-tasks", {
                month: selectedDate.month,
                year: selectedDate.year,
                page: currentPage,
              }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              })
              .then((response) => {
                setCompletedTasks(response.data.tasks.data || []);
                setTotalPages(response.data.tasks.last_page || 1); // Update total pages from backend
              })
              .catch((error) => {
                console.error("Error fetching tasks:", error);
              });
          };
      
          fetchCompletedTasks();
        }
      }, [selectedDate, currentPage]);
      
      const handleOpen = (taskId) => {
        setSelectedTaskId(taskId);
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
        setSelectedTaskId(null);
      };

    const handlePageChange = (event, value) => {
      setCurrentPage(value); // Update the current page when pagination changes
    };

  const handleConfirmDelete = () => {
    if (!selectedTaskId) return;
  
    axios.post(`http://localhost:8000/api/delete-task/${selectedTaskId}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Task deleted successfully!");
          window.location.reload(); // Refresh the page
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete the task. Please try again.");
      })
      .finally(() => {
        handleClose(); // Close the dialog
      });
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
                                Title
                            </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="h6">
                                Priority
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography color="textSecondary" variant="h6">
                            Actions
                        </Typography>
                      </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {completedTasks.map((completedTasks, index) => (
                        <TableRow key={completedTasks.id}>
                            <TableCell>
                              <Typography variant="h6">
                                {index + 1 + (currentPage - 1) * tasksPerPage}
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
                                    {completedTasks.title}
                                  </Typography>
                                  <Typography
                                    color="textSecondary"
                                    sx={{
                                      fontSize: "13px",
                                    }}
                                  >
                                    #{completedTasks.id}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                sx={{
                                  pl: "4px",
                                  pr: "4px",
                                backgroundColor:
                                    completedTasks.priority === "High"
                                    ? "error.main" // Red for "High"
                                    : completedTasks.priority === "Low"
                                    ? "success.main" // Green for "Low"
                                    : "", // Default color
                                  color: "#fff",
                                }}
                                size="small"
                                label={completedTasks.priority}
                              ></Chip>
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
                                          onClick={() => navigate(`/task/show-task/${completedTasks.id}`)}
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
                                          onClick={() => navigate(`/task/update-task/${completedTasks.id}`)}
                                        >
                                          Update
                                </Button>
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
                                          // onClick={() => handleDelete(task.id)}
                                          onClick={() => handleOpen(completedTasks.id)}
                                        >
                                          Delete
                                </Button>
                            </TableCell>                                                        
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* Pagination */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Pagination
                count={totalPages} // Total number of pages
                page={currentPage} // Current page
                onChange={handlePageChange} // Page change handler
                color="primary"
              />
            </Box>
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
                  Are you sure you want to delete this task? This action cannot be undone.
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
        </>
    );
  };

  export default CompletedTaskTable;