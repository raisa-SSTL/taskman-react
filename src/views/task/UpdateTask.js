import React from "react";
import { Grid } from "@mui/material";
import UpdateTaskForm from "./UpdateTaskForm";

const AddTask = () => {
    return (
        <Grid container spacing={0}>
            <Grid item lg={12} md={12} xs={12}>
                {/* <FbDefaultForm /> */}
                <UpdateTaskForm />
            </Grid>
        </Grid>
    );
};

export default AddTask;