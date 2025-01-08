import React from "react";
import { Grid } from "@mui/material";
import UpdateEmployeeForm from "./UpdateEmployeeForm";

const UpdateEmployee = () => {
    return (
        <Grid container spacing={0}>
            <Grid item lg={12} md={12} xs={12}>
                <UpdateEmployeeForm />
            </Grid>
        </Grid>
    );
};

export default UpdateEmployee;