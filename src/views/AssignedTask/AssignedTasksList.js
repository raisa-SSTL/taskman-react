import { Card, CardContent, Box, Typography, Button, Fab, TextField, Menu, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import { useNavigate } from "react-router-dom";
import FilterListIcon from '@mui/icons-material/FilterList';
import { AuthContext } from "../../context/AuthContext";
import AssignedTaskListTable from "./AssignedTaskListTable";

const AssignedTasksList = () => {


    return(
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center", 
                        mb: 2, 
                      }}
                    >
                        <Typography variant="h3">Assigned Task List</Typography>
                    </Box>
                    <Box
                        sx={{
                        overflow: {
                            xs: "auto",
                            sm: "unset",
                        },
                        }}
                    >
                        {/* <TaskListTable searchQuery={searchQuery} filters={selectedFilters} permission={userPermissions}/> */}
                        <AssignedTaskListTable/>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AssignedTasksList;