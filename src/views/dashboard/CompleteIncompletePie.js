import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, Typography, Box, Select, MenuItem } from "@mui/material";
import Chart from 'react-apexcharts';
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";

const CompleteIncompletePie = () => {

    const {headers} = useContext(GlobalContext);

    const [chartData, setChartData] = useState({
          series: [0, 0], // Initial counts for Unassigned and Assigned tasks
          options: {
            chart: {
              type: "pie",
            },
            labels: ["Complete", "Incomplete"],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 300,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          },
    });

    useEffect(() => {
          getCompleteIncompleteRatio();
    },[]);

    const getCompleteIncompleteRatio = () => {
        axios
          .get(
            "http://localhost:8000/api/complete-incomplete-task-ratio",
            { headers }
          )
          .then((response) => {
            if (response.data) {
              const completedTaskCount = response.data.completedTasks;
              const incompleteTaskCount = response.data.incompleteTasks;
      
               // Update the chart data dynamically
            setChartData((prev) => ({
                ...prev,
                series: [completedTaskCount, incompleteTaskCount],
            }));
                    }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return(
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
                                      Individual Progress
                                    </Typography>
                        </Box>
                    </Box>
                    <Box
                              sx={{
                                marginTop: "25px",
                              }}
                            >
                              <Chart
                                options={chartData.options}
                                series={chartData.series}
                                type="pie"
                                height="295px"
                              />
                    </Box>
                </CardContent>
            </Card>
        );
    
};

export default CompleteIncompletePie;