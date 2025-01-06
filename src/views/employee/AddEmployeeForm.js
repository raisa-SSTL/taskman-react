// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//     Card,
//     CardContent,
//     Divider,
//     Box,
//     Typography,
//     TextField,
//     Button,
//     Grid,
//   } from "@mui/material";

//   const AddEmployeeForm = () => {

//     const [message, setMessage] = useState("");
//     const navigate = useNavigate();
//     const {authData} = useContext(AuthContext);

//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//         phone: "",
//     });

//     const handleBackButtonClick = () => {
//         navigate("/employee/employee-list");
//     };

//     const handleInputChange = (e) => {
//         const { id, value } = e.target;
//         setFormData((prevData) => ({
//         ...prevData,
//         [id]: value,
//         }));
//     }; 

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!authData.token) {
//             console.error("No authorization token found");
//             toast.error("Authorization failed. Please log in again.");
//             return;
//         }  

//         axios.post("http://127.0.0.1:8000/api/employee", formData, {
//             headers: {
//                 Authorization: `Bearer ${authData.token}`,
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then((response) => {
//             if(response.status===201){
//                 toast.success("Employee created successfully!", {
//                     position: "top-right",
//                 });
//                 navigate("/employee/employee-list");
//             }
//         })
//         .catch((error) => {;
//             toast.error(
//                 error.response?.data?.message || "Failed to create employee. Please try again.", 
//                 { position: "top-right" }
//             );
//         });
//     };

//     return(
//         <div>
//             <Card
//                 variant="outlined"
//                 sx={{
//                 p: 0,
//                 }}
//             >
//                 <Box
//                 sx={{
//                     padding: "15px 30px",
//                 }}
//                 display="flex"
//                 alignItems="center"
//                 >
//                     <Box flexGrow={1} 
//                             sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center", // Ensure vertical alignment
//                             mb: 2, // Add some margin below
//                         }}
//                     >
//                         <Typography
//                         sx={{
//                             fontSize: "18px",
//                             fontWeight: "500",
//                         }}
//                         >
//                         Create New Employee
//                         </Typography>
//                         <Button
//                                                                 variant="outlined"
//                                                                 color="secondary"
//                                                                 sx={{
//                                                                     mr: 1,
//                                                                     mb: {
//                                                                     xs: 1,
//                                                                     sm: 0,
//                                                                     lg: 0,
//                                                                     },
//                                                                 }}
//                                                                 onClick={handleBackButtonClick}
//                                                                 >
//                                                                 Back
//                         </Button>
//                     </Box>
//                 </Box>
//                 <Divider />
//                 <CardContent
//                 sx={{
//                     padding: "30px",
//                 }}
//                 >
//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                     id="name"
//                     label="Name"
//                     variant="outlined"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     defaultValue=""
//                     fullWidth
//                     sx={{
//                         mb: 2,
//                     }}
//                     />
//                     <Grid
//                     container
//                     spacing={2}
//                     sx={{
//                         mb: 2,
//                     }}
//                     >
//                         <Grid item lg={6} md={6} sm={12}>
//                             <TextField
//                                 fullWidth
//                                 id="email"
//                                 type="email"
//                                 variant="outlined"
//                                 label="Email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                                 sx={{
//                                 }}
//                             >
//                             </TextField>
//                         </Grid>
//                         <Grid item lg={6} md={6} sm={12}>
//                             <TextField
//                                 fullWidth
//                                 id="password"
//                                 type="password"
//                                 variant="outlined"
//                                 label="Password"
//                                 value={formData.password}
//                                 onChange={handleInputChange}
//                                 sx={{
//                                 }}
//                             >
//                             </TextField>
//                         </Grid>
//                     </Grid>
//                     <Grid
//                     container
//                     spacing={2}
//                     sx={{
//                         mb: 2,
//                     }}
//                     >
//                         <Grid item lg={6} md={6} sm={12}>
//                         <TextField
//                         id="phone"
//                         label="Phone"
//                         variant="outlined"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         defaultValue=""
//                         fullWidth
//                         sx={{
//                             mb: 2,
//                         }}
//                         />
//                         </Grid>
//                     </Grid>
//                     <div>
//                     <Button color="primary" variant="contained" type="submit">
//                         Submit
//                     </Button>
//                     </div>
//                 </form>
//                 </CardContent>
//             </Card>
//             <ToastContainer />
//         </div>
//     );

//   };

//   export default AddEmployeeForm


import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const AddEmployeeForm = () => {
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleBackButtonClick = () => {
    navigate("/employee/employee-list");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!authData.token) {
      toast.error("Authorization failed. Please log in again.");
      return;
    }

    axios
      .post("http://127.0.0.1:8000/api/employee", formData, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Employee created successfully!");
          navigate("/employee/employee-list");
        }
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Failed to create employee. Please try again."
        );
      });
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box
          sx={{
            padding: "15px 30px",
          }}
          display="flex"
          alignItems="center"
        >
          <Box
            flexGrow={1}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Create New Employee
            </Typography>
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
              onClick={handleBackButtonClick}
            >
              Back
            </Button>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item lg={6} md={6} sm={12}>
                <TextField
                  fullWidth
                  id="email"
                  type="email"
                  variant="outlined"
                  label="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12}>
                <TextField
                  fullWidth
                  id="password"
                  type="password"
                  variant="outlined"
                  label="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item lg={6} md={6} sm={12}>
                <TextField
                  id="phone"
                  label="Phone"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddEmployeeForm;
