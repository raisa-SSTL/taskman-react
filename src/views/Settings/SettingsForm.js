import React, {useContext, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
import { AuthContext } from "../../context/AuthContext";
import { GlobalContext } from "../../context/GlobalContext";

const SettingsForm = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { authData } = useContext(AuthContext);
    const userPermissions = authData?.user?.permissions || [];
    const {getUserInfo, userInfo, headers} = useContext(GlobalContext);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [userData, setUserData] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
    });

    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
      // Populate form values when userInfo is updated
      setUserData({
        name: userInfo.name || "",
        email: userInfo.email || "",
        password: "", // Keep password empty by default
        phone: userInfo.phone || "", // Include phone only if present
      });
    }, [userInfo]);

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setUserData((prevValues) => ({
        ...prevValues,
        [id]: value,
      }));
    };

    const handleBackClick = () => {
        navigate("");
    };

    const handleFormSubmit = (e) => {
      e.preventDefault();
  
      axios
        .post(`http://localhost:8000/api/update-user/${authData.user.id}`, userData, {headers})
        .then((response) => {
          // Handle success
          setMessage(response.data.message);
          setError(""); // Clear any previous error messages
  
          // Refresh user info after update
          getUserInfo();
        })
        .catch((err) => {
          // Handle error
          setError(err.response?.data?.message || "An error occurred");
          setMessage(""); // Clear any previous success messages
        });
    };

    return (
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
                      <Box 
                        flexGrow={1}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center", // Ensure vertical alignment
                            mb: 2, // Add some margin below
                          }}
                      >
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: "500",
                          }}
                        >
                          Update Personal Information
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
                                                                            //   onClick={handleBackClick}
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
                        <form onSubmit={handleFormSubmit}>
                            <Grid
                                          container
                                          spacing={2}
                                          sx={{
                                            // mb: 2,
                                          }}
                            >
                                <Grid item lg={6} md={6} sm={12}>
                                    <TextField
                                          id="name"
                                          label="Name"
                                          variant="outlined"
                                          value={userData.name}
                                          onChange={handleInputChange}
                                          fullWidth
                                          sx={{
                                            mb: 2,
                                          }}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12}>
                                    <TextField
                                          id="email"
                                          label="Email Address"
                                          type="email"
                                          variant="outlined"
                                          value={userData.email}
                                          onChange={handleInputChange}
                                          fullWidth
                                          sx={{
                                            mb: 2,
                                          }}
                                    />
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
                                          id="password"
                                          label="New Password"
                                          type="password"
                                          variant="outlined"
                                          value={userData.password}
                                          onChange={handleInputChange}
                                          fullWidth
                                          sx={{
                                            mb: 2,
                                          }}
                                  />
                                </Grid>
                                {userPermissions.includes("access employee dashboard") && (
                                  <Grid item lg={6} md={6} sm={12}>
                                    <TextField
                                            id="phone"
                                            label="Phone Number"
                                            variant="outlined"
                                            value={userData.phone}
                                            onChange={handleInputChange}
                                            fullWidth
                                            sx={{
                                              mb: 2,
                                            }}
                                    />
                                  </Grid>
                                )}
                            </Grid>
                            {message && (
                              <Typography color="success" sx={{ mb: 2 }}>
                                {message}
                              </Typography>
                            )}
                            {error && (
                              <Typography color="error" sx={{ mb: 2 }}>
                                {error}
                              </Typography>
                            )}
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

export default SettingsForm;