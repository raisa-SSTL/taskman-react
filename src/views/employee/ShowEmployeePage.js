import React, { useEffect, useState, useContext } from "react";

import {
    Typography,
    Box,
    Button
  } from "@mui/material";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";

  const ShowEmployeePage = ({empData, empId}) => {

    // const {getAssignedTasksList, assignedTasksList} = useContext(GlobalContext);
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {headers} = useContext(GlobalContext);

    useEffect(() => {
        // getAssignedTasksList();
        const fetchAssignedTasks = async () => {
            setLoading(true);
            setError(null);
            try {
              const response = await axios.get(
                `http://localhost:8000/api/employee-wise-assigned-task-list2/${empId}`,
                { headers}
              );
              const { assigned_task_list } = response.data;
      
              // Filter tasks with status not "complete"
              const filteredTasks = assigned_task_list.filter(
                (task) => task.task_details.status !== "Complete"
              );
              setAssignedTasks(filteredTasks);
            } catch (err) {
              setError(err.response?.data?.message || "Failed to fetch tasks");
            } finally {
              setLoading(false);
            }
          };
      
          if (empId) fetchAssignedTasks();
    }, [empId]);

    return(
        <Box>
                    <Typography sx={{ mb: 1 }}>
                        <strong>ID:</strong> {empData?.id}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Name:</strong> {empData?.name}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Email:</strong> {empData?.email || "No email provided"}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Phone:</strong> {empData?.phone || "No email provided"}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Assigned Tasks:</strong>{" "}
                        {/* {assignedTasksList
                            ?.filter((task) => task.employee.id === empData?.id)
                            .map((task) => task.task.title)
                            .join(", ") || "No tasks assigned"} */}
                            {loading ? (
                                "Loading..."
                                ) : error ? (
                                <span style={{ color: "red" }}>{error}</span>
                                ) : assignedTasks.length > 0 ? (
                                assignedTasks.map((task) => task.task_details.title).join(", ")
                                ) : (
                                "No tasks assigned"
                            )}
                    </Typography>
        </Box>

    );
  };

  export default ShowEmployeePage;