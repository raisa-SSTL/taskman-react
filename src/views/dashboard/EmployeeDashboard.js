import React, {useContext} from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

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

                  </Grid>
            </Box>
    );

};

export default EmployeeDashboard;