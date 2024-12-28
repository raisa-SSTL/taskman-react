import React, { useState } from "react";
import { Card, CardContent, Box, Typography, Button, Fab, TextField, Menu, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleRegister = () => {
        const { password, confirmPassword, agreeToTerms } = formData;
      
        if (password !== confirmPassword) {
          toast.error("Passwords do not match!", {
            position: "top-right",
          });
          return;
        }
      
        if (!agreeToTerms) {
          toast.error("You must agree to the Terms and Conditions.", {
            position: "top-right",
          });
          return;
        }
      
        axios
          .post("http://localhost:8000/api/register", {
            ...formData,
            password_confirmation: formData.confirmPassword, // Map confirmPassword to password_confirmation
          })
          .then((response) => {
            toast.success("Registration successful! Redirecting to login...", {
              position: "top-right",
            });
      
            console.log("API Response:", response.data);
      
            // Optionally, redirect to login after a successful registration
            setTimeout(() => {
              window.location.href = "/login";
            }, 3000);
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              const errorMessage = error.response.data.message || "Registration failed!";
              toast.error(errorMessage, { position: "top-right" });
      
              if (error.response.data.errors) {
                const fieldErrors = Object.values(error.response.data.errors).flat();
                fieldErrors.forEach((err) =>
                  toast.error(err, { position: "top-right" })
                );
              }
            } else {
              toast.error("An error occurred. Please try again.", {
                position: "top-right",
              });
            }
      
            console.error("Registration Error:", error);
          });
    };
      

  return (
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
            Register
          </Typography>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Full Name"
              type="text"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
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
            <TextField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                />
              }
              label="I agree to the Terms and Conditions"
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleRegister}
            >
              Register
            </Button>
          </Box>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography variant="body2">
              Already have an account? <a href="/login">Login</a>
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <ToastContainer />
    </Box>
  );
};

export default Register;