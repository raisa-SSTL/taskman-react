import React, {useContext, useState} from "react";

import { Card, CardContent, Box, Typography, Fab, TextField } from "@mui/material";
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import EmployeeListTable from "./EmployeeListTable";

const EmployeeList = () => {

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const { authData } = useContext(AuthContext);
  const userPermissions = authData?.user?.permissions || [];

  const handleAddButtonClick = () => {
    navigate("/employee/add-employee");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
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
            <Typography variant="h3">Employee List</Typography>
            <Box
              sx={{
              display: "flex",
              alignItems: "center",
              gap: 2, // Adds spacing between the search bar and the Fab icon
              }}
            >
              {/* Search Bar */}
                <TextField
                              variant="outlined"
                              size="small"
                              placeholder="Search Tasks..."
                              value={searchQuery}
                              onChange={handleSearchChange}
                              sx={{
                                width: "250px", // Set the width of the search bar
                              }}
              />
              {/* Add Button */}
              {userPermissions.includes("create employee") && (
                <Fab
                  color="secondary"
                  onClick={handleAddButtonClick}
                >
                  <AddToPhotosOutlinedIcon />
                </Fab>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            {/* <ExTable /> */}
            <EmployeeListTable searchText={searchQuery} permissions={userPermissions}/>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeList;
