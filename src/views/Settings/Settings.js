import React from "react";
import { Grid } from "@mui/material";
import SettingsForm from "./SettingsForm";

const FormLayouts = () => {
  return (
    <Grid container spacing={0}>
      <Grid item lg={12} md={12} xs={12}>
        <SettingsForm />
      </Grid>
    </Grid>
  );
};

export default FormLayouts;
