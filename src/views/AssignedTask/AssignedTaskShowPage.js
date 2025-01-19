import React, {useContext, useEffect, useState} from "react";
import {
    Typography,
    Box,
    Button,
    CircularProgress
} from "@mui/material";
import { format } from 'date-fns';

const AssignedTaskShowPage = ({taskId, assignedTaskDetail}) => {

    console.log('deets', assignedTaskDetail);

        return (
            <Box>
                        <Typography sx={{ mb: 1 }}>
                                <strong>ID:</strong> {taskId || "N/A"}
                            </Typography>
                            <Typography sx={{ mb: 1 }}>
                                <strong>Title:</strong> {assignedTaskDetail?.task?.title}
                            </Typography>
                            <Typography sx={{ mb: 1 }}>
                                <strong>Description:</strong> {assignedTaskDetail?.task?.description || 'No description provided'}
                            </Typography>
                            <Typography sx={{ mb: 1 }}>
                                <strong>Priority:</strong> {assignedTaskDetail?.task?.priority || 'No priority set'}
                            </Typography>
                            <Typography sx={{ mb: 1 }}>
                                <strong>Deadline: </strong> 
                                    {assignedTaskDetail?.task?.deadline 
                                        ? format(new Date(assignedTaskDetail.task.deadline), 'MMMM dd, yyyy') 
                                        : "No deadline set"
                                    }
                            </Typography>
                            <Typography sx={{ mb: 1 }}>
                                <strong>Status:</strong> {assignedTaskDetail?.task?.status || 'No status defined'}
                            </Typography>
                            <Typography sx={{ mb: 1 }}>
                                <strong>Start Date: </strong> 
                                    {assignedTaskDetail?.task?.start_date 
                                        ? format(new Date(assignedTaskDetail.task.start_date), 'MMMM dd, yyyy') 
                                        : "No start date set"
                                    }
                            </Typography>
                            <Typography sx={{ mb: 1 }}>
                                <strong>End Date: </strong> 
                                    {assignedTaskDetail?.task?.end_date 
                                        ? format(new Date(assignedTaskDetail.task.end_date), 'MMMM dd, yyyy') 
                                        : "No end date set"
                                    }
                            </Typography>
            </Box>
    );

};

export default AssignedTaskShowPage;