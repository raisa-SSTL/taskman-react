import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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

const products = [
    {
        id: "1",
        name: "Sunil Joshi",
        post: "Web Designer",
        pname: "Elite Admin",
        priority: "Low",
        pbg: "primary.main",
        budget: "3.9",
      },
];

const TaskListTable = ({ searchQuery }) => {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

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

    useEffect(() => {
      const fetchTasks = () => {
        setLoading(true);
        const url = searchQuery
          ? `http://localhost:8000/api/search-task` // Search API endpoint
          : `http://localhost:8000/api/task-list?page=${page}`; // Default task list
  
        const payload = searchQuery ? { title: searchQuery } : null;
  
        const request = searchQuery
          ? axios.post(url, payload)
          : axios.get(url);
  
        request
          .then((response) => {
            const data = response.data.data || [];
            setTasks(data.data || data); // Adjust for pagination or flat list
            setTotalPages(data.last_page || 1);
          })
          .catch((error) => {
            console.error("Error fetching tasks:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      };
  
      fetchTasks();
    }, [page, searchQuery]);
  

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
                        {/* <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Id
                            </Typography>
                        </TableCell> */}
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Title
                            </Typography>
                        </TableCell>
                        {/* <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Description
                            </Typography>
                        </TableCell> */}
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
                        {/* <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Start Date
                            </Typography>
                        </TableCell> */}
                        {/* <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                End Date
                            </Typography>
                        </TableCell> */}
                        <TableCell align="right">
                            <Typography color="textSecondary" variant="h6">
                                Actions
                            </Typography>
                        </TableCell>
                    </TableRow>
            </TableHead>
            <TableBody>
                {tasks.map((task) => (
                          <TableRow key={task.id}>
                            {/* <TableCell>
                              <Typography
                                sx={{
                                  fontSize: "15px",
                                  fontWeight: "500",
                                }}
                              >
                                {task.id}
                              </Typography>
                            </TableCell> */}
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
                            {/* <TableCell>
                              <Typography color="textSecondary" variant="h6">
                                {task.description}
                              </Typography>
                            </TableCell> */}
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
                                          onClick={() => handleOpen(task.id)}
                                        >
                                          Delete
                                </Button>
                            </TableCell>
                            {/* <TableCell align="left">
                              <Typography variant="h6">${product.budget}k</Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6">${product.budget}k</Typography>
                            </TableCell> */}                          
                          </TableRow>
                ))}
            </TableBody>
        </Table>
        {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box> */}
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
        <ToastContainer position="bottom-center" autoClose={3000} />
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
      </>
    );
};

export default TaskListTable;