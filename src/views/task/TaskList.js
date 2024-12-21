import React from "react";

import { Card, CardContent, Box, Typography } from "@mui/material";
import TaskListTable from "./TaskListTable";

const TaskList = () => {
    return (
        <Box>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h3">Task List</Typography>
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