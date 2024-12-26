import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

import CompletedTaskTable from "./CompletedTaskTable";

const TaskTableDashboard = () => {

    // const [age, setAge] = React.useState("10");
    
    // const handleChange = (event) => {
    //     setAge(event.target.value);
    // };

    const [selectedDate, setSelectedDate] = useState({ month: "", year: "" });

    const months = [
      { value: 1, label: "January" },
      { value: 2, label: "February" },
      { value: 3, label: "March" },
      { value: 4, label: "April" },
      { value: 5, label: "May" },
      { value: 6, label: "June" },
      { value: 7, label: "July" },
      { value: 8, label: "August" },
      { value: 9, label: "September" },
      { value: 10, label: "October" },
      { value: 11, label: "November" },
      { value: 12, label: "December" },
    ];
  
    const years = Array.from({ length: 5 }, (_, index) => {
      const currentYear = new Date().getFullYear();
      return currentYear - index; // Generate the last 5 years
    });
  
    // Handle dropdown changes
    const handleMonthChange = (event) => {
      setSelectedDate((prev) => ({ ...prev, month: event.target.value }));
    };
  
    const handleYearChange = (event) => {
      setSelectedDate((prev) => ({ ...prev, year: event.target.value }));
    };


    return(
        <Card variant="outlined">
              <CardContent>
                <Box
                  sx={{
                    display: {
                      sm: "flex",
                      xs: "block",
                    },
                    alignItems: "flex-start",
                  }}
                >
                    <Box>
                                <Typography
                                  variant="h3"
                                  sx={{
                                    marginBottom: "0",
                                  }}
                                  gutterBottom
                                >
                                  Completed Tasks
                                </Typography>
                    </Box>
                    <Box
                                sx={{
                                  marginLeft: "auto",
                                  mt: {
                                    lg: 0,
                                    xs: 2,
                                  },
                                }}
                              >
                                {/* Month Dropdown */}
                                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                  <Select
                                    // labelId="demo-simple-select-standard-label"
                                    // id="demo-simple-select-standard"
                                    // value={age}
                                    // onChange={handleChange}
                                    // label="Month, Year"
                                    value={selectedDate.month}
                                    onChange={handleMonthChange}
                                    displayEmpty
                                  >
                                    <MenuItem value="">
                                      <em>Select Month</em>
                                    </MenuItem>
                                    {months.map((month) => (
                                      <MenuItem key={month.value} value={month.value}>
                                        {month.label}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                {/* Year Dropdown */}
                                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                  <Select
                                    value={selectedDate.year}
                                    onChange={handleYearChange}
                                    displayEmpty
                                  >
                                    <MenuItem value="">
                                      <em>Select Year</em>
                                    </MenuItem>
                                    {years.map((year) => (
                                      <MenuItem key={year} value={year}>
                                        {year}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                    </Box>
                </Box>
                <Box
                    sx={{
                        overflow: "auto",
                        mt: 3,
                    }}
                    >
                    <CompletedTaskTable selectedDate={selectedDate} />
                </Box>
              </CardContent>
        </Card>
    );
};

export default TaskTableDashboard;