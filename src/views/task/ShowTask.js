import React from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShowTask = () => {

    const navigate = useNavigate();
    
      const handleButtonClick = () => {
        navigate("/task/task-list");
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
              <Typography variant="h3">Task Title</Typography>
                <Button
                                          variant="outlined"
                                          color="secondary"
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
                                          Back
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
                {/* <ShowTaskPage /> */}
              </Box>
            </CardContent>
          </Card>
        </Box>
    );
};

export default ShowTask;