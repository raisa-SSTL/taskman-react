import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import EmployeeListTable from "../employee/EmployeeListTable";
import { AuthContext } from "../../context/AuthContext";

const EmployeeTableDashboard = () => {

    const { authData } = useContext(AuthContext);
    const userPermissions = authData?.user?.permissions || [];

    return(
        <Card variant="outlined">
                      <CardContent>
                        <Box
                          sx={{
                            display: {
                              sm: "flex",
                              xs: "block",
                            },
                            alignItems: "flex-start",
                          }}
                        >
                            <Box>
                                <Typography
                                  variant="h3"
                                  sx={{
                                    marginBottom: "0",
                                  }}
                                  gutterBottom
                                >
                                  Employee List
                                </Typography>
                            </Box>                            
                        </Box>
                        <Box
                            sx={{
                                overflow: "auto",
                                mt: 3,
                            }}
                            >
                            {/* <CompletedTaskTable selectedDate={selectedDate} /> */}
                            <EmployeeListTable permissions={userPermissions}/>
                        </Box>
                      </CardContent>
        </Card>
    );
};

export default EmployeeTableDashboard;