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

const AssignTaskModal = ({ open, onClose, taskId }) => {

    const {loading, employeeList, getEmployeeList, headers} = useContext(GlobalContext);
    const [page, setPage] = useState(1);
    const [selectedEmployee, setSelectedEmployee] = useState("");

    useEffect(() => {
        if (open) {
          getEmployeeList(null, page); // Fetch employees when modal is opened
        //   console.log('employee list', employeeList)
        }
    }, [open, page]);

    const handleEmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
    };

    const handleAssignTask = () => {
        if (!selectedEmployee) {
          toast.error("Please select an employee.");
          return;
        }
    
        axios
          .post(
            `http://localhost:8000/api/assign-task`,
            {
              task_id: taskId,
              employee_id: selectedEmployee,
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
            toast.error("Failed to assign task. Please try again.");
          });
    };

    return(

        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Assign Task</DialogTitle>
            <DialogContent>
            {loading ? (
                <CircularProgress />
            ) : (
                <FormControl variant="standard" fullWidth>
                    <Select
                        value={selectedEmployee}
                        onChange={handleEmployeeChange}
                        displayEmpty                
                    >
                        <MenuItem value="">
                                      <em>Select Employee</em>
                        </MenuItem>
                        {employeeList.map((employee) => (
                            <MenuItem key={employee.id} value={employee.id}>
                            {employee.name}
                            </MenuItem>
                        ))}                        
                    </Select>
                </FormControl>
            )}
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