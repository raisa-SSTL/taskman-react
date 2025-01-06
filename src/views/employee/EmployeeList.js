import React, {useContext} from "react";

import { Card, CardContent, Box, Typography, Fab } from "@mui/material";
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import ExTable from "../dashboards/dashboard1-components/ExTable";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const EmployeeList = () => {

  const navigate = useNavigate();

  const { authData } = useContext(AuthContext);
  const userPermissions = authData?.user?.permissions || [];

  const handleAddButtonClick = () => {
    navigate("/employee/add-employee");
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
            <ExTable />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeList;
