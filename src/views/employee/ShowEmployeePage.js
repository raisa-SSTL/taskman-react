import React, { useContext, useEffect } from "react";

import {
    Typography,
    Box,
    Button
  } from "@mui/material";
  import { GlobalContext } from "../../context/GlobalContext";

  const ShowTaskPage = ({empData}) => {

    const {getAssignedTasksList, assignedTasksList} = useContext(GlobalContext);

    useEffect(() => {
        getAssignedTasksList();
    }, []);

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
                    <Typography sx={{ mb: 1 }}>
                        <strong>Assigned Tasks:</strong>{" "}
                        {assignedTasksList
                            ?.filter((task) => task.employee.id === empData?.id)
                            .map((task) => task.task.title)
                            .join(", ") || "No tasks assigned"}
                    </Typography>
        </Box>

    );
  };

  export default ShowTaskPage;