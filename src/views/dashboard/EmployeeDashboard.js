import React, {useContext} from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import EmployeeLeaderboard from "./EmployeeLeaderboard";
import CompleteIncompletePie from "./CompleteIncompletePie";
import TwoMonthsProductivity from "./TwoMonthsProductivity";

const EmployeeDashboard = () => {

    const { authData } = useContext(AuthContext);
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
                    <Grid item xs={12} lg={12}>
                        <EmployeeLeaderboard />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <CompleteIncompletePie />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <TwoMonthsProductivity />
                    </Grid>
                  </Grid>
            </Box>
    );

};

export default EmployeeDashboard;