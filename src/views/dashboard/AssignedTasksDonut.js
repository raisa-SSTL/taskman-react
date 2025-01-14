import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, Typography, Box, Select, MenuItem } from "@mui/material";
import Chart from 'react-apexcharts';
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";

const AssignedTasksDonut = () => {

    const {assignedTasksList, getAssignedTasksList, taskList, getTasksList} = useContext(GlobalContext);

    // const chartData = {
    //   series: [30, 70], 
    //   options: {
    //     chart: {
    //       type: "donut",
    //     },
    //     labels: ["Unassigned", "Assigned"],
    //     responsive: [
    //       {
    //         breakpoint: 480,
    //         options: {
    //           chart: {
    //             width: 300,
    //           },
    //           legend: {
    //             position: "bottom",
    //           },
    //         },
    //       },
    //     ],
    //   },
    // };

    const [chartData, setChartData] = useState({
      series: [0, 0], // Initial counts for Unassigned and Assigned tasks
      options: {
        chart: {
          type: "donut",
        },
        labels: ["Unassigned", "Assigned"],
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
      getAssignedTasksList();
      getTasksList();
  },[]);

  useEffect(() => {
    if (taskList && assignedTasksList) {
      // Calculate Assigned and Unassigned tasks count
      const assignedCount = assignedTasksList.length;
      const totalTasksCount = taskList.length;
      const unassignedCount = totalTasksCount - assignedCount;

      // Update the chart data dynamically
      setChartData((prev) => ({
        ...prev,
        series: [unassignedCount, assignedCount],
      }));
    }
  }, [assignedTasksList, taskList]); // Update whenever assignedTasksList or taskList changes

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
                                  Assigned Tasks Overview
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
                            type="donut"
                            height="295px"
                          />
                </Box>
            </CardContent>
        </Card>
    );

};

export default AssignedTasksDonut;