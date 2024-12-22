import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  Button
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

const TaskListTable = () => {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the API
        axios
          .get("http://localhost:8000/api/task-list") // Replace with your API endpoint
          .then((response) => {
            setTasks(response.data.data); // Assuming the tasks are in the `data` field
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching tasks:", error);
            setLoading(false);
          });
    }, []); 
    
    // useEffect(() => {
    //   getTaskList();
    // }, []);

    // const getTaskList = () => {

    //   setLoading(true);

    //   axios
    //     .get("http://localhost:8000/api/task-list")
    //     .then((response) => {
    //       setTasks(response.data.data);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching tasks:", error);
    //       setLoading(false);
    //     });
    // };

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

    return (
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
                                //   backgroundColor: product.pbg,
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
    );

};

export default TaskListTable;