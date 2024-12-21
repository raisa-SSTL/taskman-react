import React from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import TaskListTable from "./TaskListTable";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/task/add-task");
  };

    return (
        <Box>
          <Card variant="outlined">
            <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center", // Ensure vertical alignment
                mb: 2, // Add some margin below
              }}
            >
              <Typography variant="h3">Task List</Typography>
              <Button
                                          variant="outlined"
                                          color="primary"
                                          sx={{
                                            mr: 1,
                                            mb: {
                                              xs: 1,
                                              sm: 0,
                                              lg: 0,
                                            },
                                          }}
                                          onClick={handleButtonClick}
                                        >
                                          Add
                                </Button>
            </Box>
              <Box
                sx={{
                  overflow: {
                    xs: "auto",
                    sm: "unset",
                  },
                }}
              >
                <TaskListTable />
              </Box>
            </CardContent>
          </Card>
        </Box>
    );
};

export default TaskList;