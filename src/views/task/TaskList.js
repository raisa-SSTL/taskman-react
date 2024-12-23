import React, { useState } from "react";

import { Card, CardContent, Box, Typography, Button, Fab, TextField, Menu, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import TaskListTable from "./TaskListTable";
import { useNavigate } from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';

const TaskList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    priority: [],
    status: [],
  });

  const handleButtonClick = () => {
    navigate("/task/add-task");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Optionally, trigger a search/filter function here
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleCheckboxChange = (key, value) => {
    setSelectedFilters((prev) => {
      const updatedCategory = prev[key].includes(value)
        ? prev[key].filter((item) => item !== value) // Remove if already selected
        : [...prev[key], value]; // Add if not selected
      return { ...prev, [key]: updatedCategory };
    });
  };

    return (
        <Box>
          <Card variant="outlined">
            <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center", 
                mb: 2, 
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
                {/* Filter Button */}
                <Button
                  startIcon={<FilterListIcon />}
                  onClick={handleFilterClick}
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Filters
                </Button>
                <Menu
                  anchorEl={filterAnchorEl}
                  open={Boolean(filterAnchorEl)}
                  onClose={handleFilterClose}
                  sx={{ p: 2 }}
                >
                  {/* Priority Filters */}
                  <Typography sx={{ px: 2, py: 1 }}>Priority</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedFilters.priority.includes("High")}
                        onChange={() => handleCheckboxChange("priority", "High")}
                        color="primary"
                        sx={{ pl: 3}}
                      />
                    }
                    label="High"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedFilters.priority.includes("Low")}
                        onChange={() => handleCheckboxChange("priority", "Low")}
                        color="primary"
                      />
                    }
                    label="Low"
                  />

                  {/* Status Filters */}
                  <Typography sx={{ px: 2, py: 1 }}>Status</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedFilters.status.includes("Pending")}
                        onChange={() => handleCheckboxChange("status", "Pending")}
                        color="primary"
                        sx={{ pl: 3}}
                      />
                    }
                    label="Pending"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedFilters.status.includes("In Progress")}
                        onChange={() => handleCheckboxChange("status", "In Progress")}
                        color="primary"
                      />
                    }
                    label="In Progress"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedFilters.status.includes("Complete")}
                        onChange={() => handleCheckboxChange("status", "Complete")}
                        color="primary"
                      />
                    }
                    label="Complete"
                  />
                </Menu>


              {/* Search Bar */}
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
                <TaskListTable searchQuery={searchQuery} filters={selectedFilters}/>
              </Box>
            </CardContent>
          </Card>
        </Box>
    );
};

export default TaskList;