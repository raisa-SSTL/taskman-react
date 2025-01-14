import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AssignTaskModal from "./AssignTaskModal";
import { GlobalContext } from "../../context/GlobalContext";

import {
  Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, CircularProgress, Button, Pagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";

const TaskListTable = ({ searchQuery, filters, permission }) => {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const perPage = 5;

    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);

    const { assignedTasksList, getAssignedTasksList } = useContext(GlobalContext);

    // USING INDEX API

    // useEffect(() => {
    //     // Fetch data from the API
    //     axios
    //       .get(`http://localhost:8000/api/task-list?page=${page}`) // Replace with your API endpoint
    //       .then((response) => {
    //         const { data } = response.data;
    //         setTasks(data.data); 
    //         setTotalPages(data.last_page);
    //         setLoading(false);
    //         console.log("data", data);
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching tasks:", error);
    //         setLoading(false);
    //       });
    // }, [page]); 

    // USING INDEX + SEARCH API

    // useEffect(() => {
    //   const fetchTasks = () => {
    //     setLoading(true);
    //     const url = searchQuery
    //       ? `http://localhost:8000/api/search-task` // Search API endpoint
    //       : `http://localhost:8000/api/task-list?page=${page}`; // Default task list
  
    //     const payload = searchQuery ? { title: searchQuery } : null;
  
    //     const request = searchQuery
    //       ? axios.post(url, payload)
    //       : axios.get(url);
  
    //     request
    //       .then((response) => {
    //         const data = response.data.data || [];
    //         setTasks(data.data || data); // Adjust for pagination or flat list
    //         setTotalPages(data.last_page || 1);
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching tasks:", error);
    //       })
    //       .finally(() => {
    //         setLoading(false);
    //       });
    //   };
  
    //   fetchTasks();
    // }, [page, searchQuery]);

    // USING FILTER API

    // useEffect(() => {
    //   const fetchTasks = () => {
    //     setLoading(true);
    //     const url = `http://localhost:8000/api/find-filtered-tasks`;
  
    //     // Combine searchQuery and filters into a single payload
    //     const payload = {
    //       title: searchQuery || null,
    //       priority: filters.priority.length > 0 ? filters.priority : null,
    //       status: filters.status.length > 0 ? filters.status : null,
    //       page,
    //     };
  
    //     axios
    //       .post(url, payload)
    //       .then((response) => {
    //         const data = response.data.data || [];
    //         setTasks(data.data || data); // Handle paginated or flat data
    //         setTotalPages(data.last_page || 1);
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching filtered tasks:", error);
    //       })
    //       .finally(() => {
    //         setLoading(false);
    //       });
    //   };
  
    //   fetchTasks();
    // }, [page, searchQuery, filters]);

    // USING FILTER + SEARCH API

    useEffect(() => {
      const fetchTasks = () => {
        setLoading(true);
  
        // Determine which API to use based on `searchQuery`
        const isSearchQuery = searchQuery && searchQuery.trim() !== "";
  
        // Configure the API URL and payload
        const url = isSearchQuery
          ? `http://localhost:8000/api/search-task`
          : `http://localhost:8000/api/find-filtered-tasks`;
  
        const payload = isSearchQuery
          ? { title: searchQuery }
          : {
              priority: filters.priority.length > 0 ? filters.priority : null,
              status: filters.status.length > 0 ? filters.status : null,
              page,
            };
  
        const token = localStorage.getItem('authToken');

        axios
          .post(url, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            const data = response.data.data || [];
            if (isSearchQuery) {
              setTasks(data); 
              setTotalPages(1); 
            } else {
              setTasks(data.data || data); 
              setTotalPages(data.last_page || 1);
            }
          })
          .catch((error) => {
            console.error("Error fetching tasks:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      };
  
      fetchTasks();
      getAssignedTasksList();
    }, [page, searchQuery, filters]);
  
    const handlePageChange = (event, value) => {
      setPage(value);
    };

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

    const handleOpen = (taskId) => {
      setSelectedTaskId(taskId);
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      setSelectedTaskId(null);
    };

    const handleConfirmDelete = () => {
      if (!selectedTaskId) return;

      const token = localStorage.getItem('authToken');
    
      axios.post(`http://localhost:8000/api/delete-task/${selectedTaskId}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
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

    const handleAssignModalOpen = (taskId) => {
      setCurrentTaskId(taskId);
      setAssignModalOpen(true);
    };

    const handleAssignModalClose = () => {
      setAssignModalOpen(false);
      setCurrentTaskId(null);
    };   

    return (
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
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Deadline
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Status
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
                {tasks.map((task, index) => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <Typography variant="h6">
                                {index + 1 + (page - 1) * perPage} {/* Add 1 to the zero-based index */}
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
                                    {task.title}
                                  </Typography>
                                  <Typography
                                    color="textSecondary"
                                    sx={{
                                      fontSize: "13px",
                                    }}
                                  >
                                    #{task.id}
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
                                    task.priority === "High"
                                    ? "error.main" // Red for "High"
                                    : task.priority === "Low"
                                    ? "success.main" // Green for "Low"
                                    : "", // Default color
                                  color: "#fff",
                                }}
                                size="small"
                                label={task.priority}
                              ></Chip>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6">
                                {task.deadline
                                    ? new Date(task.deadline).toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                        })
                                    : "N/A"
                                }
                              </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    sx={{
                                    pl: "4px",
                                    pr: "4px",
                                    backgroundColor:
                                        task.status === "Complete"
                                        ? "primary.main" // Blue 
                                        : task.status === "In Progress"
                                        ? "success.main" // Green 
                                        : "error.main", // Red for Pending
                                    color: "#fff",
                                    }}
                                    size="small"
                                    label={task.status}
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
                                          onClick={() => navigate(`/task/show-task/${task.id}`)}
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
                                          onClick={() => navigate(`/task/update-task/${task.id}`)}
                                        >
                                          Update
                                </Button>
                                {/* <Button
                                          variant={
                                            assignedTasksList.some((assignedTask) => assignedTask.task_id === task.id)
                                              ? "contained"
                                              : "outlined"
                                          }
                                          color={
                                            task.status === "Complete"
                                              ? "grey"  // Grey color when the status is Complete
                                              : "success"
                                          }
                                          sx={{
                                            mr: 1,
                                            mb: {
                                              xs: 1,
                                              sm: 0,
                                              lg: 0,
                                            },
                                            ...(task.status === "Complete" && { color: "grey", borderColor: "grey" }),
                                          }}
                                    onClick={() =>
                                      task.status === "Complete" || assignedTasksList.some((assignedTask) => assignedTask.task_id === task.id)
                                        ? null 
                                        : handleAssignModalOpen(task.id)
                                    }
                                  >
                                    {assignedTasksList.some((assignedTask) => assignedTask.task_id === task.id)
                                      ? "Assigned"
                                      : "Assign"
                                    }
                                </Button> */}
                                <Button
                                  variant={
                                    assignedTasksList.some((assignedTask) => assignedTask.task_id === task.id)
                                      ? "contained"
                                      : "outlined"
                                  }
                                  sx={{
                                    mr: 1,
                                    mb: {
                                      xs: 1,
                                      sm: 0,
                                      lg: 0,
                                    },
                                    ...(task.status === "Complete" && {
                                      // backgroundColor: "grey",  // Grey background for Complete status
                                      borderColor: "grey",  // Grey border for Complete status
                                      color: "white",  // White text color for visibility
                                    }),
                                  }}
                                  onClick={() =>
                                    task.status === "Complete" || assignedTasksList.some((assignedTask) => assignedTask.task_id === task.id)
                                      ? null  // Disable the onClick if the task is complete or already assigned
                                      : handleAssignModalOpen(task.id)
                                  }
                                  disabled={task.status === "Complete"} // Disable the button if task status is Complete
                                >
                                  {assignedTasksList.some((assignedTask) => assignedTask.task_id === task.id)
                                    ? "Assigned"
                                    : "Assign"
                                  }
                                </Button>


                                {permission.includes("delete tasks") && (
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
                                            onClick={() => handleOpen(task.id)}
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
        {/* Toast Container */}
        <ToastContainer position="top-right" autoClose={3000} />
        {!searchQuery && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
      )}

      <AssignTaskModal
        open={assignModalOpen}
        onClose={handleAssignModalClose}
        taskId={currentTaskId}
        // onTaskAssigned={handleTaskAssigned}
      />
      </>
    );
};

export default TaskListTable;