import React, { useState } from "react";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useNavigate } from "react-router-dom";

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

const numbers = [
  {
    value: "one",
    label: "One",
  },
  {
    value: "two",
    label: "Two",
  },
  {
    value: "three",
    label: "Three",
  },
  {
    value: "four",
    label: "Four",
  },
];

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

const AddTaskForm = () => {

  const navigate = useNavigate();

  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [value, setValue] = React.useState("");

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const [number, setNumber] = React.useState("");

  const handleChange3 = (event) => {
    setNumber(event.target.value);
  };

  const [priority, setPriority] = React.useState("");

  const handleChange4 = (event) => {
    setPriority(event.target.value);
  };

  //--------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form data to send to the API
    const taskData = {
      title,
      description,
      priority,
      deadline: deadline ? deadline.toISOString().split("T")[0] : null,
      start_date: startDate ? startDate.toISOString().split("T")[0] : null,
      end_date: endDate ? endDate.toISOString().split("T")[0] : null,
      status: value,
    };

    // Make an API call using axios with .then() and .catch()
    axios
      .post("http://localhost:8000/api/task", taskData)
      .then((response) => {
        console.log("Task created successfully:", response.data);
        setMessage("Task created successfully!");
        setTitle(""); // Reset title input
        setDescription(""); // Reset description input
        setPriority("");
        setDeadline(null);
        setStartDate(null);
        setEndDate(null);
        setValue("");
      })
      .catch((error) => {
        console.error("Error creating task:", error);
        setMessage("Failed to create task. Please try again.");
      });
  };

  const handleButtonClick = () => {
    navigate("/task/task-list");
};

  return (
    <div>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Checkbox */}
      {/* ------------------------------------------------------------------------------------------------ */}
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
              Create New Task
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
            {/* <TextField
              id="email-text"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            /> */}
            {/* <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            /> */}
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
            {/* <TextField
              id="readonly-text"
              label="Read Only"
              defaultValue="Hello World"
              inputprops={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
              }}
            /> */}
            {/* <TextField
                  fullWidth
                  id="standard-select-number"
                  variant="outlined"
                  select
                  label="Select Priority"
                  value={priority}
                  onChange={handleChange4}
                  sx={{
                    mb: 2, // Ensures no extra margin within the grid item
                  }}
                >
                  {priorities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
            </TextField> */}
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
                    onChange={handleChange4}
                    sx={{
                      mb: 2, // Ensures no extra margin within the grid item
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
                    // <TextField
                    //   fullWidth
                    //   variant="outlined"
                    //   label="Select Deadline"
                    // />
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
                      // fullWidth
                      // variant="outlined"
                      // label="Select Start Date"
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
                      // fullWidth
                      // variant="outlined"
                      // label="Select End Date"
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
                    value={value}
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

            {/* <Grid
              container
              spacing={0}
              sx={{
                mb: 2,
              }}
            >
              <Grid item lg={4} md={6} sm={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label="Check this custom checkbox"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  }
                  label="Check this custom checkbox"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedC}
                      onChange={handleChange}
                      name="checkedC"
                      color="primary"
                    />
                  }
                  label="Check this custom checkbox"
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12}>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleChange2}
                  >
                    <FormControlLabel
                      value="radio1"
                      control={<Radio />}
                      label="Toggle this custom radio"
                    />
                    <FormControlLabel
                      value="radio2"
                      control={<Radio />}
                      label="Toggle this custom radio"
                    />
                    <FormControlLabel
                      value="radio3"
                      control={<Radio />}
                      label="Toggle this custom radio"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid> */}
            {/* <TextField
              fullWidth
              id="standard-select-number"
              variant="outlined"
              select
              label="Select"
              value={number}
              onChange={handleChange3}
              sx={{
                mb: 2,
              }}
            >
              {numbers.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
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

export default AddTaskForm;
