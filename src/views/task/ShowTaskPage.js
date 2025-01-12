import React, {useContext, useEffect} from "react";

import {
    Typography,
    Box,
    Button
} from "@mui/material";

import { GlobalContext } from "../../context/GlobalContext";
  
  const ShowTaskPage = ({taskData}) => {

    const {assignedTasksList, getAssignedTasksList} = useContext(GlobalContext);

    useEffect(() => {
        getAssignedTasksList();
    }, [])

    const assignedTask = assignedTasksList.find((task) => task.task_id === taskData?.id);

    return (
        <Box>
            {/* <Typography variant="h5" sx={{ mb: 2 }}>
                Task Details
            </Typography> */}
            <Typography sx={{ mb: 1 }}>
                <strong>ID:</strong> {taskData?.id}
            </Typography>
            <Typography sx={{ mb: 1 }}>
                <strong>Title:</strong> {taskData?.title}
            </Typography>
            <Typography sx={{ mb: 1 }}>
                <strong>Description:</strong> {taskData?.description || "No description provided"}
            </Typography>
            <Typography sx={{ mb: 1 }}>
                <strong>Priority:</strong> {taskData?.priority || "Not specified"}
            </Typography>
            <Typography sx={{ mb: 1 }}>
                <strong>Deadline:</strong> {taskData?.deadline || "No deadline set"}
            </Typography>
            <Typography sx={{ mb: 1 }}>
                <strong>Status:</strong> {taskData?.status || "No status set"}
            </Typography>
            <Typography sx={{ mb: 1 }}>
                <strong>Start Date:</strong> {taskData?.start_date || "Not specified"}
            </Typography>
            <Typography sx={{ mb: 1 }}>
                <strong>End Date:</strong> {taskData?.end_date || "Not specified"}
            </Typography>
            {assignedTask?.employee && 
                <Typography sx={{ mb: 1 }}>
                    <strong>Assigned To:</strong> {assignedTask.employee.name}
                </Typography>
            }
        </Box>
    );

  };

  export default ShowTaskPage;