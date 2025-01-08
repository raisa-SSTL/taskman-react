import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate("/employee/employee-list");
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
                    {/* <form onSubmit={handleSubmit}> */}
                    <form>
                        <TextField
                                            id="name"
                                            label="Name"
                                            variant="outlined"
                                            // value={name}
                                            // onChange={(e) => setTitle(e.target.value)}
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
                                                            // value={priority}
                                                            // onChange={handlePriorityChange}
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
                                                                // value={priority}
                                                                // onChange={handlePriorityChange}
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
                                                                // value={priority}
                                                                // onChange={handlePriorityChange}
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

                </CardContent>
            </Card>
        </div>
    );

  };

  export default UpdateEmployeeForm;