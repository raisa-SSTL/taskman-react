import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Select, MenuItem } from "@mui/material";
import Chart from 'react-apexcharts';
import axios from "axios";

const TaskOverview = () => {

  const [year, setYear] = useState(new Date().getFullYear()); // Current year as default

  const handleYearChange = (event) => {
    setYear(event.target.value);
    console.log("Selected Year:", event.target.value); // You can handle API calls here
  };

  const taskoverviewstyles = {
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },

    colors: ["#4caf50", "#ff9800", "#f44336"],
    fill: {
      type: "solid",
      opacity: 1,
    },
    chart: {
      offsetX: -15,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      show: true,
      min: 0,
      max: 10,
      tickAmount: 3,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  };

  const [chartData, setChartData] = useState({
    complete: Array(12).fill(0),
    inProgress: Array(12).fill(0),
    pending: Array(12).fill(0),
  });

  // Chart series (3 bars for each month)
  const taskoverviewbars = [
    { name: "Complete", data: chartData.complete },
    { name: "In Progress", data: chartData.inProgress },
    { name: "Pending", data: chartData.pending },
  ];

  // Fetch task data based on the selected year 
  useEffect(() => {

    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No authorization token found");
    }  

    axios
      .post("http://localhost:8000/api/year-wise-tasks", { year }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }) 
      .then((response) => {
        const tasks = response.data.tasks; // Assuming API returns tasks in `tasks` key

        // Process tasks into chart data
        const monthlyData = {
          complete: Array(12).fill(0),
          inProgress: Array(12).fill(0),
          pending: Array(12).fill(0),
        };

        tasks.forEach((task) => {
          const monthIndex = new Date(task.created_at).getMonth(); // 0-based index for months
          if (task.status === "Complete") monthlyData.complete[monthIndex]++;
          else if (task.status === "In Progress") monthlyData.inProgress[monthIndex]++;
          else if (task.status === "Pending") monthlyData.pending[monthIndex]++;
        });

        setChartData(monthlyData);
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
      });
  }, [year]);

  return (
    <Card
      variant="outlined"
      sx={{
        paddingBottom: "0",
      }}
    >
      <CardContent
        sx={{
          paddingBottom: "16px !important",
        }}
      >
        <Box
          sx={{
            display: {
              sm: "flex",
              xs: "block",
            },
            alignItems: "center",
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
              Task Overview
            </Typography>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              mt: {
                lg: 0,
                xs: 2,
              },
            }}
          >
            <Box
                sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px", // Adjust space between the dropdown and "Ample"
                }}
            >
                <Select
                value={year}
                onChange={handleYearChange}
                sx={{
                    backgroundColor: "background.paper",
                    color: "text.primary",
                    minWidth: 100,
                    borderRadius: 1,
                    height: "40px",
                    "& .MuiSelect-outlined": {
                    padding: "8px 32px 8px 8px",
                    },
                }}
                >
                {/* Dynamically populate years */}
                {Array.from({ length: 10 }, (_, index) => (
                    <MenuItem key={index} value={2024 - index}>
                    {2024 - index}
                    </MenuItem>
                ))}
                </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#4caf50",
                  borderRadius: "50%",
                  height: 8,
                  width: 8,
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "#4caf50",
                }}
              >
                Complete
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#ff9800",
                  borderRadius: "50%",
                  height: 8,
                  width: 8,
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "#ff9800",
                }}
              >
                In Progress
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#f44336",
                  borderRadius: "50%",
                  height: 8,
                  width: 8,
                  mr: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "#f44336",
                }}
              >
                Pending
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "25px",
          }}
        >
          <Chart
            options={taskoverviewstyles}
            series={taskoverviewbars}
            type="bar"
            height="295px"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskOverview;
