import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import ReactDatePicker from "react-datepicker";
import { InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { Card, CardContent, Divider, Box, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, RadioGroup, Radio, FormControl, MenuItem,
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

const AssignedTaskUpdateForm = () => {

    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate("/assigned-tasks");
    };

    const { id } = useParams();
    console.log("id", id)
    const {assignedTaskDetail, getAssignedTaskDetails, headers} = useContext(GlobalContext);
    const [start_date, setStartDate] = useState(null);
    const [end_date, setEndDate] = useState(null);
    const [status, setStatus] = useState("");

    // useEffect(() => {
    //     if (id) {
    //       getAssignedTaskDetails(id).then(() => {
    //         setStartDate(new Date(assignedTaskDetail?.task?.start_date));
    //         setEndDate(new Date(assignedTaskDetail?.task?.end_date));
    //         setStatus(assignedTaskDetail?.task?.status || "");
    //       });
    //     }
    // }, [id, assignedTaskDetail]);
    useEffect(() => {
        if (id) {
          getAssignedTaskDetails(id)
            .then((details) => {
              console.log("Task details fetched:", details);
                setStartDate(details?.task?.start_date ? new Date(details.task.start_date) : null);
                setEndDate(details?.task?.end_date ? new Date(details.task.end_date) : null);
                setStatus(details?.task?.status || "");
                console.log("Details response:", details);
            })
            .catch((error) => {
              console.error("Failed to fetch assigned task details:", error);
            });
        }
    }, [id]);

    const handleRadioChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = {
          start_date: start_date?.toISOString().split("T")[0],
          end_date: end_date?.toISOString().split("T")[0],
          status,
        };
    
        axios
          .post(`http://localhost:8000/api/update-assigned-task/${id}`, data, {headers})
          .then((response) => {
            console.log("Task updated successfully:", response.data);
            navigate("/assigned-tasks");
          })
          .catch((error) => {
            console.error("Error updating task:", error.response?.data || error.message);
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
                                                Update Assigned Task
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
                        <form onSubmit={handleSubmit}>
                            <TextField
                            id="task-title"
                            label="Title"
                            variant="outlined"
                            value={assignedTaskDetail?.task?.title}
                            // onChange={(e) => setTitle(e.target.value)}
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
                            value={assignedTaskDetail?.task?.description}
                            // onChange={(e) => setDescription(e.target.value)}
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
                                    value={assignedTaskDetail?.task?.priority}
                                    // onChange={handlePriorityChange}
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
                                selected={assignedTaskDetail?.task?.deadline}
                                // onChange={(date) => setDeadline(date)}
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
                                selected={start_date || null}
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
                                selected={end_date || null}
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
                    </CardContent>
                </Card>
            </div>
    );
};

export default AssignedTaskUpdateForm;