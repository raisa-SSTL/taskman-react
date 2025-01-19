import React from "react";
import { Grid } from "@mui/material";
import AssignedTaskUpdateForm from "./AssignedTaskUpdateForm";

const AssignedTaskUpdate = () => {
    return (
        <Grid container spacing={0}>
            <Grid item lg={12} md={12} xs={12}>
                <AssignedTaskUpdateForm />
            </Grid>
        </Grid>
    );
};

export default AssignedTaskUpdate;