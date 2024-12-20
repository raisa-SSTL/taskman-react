import React from "react";

import { Grid } from "@mui/material";

// import { FbDefaultForm } from "./fb-elements/index";
import AddTaskForm from "./AddTaskForm";

const AddTask = () => {
    return (
        <Grid container spacing={0}>
            <Grid item lg={12} md={12} xs={12}>
                {/* <FbDefaultForm /> */}
                <AddTaskForm />
            </Grid>
        </Grid>
    );
};

export default AddTask;