import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from "../../context/GlobalContext";

import {
    Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Chip, CircularProgress, Button, Pagination, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";

const AssignedTaskListTable = () => {

    const {getEmployeeWiseAssignedTaskList, employeeWiseAssignedTasks} = useContext(GlobalContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     getEmployeeWiseAssignedTaskList();
    // }, [])

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching
        await getEmployeeWiseAssignedTaskList();
        setLoading(false); // Set loading to false after fetching
      };
  
      fetchData();
    }, []);

    return(
        <>
           {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px", // Adjust based on your layout
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
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
                    {employeeWiseAssignedTasks.map((task, index) => (
                        <TableRow key={task.id}>
                        <TableCell>
                            <Typography variant="body1">{index + 1}</Typography>
                        </TableCell>
                        <TableCell>
                            {/* <Typography variant="body1">{task.task_details.title}</Typography> */}
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
                                                                {task.task_details.title}
                                                              </Typography>
                                                              <Typography
                                                                color="textSecondary"
                                                                sx={{
                                                                  fontSize: "13px",
                                                                }}
                                                              >
                                                                #{task.task_details.id}
                                                              </Typography>
                                                            </Box>
                                                          </Box>
                        </TableCell>
                        <TableCell>
                            {/* <Typography variant="body1">{task.task_details.priority}</Typography> */}
                            <Chip
                                                            sx={{
                                                              pl: "4px",
                                                              pr: "4px",
                                                            backgroundColor:
                                                                task.task_details.priority === "High"
                                                                ? "error.main" // Red for "High"
                                                                : task.task_details.priority === "Low"
                                                                ? "success.main" // Green for "Low"
                                                                : "", // Default color
                                                              color: "#fff",
                                                            }}
                                                            size="small"
                                                            label={task.task_details.priority}
                            ></Chip>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1">
                            {task.task_details.deadline ? new Date(task.task_details.deadline).toLocaleDateString() : "N/A"}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            {/* <Chip
                            label={task.task_details.status}
                            color={task.task_details.status === "Complete" ? "success" : "warning"}
                            size="small"
                            /> */}
                            <Chip
                                                                sx={{
                                                                pl: "4px",
                                                                pr: "4px",
                                                                backgroundColor:
                                                                    task.task_details.status === "Complete"
                                                                    ? "primary.main" // Blue 
                                                                    : task.task_details.status === "In Progress"
                                                                    ? "success.main" // Green 
                                                                    : "error.main", // Red for Pending
                                                                color: "#fff",
                                                                }}
                                                                size="small"
                                                                label={task.task_details.status}
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
                                          onClick={() => navigate(`/assigned-tasks/show-assigned-task/${task.task_details.id}`)}
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
                                          onClick={() => navigate(`/assigned-tasks/update-assigned-task/${task.task_details.id}`)}
                                        >
                                          Update
                            </Button>                            
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            )}
        </>
    );

};

export default AssignedTaskListTable;

