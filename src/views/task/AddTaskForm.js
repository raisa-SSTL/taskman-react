import React, { useState } from "react";
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
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [value, setValue] = React.useState("");

  const handleChange2 = (event) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form data to send to the API
    const taskData = {
      title,
      description,
    };

    // Make an API call using axios with .then() and .catch()
    axios
      .post("http://localhost:8000/api/task", taskData)
      .then((response) => {
        console.log("Task created successfully:", response.data);
        setMessage("Task created successfully!");
        setTitle(""); // Reset title input
        setDescription(""); // Reset description input
      })
      .catch((error) => {
        console.error("Error creating task:", error);
        setMessage("Failed to create task. Please try again.");
      });
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
          <Box flexGrow={1}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Create New Task
            </Typography>
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
              label="Priority"
              value={priority}
              onChange={handleChange4}
              sx={{
                mb: 2,
              }}
            >
                {priorities.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField> */}
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
