import React, { useState } from "react";
import { Card, CardContent, Box, Typography, Button, Fab, TextField, Menu, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleRegister = () => {
    if (password !== confirmPassword) {
        toast.error("Passwords do not match!", {
          position: "top-right",
        });
        return;
      }
      toast.success("Registration successful!", {
        position: "top-right",
      });
      console.log("Register clicked", { name, email, password, agreeToTerms });
      // Add your registration logic here
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
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
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
              disabled={!agreeToTerms}
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