import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Box, Typography, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShowEmployeePage from './ShowEmployeePage'

const ShowEmployee = () => {

    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/employee/employee-list");
    };

    useEffect(() => {

        const token = localStorage.getItem("authToken");

        if (!token) {
          setError("Authorization token is missing.");
          setLoading(false);
          return;
        }

        // Fetch task details using the ID
        axios
          .get(`http://localhost:8000/api/show-employee-details/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          })
          .then((response) => {
            setEmployee(response.data.data);
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
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh', // Full height for centering
              }}
          >
              <CircularProgress />
          </Box>
      );
    }

    return(
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
                      <Typography variant="h3">Employee Details</Typography>
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
                        <ShowEmployeePage empData={employee}/>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ShowEmployee;