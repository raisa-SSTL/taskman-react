import React, { useState, useContext } from "react";
import { Card, CardContent, Box, Typography, Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [error, setError] = useState(null); // For displaying error messages
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleLogin = () => {
        const { email, password } = formData;

        // Validate input before making the API call
        if (!email || !password) {
            // setError("Email and password are required.");
            toast.error("Email and password are required!", {
                position: "top-right",
                autoClose: 3000, // Closes after 3 seconds
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        // Call the API
        fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Invalid credentials");
                }
                return response.json();
            })
            .then((data) => {
                const { access_token, expires_in, user } = data;
                // Calculate token expiration time and save it
                const expirationTime = Date.now() + expires_in * 1000; // Convert seconds to milliseconds
                localStorage.setItem("authToken", access_token);
                localStorage.setItem("userData", JSON.stringify(user));
                localStorage.setItem("tokenExpiration", expirationTime);
                login(access_token, user); // Call login from context
                toast.success("Login successful!", {
                    position: "top-right",
                    autoClose: 3000,
                });
            })
            .catch((error) => {
                // setError(error.message); // Display the error
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 3000,
                });
            });
    };

    return(
        <>
            <ToastContainer />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#f5f5f5",
                }}
                >
                <Card sx={{ width: 400, padding: 3, boxShadow: 3 }}>
                    <CardContent>
                    <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2 }}>
                        Login
                    </Typography>
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                        label="Email Address"
                        type="email"
                        name="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        />
                        <TextField
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth
                        value={formData.password}
                        onChange={handleChange}
                        />
                        <FormControlLabel
                        control={
                            <Checkbox
                            checked={formData.rememberMe}
                            name="rememberMe"
                            onChange={handleChange}
                            />
                        }
                        label="Remember Me"
                        />
                        <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={handleLogin}
                        >
                        Login
                        </Button>
                    </Box>
                    {/* <Box sx={{ textAlign: "center", marginTop: 2 }}>
                        <Typography variant="body2">
                        Don't have an account? <a href="/register">Sign up</a>
                        </Typography>
                    </Box> */}
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default Login;