import React from "react";
import { Grid, Box } from "@mui/material";
import TaskOverview from "./TaskOverview";
import TaskTableDashboard from "./TaskTableDashboard";

const Dashboard = () => {

    return (
        <Box>
              <Grid container spacing={0}>
                {/* ------------------------- row 1 ------------------------- */}
                <Grid item xs={12} lg={12}>
                    <TaskOverview />
                </Grid>
                {/* ------------------------- row 2 ------------------------- */}
                <Grid item xs={12} lg={6}>
                    <TaskTableDashboard />
                </Grid>
              </Grid>
        </Box>
    );
};

export default Dashboard;