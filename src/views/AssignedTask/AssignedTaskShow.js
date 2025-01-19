import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import axios from 'axios';
import AssignedTaskShowPage from './AssignedTaskShowPage';

import { Card, CardContent, Box, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AssignedTaskShow = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const handleButtonClick = () => {
        navigate("/assigned-tasks");
    };

    const {assignedTaskDetail, getAssignedTaskDetails} = useContext(GlobalContext);

    useEffect(() => {
        if(id){
            getAssignedTaskDetails(id);
        }
    }, [id])

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center", // Ensure vertical alignment
                        mb: 2, // Add some margin below
                    }}
                    >
                        <Typography variant="h3">Assigned Task Details</Typography>
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
                                                                  onClick={handleButtonClick}
                                                                >
                                                                  Back
                        </Button>
                    </Box>
                    <Box
                        sx={{
                        overflow: {
                            xs: "auto",
                            sm: "unset",
                        },
                        }}
                    >
                        <AssignedTaskShowPage
                            taskId={id}
                            assignedTaskDetail={assignedTaskDetail}
                        />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AssignedTaskShow;