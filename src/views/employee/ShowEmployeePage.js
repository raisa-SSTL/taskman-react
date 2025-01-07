import React from "react";

import {
    Typography,
    Box,
    Button
  } from "@mui/material";

  const ShowTaskPage = ({empData}) => {

    return(
        <Box>
                    <Typography sx={{ mb: 1 }}>
                        <strong>ID:</strong> {empData?.id}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Name:</strong> {empData?.name}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Email:</strong> {empData?.email || "No email provided"}
                    </Typography>
                    <Typography sx={{ mb: 1 }}>
                        <strong>Phone:</strong> {empData?.phone || "No email provided"}
                    </Typography>
        </Box>

    );
  };

  export default ShowTaskPage;