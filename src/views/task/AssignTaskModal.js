import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
// import Autocomplete from '@mui/material/Autocomplete';
import Autocomplete from "@mui/material/Autocomplete";
// import BaseCard from "../../BaseCard/BaseCard";
import BaseCard from "../../components/BaseCard/BaseCard";
import { TextField } from "@mui/material";


const AssignTaskModal = ({ open, onClose, taskId }) => {

    const {loading, employeeList, getEmployeeList, headers} = useContext(GlobalContext);
    // const [page, setPage] = useState(1);
    // const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchText, setSearchText] = useState("");

    // useEffect(() => {
    //     if (open) {
    //       getEmployeeList(null, page); // Fetch employees when modal is opened
    //     //   console.log('employee list', employeeList)
    //     }
    // }, [open, page]);

    useEffect(() => {
        if (open) {
          getEmployeeList("", 1); // Fetch employees when modal is opened
        //   console.log('employee list', employeeList)
        }
    }, [open]);

    // Handle search input changes
    const handleSearchChange = (event) => {
      const value = event.target.value;
      setSearchText(value);
      
      // Call the API only if there's input
      if (value.length > 0) {
        getEmployeeList(value, 1);
      } else {
        getEmployeeList("", 1);
      }
    };

    const handleEmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
    };

    const handleAssignTask = () => {
        if (!selectedEmployee || !selectedEmployee.id) {
          toast.error("Please select an employee.");
          return;
        }
    
        axios
          .post(
            `http://localhost:8000/api/assign-task`,
            {
              task_id: taskId,
              employee_id: selectedEmployee.id,
            },
            {
              headers
            }
          )
          .then((response) => {
            if (response.status === 200) {
              toast.success("Task assigned successfully!");
              onClose();
              window.location.reload();
            }
          })
          .catch((error) => {
            console.error("Error assigning task:", error);
            toast.error("Failed to assign task.");
          });
    };

    return(

        // <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        //     <DialogTitle>Assign Task</DialogTitle>
        //     <DialogContent>
        //     {loading ? (
        //         <CircularProgress />
        //     ) : (
        //         <FormControl variant="standard" fullWidth>
        //             <Select
        //                 value={selectedEmployee}
        //                 onChange={handleEmployeeChange}
        //                 displayEmpty                
        //             >
        //                 <MenuItem value="">
        //                               <em>Select Employee</em>
        //                 </MenuItem>
        //                 {employeeList.map((employee) => (
        //                     <MenuItem key={employee.id} value={employee.id}>
        //                     {employee.name}
        //                     </MenuItem>
        //                 ))}                        
        //             </Select>
        //         </FormControl>
        //     )}
        //     </DialogContent>
        //     <DialogActions>
        //         <Button onClick={onClose} color="secondary">
        //         Cancel
        //         </Button>
        //         <Button onClick={handleAssignTask} color="primary" disabled={loading}>
        //         Assign Task
        //         </Button>
        //     </DialogActions>
        // </Dialog>

        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Assign Task</DialogTitle>
            <DialogContent>
            {/* {loading ? (
                <CircularProgress />
            ) : ( */}
              <FormControl variant="standard" fullWidth>
                <Autocomplete
                  // disablePortal
                  id="employee-select"
                  options={employeeList}
                  getOptionLabel={(option) => option.name}
                  value={selectedEmployee}
                  onChange={(event, newValue) => setSelectedEmployee(newValue)}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Employee"
                      onChange={handleSearchChange}
                    />
                  )}
                />
              </FormControl>
            {/* )} */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                Cancel
                </Button>
                <Button onClick={handleAssignTask} color="primary" disabled={loading}>
                Assign Task
                </Button>
            </DialogActions>
        </Dialog>

    );

};

export default AssignTaskModal;