import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, Typography, Box, Select, MenuItem } from "@mui/material";
import Chart from 'react-apexcharts';
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { toast, ToastContainer } from "react-toastify";

const EmployeeLeaderboard = () => {

  const {headers} = useContext(GlobalContext);

  const [year, setYear] = useState(new Date().getFullYear());

  const [chartOptions, setChartOptions] = useState({
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
    colors: ["#1e4db7"],
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
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "category",
      categories: [],
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      show: true,
      min: 0,
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: "Completed Tasks",
      data: [],
    },
  ]);

  const handleYearChange = (event) => {
    setYear(event.target.value);
    getEmployeeWiseCompletedTaskCount(event.target.value); // Fetch data for the new year
  };

  const getEmployeeWiseCompletedTaskCount = (selectedYear) => {
    axios
      .post(
        "http://localhost:8000/api/employee-assignedtask-count",
        { year: selectedYear || year },
        { headers }
      )
      .then((response) => {
        if (response.data && response.data.data) {
          const employees = response.data.data;
          const employeeNames = employees.map((employee) => employee.employee_name);
          const taskCounts = employees.map((employee) => employee.completed_task_count);
  
          // Check if all task counts are 0
          if (taskCounts.every((count) => count === 0)) {
            toast.info("No completed tasks this year");
          }
  
          setChartOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: employeeNames,
            },
          }));
  
          setChartSeries([
            {
              name: "Completed Tasks",
              data: taskCounts,
            },
          ]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  

  useEffect(() => {
    getEmployeeWiseCompletedTaskCount(year); // Fetch data for the current year on component mount
  }, []);

     return (
      <>
        <ToastContainer position="top-right" />
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
                      Employee Progress Chart
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
                                    {Array.from({ length: 10 }, (_, index) => {
                                        const currentYear = new Date().getFullYear();
                                        const yearValue = currentYear - index;
                                        return (
                                            <MenuItem key={index} value={yearValue}>
                                                {yearValue}
                                            </MenuItem>
                                        );
                                    })}
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
                          backgroundColor: "secondary.main",
                          borderRadius: "50%",
                          height: 8,
                          width: 8,
                          mr: 1,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          color: "secondary.main",
                        }}
                      >
                        Ample
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
                          backgroundColor: "primary.main",
                          borderRadius: "50%",
                          height: 8,
                          width: 8,
                          mr: 1,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          color: "primary.main",
                        }}
                      >
                        Pixel Admin
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
                    options={chartOptions} 
                    series={chartSeries} 
                    type="bar" 
                    height="295px" 
                  />
                </Box>
              </CardContent>
        </Card>
      </>
    );

};

export default EmployeeLeaderboard;