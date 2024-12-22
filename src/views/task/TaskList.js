import React, { useState } from "react";

import { Card, CardContent, Box, Typography, Button, Fab, TextField } from "@mui/material";
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import TaskListTable from "./TaskListTable";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleButtonClick = () => {
    navigate("/task/add-task");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Optionally, trigger a search/filter function here
  };

    return (
        <Box>
          <Card variant="outlined">
            <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center", // Ensure vertical alignment
                mb: 2, // Add some margin below
              }}
            >
              <Typography variant="h3">Task List</Typography>
              <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2, // Adds spacing between the search bar and the Fab icon
              }}
              >
                <TextField
                variant="outlined"
                size="small"
                placeholder="Search Tasks..."
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  width: "250px", // Set the width of the search bar
                }}
                />
                <Fab
                    color="secondary"
                    // sx={{
                    //   mr: 1,
                    //   mb: {
                    //     xs: 1,
                    //     sm: 0,
                    //     lg: 0,
                    //   },
                    // }}
                    onClick={handleButtonClick}
                  >
                    <AddToPhotosOutlinedIcon />
                </Fab>
              </Box>
            </Box>
              <Box
                sx={{
                  overflow: {
                    xs: "auto",
                    sm: "unset",
                  },
                }}
              >
                <TaskListTable searchQuery={searchQuery}/>
              </Box>
            </CardContent>
          </Card>
        </Box>
    );
};

export default TaskList;