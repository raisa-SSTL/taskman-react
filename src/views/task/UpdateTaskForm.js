import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
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

  const priorities = [
    {
      value: "High",
      label: "High",
    },
    {
      value: "Low",
      label: "Low",
    },
];

const UpdateTaskForm = () => {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("authToken");

        // Fetch task details using the ID
        axios
          .get(`http://localhost:8000/api/show-task-details/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
          })
          .then((response) => {
            const fetchedTask = response.data.data;
            setTask(fetchedTask);
            setTitle(fetchedTask?.title);
            setDescription(fetchedTask?.description);
            setPriority(fetchedTask?.priority);
            setDeadline(fetchedTask?.deadline ? new Date(fetchedTask.deadline) : null);
            setStartDate(fetchedTask?.start_date ? new Date(fetchedTask.start_date) : null);
            setEndDate(fetchedTask?.end_date ? new Date(fetchedTask.end_date) : null);
            setStatus(fetchedTask?.status);
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }, [id]);

    const [priority, setPriority] = React.useState("");
    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const [status, setStatus] = React.useState("");
    const handleRadioChange = (event) => {
        setStatus(event.target.value);
      };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [deadline, setDeadline] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem("authToken");

        if (!token) {
            console.error("No authorization token found");
            setMessage("Authorization failed. Please log in again.");
            return;
        }  
    
        // Form data to send to the API
        const taskData = {
          title,
          description,
          priority,
          deadline: deadline ? deadline.toISOString().split("T")[0] : null,
          start_date: startDate ? startDate.toISOString().split("T")[0] : null,
          end_date: endDate ? endDate.toISOString().split("T")[0] : null,
          status: status,
        };
    
        axios
          .post(`http://localhost:8000/api/update-task/${id}`, taskData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            console.log("Task updated successfully:", response.data);
            setMessage("Task updated successfully!");
          })
          .catch((error) => {
            console.error("Error creating task:", error);
            setMessage("Failed to update task. Please try again.");
          });
      };
    
      const handleButtonClick = () => {
        navigate("/task/task-list");
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
                    Update Task
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
                                                            onClick={handleButtonClick}
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
                <form onSubmit={handleSubmit}>
                    <TextField
                    id="task-title"
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue=""
                    fullWidth
                    sx={{
                        mb: 2,
                    }}
                    />                  
                    <TextField
                    id="task-description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    sx={{
                        mb: 2,
                    }}
                    />                  
                    <Grid
                    container
                    spacing={2}
                    sx={{
                        mb: 2,
                    }}
                    >
                    {/* Priority Field */}
                    <Grid item lg={6} md={6} sm={12}>
                        <TextField
                            fullWidth
                            id="standard-select-number"
                            variant="outlined"
                            select
                            label="Select Priority"
                            value={priority}
                            onChange={handlePriorityChange}
                            sx={{
                            mb: 2, 
                            }}
                        >
                            {priorities.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    {/* Deadline Field */}
                    <Grid item lg={2} md={6} sm={12}>
                        <ReactDatePicker
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a deadline"
                        customInput={
                            <TextField
                            fullWidth
                            variant="outlined"
                            label="Deadline"
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <CalendarTodayIcon />
                                </InputAdornment>
                                ),
                            }}
                            />
                        }
                        />
                    </Grid>

                    {/* Start Date Field */}
                    <Grid item lg={2} md={6} sm={12}>
                        <ReactDatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a deadline"
                        customInput={
                            <TextField
                            fullWidth
                            variant="outlined"
                            label="Start Date"
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <CalendarTodayIcon />
                                </InputAdornment>
                                ),
                            }}
                            />
                        }
                        />
                    </Grid>

                    {/* End Date Field */}
                    <Grid item lg={2} md={6} sm={12} fullWidth>
                        <ReactDatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a deadline"
                        customInput={
                            <TextField
                            variant="outlined"
                            label="End Date"
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <CalendarTodayIcon />
                                </InputAdornment>
                                ),
                            }}
                            />
                        }
                        />
                    </Grid>
                    </Grid>

                    <div>
                    <Typography
                        sx={{
                        fontSize: "18px",
                        fontWeight: "400",
                        }}
                    >
                        Status
                    </Typography>
                    </div>
                    <Grid item lg={4} md={6} sm={12} sx={{mb: 2}}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            aria-label="status"
                            name="status"
                            value={status}
                            onChange={handleRadioChange}
                        >
                        <FormControlLabel
                            value="Pending"
                            control={<Radio />}
                            label="Pending"
                        />
                        <FormControlLabel
                            value="In Progress"
                            control={<Radio />}
                            label="In Progress"
                        />
                        <FormControlLabel
                            value="Complete"
                            control={<Radio />}
                            label="Complete"
                        />
                        </RadioGroup>
                    </FormControl>
                    </Grid>                 
                    <div>
                    <Button color="primary" variant="contained" type="submit">
                        Submit
                    </Button>
                    </div>
                </form>
                {message && (
                    <Typography
                    sx={{
                        mt: 2,
                        color: message.includes("successfully") ? "green" : "red",
                    }}
                    >
                    {message}
                    </Typography>
                )}
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateTaskForm;