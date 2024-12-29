import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Card, CardContent, Box, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShowTaskPage from './ShowTaskPage';

const ShowTask = () => {

    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Authorization token is missing.");
          setLoading(false);
          return;
        }

        // Fetch task details using the ID
        axios
          .get(`http://localhost:8000/api/show-task-details/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          })
          .then((response) => {
            setTask(response.data.data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
    }, [id]);

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
    
    
    const handleButtonClick = () => {
        navigate("/task/task-list");
    };

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
              <Typography variant="h3">Task Details</Typography>
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
                <ShowTaskPage 
                    taskData={task}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
    );
};

export default ShowTask;