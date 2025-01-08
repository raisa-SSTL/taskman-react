import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    RadioGroup,
    Radio,
    FormControl,
    MenuItem,
  } from "@mui/material";

  const UpdateEmployeeForm = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { employee, fetchEmployee } = useContext(GlobalContext);
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });

    const handleBackButtonClick = () => {
        navigate("/employee/employee-list");
    };

    useEffect(() => {
        if (!id) {
          setError("Employee ID is missing.");
          return;
        }
      
        fetchEmployee(id)
          .then((data) => {
            console.log("Employee fetched successfully:", data);
            setFormData({
                name: data.name || "",
                email: data.email || "",
                phone: data.phone || "",
                password: "",
            });
          })
          .catch((err) => {
            console.error("Failed to fetch employee data:", err.message);
          });
    }, [id]);
      
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");
        axios
          .post(`http://localhost:8000/api/update-employee/${id}`, formData,
            {
                headers: {
                  Authorization: `Bearer ${token}`, // Include the token
                  "Content-Type": "application/json", // Optional, defaults to JSON
                },
              }
          )
          .then((response) => {
            setSuccess("Employee updated successfully!");
            navigate("/employee/employee-list");
          })
          .catch((err) => {
            setError(err.response?.data?.message || "Failed to update employee.");
          });
    };

    return(
        <div>
            <Card
                            variant="outlined"
                            sx={{
                            p: 0,
                            }}
                
            >
                <Box
                                sx={{
                                    padding: "15px 30px",
                                }}
                                display="flex"
                                alignItems="center"
                >
                    <Box flexGrow={1} 
                                            sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 2, 
                                        }}
                    >
                        <Typography
                                            sx={{
                                                fontSize: "18px",
                                                fontWeight: "500",
                                            }}
                        >
                                            Update Employee
                        </Typography>
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
                                                            onClick={handleBackButtonClick}
                                                            >
                                                            Back
                        </Button>                        
                    </Box>
                </Box>
                <Divider />
                <CardContent
                                sx={{
                                    padding: "30px",
                                }}
                >
                    {employee && (
                    <form onSubmit={handleSubmit}>
                        <TextField
                                            id="name"
                                            label="Name"
                                            variant="outlined"
                                            value={formData.name}
                                            onChange={handleChange}
                                            defaultValue=""
                                            fullWidth
                                            sx={{
                                                mb: 2,
                                            }}
                        />
                        <Grid
                                            container
                                            spacing={2}
                                            sx={{
                                                // mb: 2,
                                            }}
                        >
                            <Grid item lg={6} md={6} sm={12}>
                                <TextField
                                                            fullWidth
                                                            id="email"
                                                            variant="outlined"
                                                            label="Email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            sx={{
                                                            mb: 2, 
                                                            }}
                                >
                                </TextField>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12}>
                                <TextField
                                                                fullWidth
                                                                id="password"
                                                                variant="outlined"
                                                                label="Password"
                                                                value={formData.password}
                                                                onChange={handleChange}
                                                                sx={{
                                                                mb: 2, 
                                                                }}
                                >
                                </TextField>                                
                            </Grid>
                        </Grid>
                        <Grid
                                            container
                                            spacing={2}
                                            sx={{
                                                mb: 2,
                                            }}
                        >
                            <Grid item lg={6} md={6} sm={12}>
                                <TextField
                                                                fullWidth
                                                                id="phone"
                                                                variant="outlined"
                                                                label="Phone"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                sx={{
                                                                mb: 2, 
                                                                }}
                                >
                                </TextField>                                
                            </Grid>                            
                        </Grid>
                        <div>
                                            <Button color="primary" variant="contained" type="submit">
                                                Update
                                            </Button>
                        </div>

                    </form>
                    )}
                    {error && <Typography color="error">{error}</Typography>}
                    {success && <Typography color="success">{success}</Typography>}
                </CardContent>
            </Card>
        </div>
    );

  };

  export default UpdateEmployeeForm;