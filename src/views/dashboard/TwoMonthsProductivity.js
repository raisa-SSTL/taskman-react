import React, { useContext, useState, useEffect } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Chart from 'react-apexcharts';
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";

const TwoMonthsProductivity = () => {

    const {headers} = useContext(GlobalContext);

    const [percentageChange, setPercentageChange] = useState();

    const [chartData, setChartData] = useState({
    options: {
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
          horizontal: true,
          columnWidth: "25%",
          endingShape: "rounded",
          borderRadius: 5,
        },
      },
      colors: ["#FFA500"],
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
    },
    series: [
      {
        name: "Completed Tasks",
        data: [],
      },
    ],
    });

    useEffect(() => {
        getProductivityComparison();
    },[]);

    const getProductivityComparison = () => {
        axios
          .get('http://localhost:8000/api/two-months-productivity', {headers})
          .then((response) => {
            const data = response.data;

            setPercentageChange(data.percentage_change);
    
            // Update chart data based on API response
            setChartData((prevState) => ({
              ...prevState,
              options: {
                ...prevState.options,
                xaxis: {
                  ...prevState.options.xaxis,
                  categories: [data.current_month, data.previous_month,],
                },
              },
              series: [
                {
                  name: "Completed Tasks",
                  data: [
                    data.current_month_completed_tasks,
                    data.previous_month_completed_tasks,
                  ],
                },
              ],
            }));
          })
          .catch((error) => {
            console.error("Error fetching productivity data:", error);
          });
    };

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
              Productivity Comparison
            </Typography>
          </Box>
          {/* <Box
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
          </Box> */}
        </Box>
        <Box>
            <Typography
                variant="body1"
                sx={{
                color: percentageChange > 0 ? "green" : "red", // Set text color based on increase/decrease
                marginTop: "15px", // Add spacing
                }}
            >
                {`Your productivity has ${
                percentageChange > 0 ? "increased" : "decreased"
                } by ${Math.abs(percentageChange)}% from last month.`}
            </Typography>
        </Box>

        <Box
          sx={{
            marginTop: "25px",
          }}
        >
          {/* <Chart
            options={optionssalesoverview}
            series={seriessalesoverview}
            type="bar"
            height="295px"
          /> */}
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height="295px"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TwoMonthsProductivity;
