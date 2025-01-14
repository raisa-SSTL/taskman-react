import React, {useContext} from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import TaskOverview from "./TaskOverview";
import TaskTableDashboard from "./TaskTableDashboard";
import EmployeeTableDashboard from "./EmployeeTableDashboard";
import AssignedTasksDonut from "./AssignedTasksDonut";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {

    const { authData } = useContext(AuthContext);

  // Show a loading indicator if authData is not yet available
  if (!authData) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

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
                    <AssignedTasksDonut />
                </Grid>
                {/* ------------------------- row 3 col 1 ------------------------- */}
                <Grid item xs={12} lg={6}>
                    <EmployeeTableDashboard />
                </Grid>
              </Grid>
        </Box>
    );
};

export default Dashboard;