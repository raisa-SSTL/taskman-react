import React from "react";

import { Grid } from "@mui/material";
import AddEmployeeForm from "./AddEmployeeForm";

const AddEmployee = () => {
    return (
        <Grid container spacing={0}>
            <Grid item lg={12} md={12} xs={12}>
                <AddEmployeeForm />
            </Grid>
        </Grid>
    );
};

export default AddEmployee;