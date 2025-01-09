import React from "react";
import { Grid, Box } from "@mui/material";
import TaskOverview from "./TaskOverview";
import TaskTableDashboard from "./TaskTableDashboard";
import EmployeeTableDashboard from "./EmployeeTableDashboard";

const Dashboard = () => {

    return (
        <Box>
              <Grid container spacing={0}>
                {/* ------------------------- row 1 ------------------------- */}
                <Grid item xs={12} lg={12}>
                    <TaskOverview />
                </Grid>
                {/* ------------------------- row 2 col 1 ------------------------- */}
                <Grid item xs={12} lg={6}>
                    <TaskTableDashboard />
                </Grid>
                {/* ------------------------- row 2 col 2 ------------------------- */}
                <Grid item xs={12} lg={6}>
                    <EmployeeTableDashboard />
                </Grid>
              </Grid>
        </Box>
    );
};

export default Dashboard;