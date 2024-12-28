import React, { useState } from "react";
import { Card, CardContent, Box, Typography, Button, TextField, FormControlLabel, Checkbox } from "@mui/material";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        console.log("Login clicked", { email, password, rememberMe });
        // Add your login logic here
    };

    return(
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
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
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
                <Box sx={{ textAlign: "center", marginTop: 2 }}>
                    <Typography variant="body2">
                    Don't have an account? <a href="/register">Sign up</a>
                    </Typography>
                </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;