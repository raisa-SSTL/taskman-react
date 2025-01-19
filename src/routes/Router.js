import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AddTask from "../views/task/AddTask.js";
import TaskList from "../views/task/TaskList.js";
import ShowTask  from "../views/task/ShowTask.js";
import UpdateTask from "../views/task/UpdateTask.js";
import Dashboard from "../views/dashboard/Dashboard.js";
import Login from "../views/login/Login.js";
import Register from "../views/register/Register.js";
import ProtectedRoute from "../components/ProtectedRoute";
import PermissionRoute from "../components/PermissionRoute.js";
import EmployeeList from "../views/employee/EmployeeList.js";
import AddEmployee from "../views/employee/AddEmployee.js";
import ShowEmployee from "../views/employee/ShowEmployee.js";
import UpdateEmployee from "../views/employee/UpdateEmployee.js";
import EmployeeDashboard from "../views/dashboard/EmployeeDashboard.js";
import AssignedTasksList from "../views/AssignedTask/AssignedTasksList.js";
import AssignedTaskShow from "../views/AssignedTask/AssignedTaskShow.js";
import AssignedTaskUpdate from "../views/AssignedTask/AssignedTaskUpdate.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));

/*****Tables******/
const BasicTable = lazy(() => import("../views/tables/BasicTable.js"));

// form elements
const ExAutoComplete = lazy(() =>
  import("../views/FormElements/ExAutoComplete.js")
);
const ExButton = lazy(() => import("../views/FormElements/ExButton.js"));
const ExCheckbox = lazy(() => import("../views/FormElements/ExCheckbox.js"));
const ExRadio = lazy(() => import("../views/FormElements/ExRadio.js"));
const ExSlider = lazy(() => import("../views/FormElements/ExSlider.js"));
const ExSwitch = lazy(() => import("../views/FormElements/ExSwitch.js"));
// form layouts
const FormLayouts = lazy(() => import("../views/FormLayouts/FormLayouts.js"));

/*****Routes******/

const ThemeRoutes = [
  // L O G I N
  { path: "/login", element: <Login/> },
  { path: "/register", 
    element: (
      <PermissionRoute permission="access admin dashboard">
        <Register/> 
      </PermissionRoute>
    ), 
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <FullLayout />
      </ProtectedRoute>
    ), // Protect all routes under "/",
    children: [
      // { path: "/", element: <Navigate to="dashboards/dashboard1" /> },
      { path: "/", element: <Navigate to="login" /> },
      // { path: "dashboards/dashboard1", exact: true, element: <Dashboard1 /> },
      // { path: "tables/basic-table", element: <BasicTable /> },
      // { path: "/form-layouts/form-layouts", element: <FormLayouts /> },
      // { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
      // { path: "/form-elements/button", element: <ExButton /> },
      // { path: "/form-elements/checkbox", element: <ExCheckbox /> },
      // { path: "/form-elements/radio", element: <ExRadio /> },
      // { path: "/form-elements/slider", element: <ExSlider /> },
      // { path: "/form-elements/switch", element: <ExSwitch /> },

      //-------------------------- ADMIN -----------------------------//

      // D A S H B O A R D

      { path: "/dashboard", element: (
        <PermissionRoute permission="access admin dashboard">
          <Dashboard />
        </PermissionRoute>
      )},

      // T A S K

      { path: "/task/add-task", 
        element: (
          <PermissionRoute permission="create tasks">
            <AddTask />
          </PermissionRoute>
        ), 
      },
      { path: "/task/task-list", 
        element: (
          <PermissionRoute permission="access tasks">
            <TaskList /> 
          </PermissionRoute>
        ), 
      },
      { path: "/task/show-task/:id", 
        element: (
          <PermissionRoute permission="access tasks">
            <ShowTask />  
          </PermissionRoute>
        ), 
      },
      { path: "/task/update-task/:id", 
        element: (
          <PermissionRoute permission="update tasks">
            <UpdateTask /> 
          </PermissionRoute>
        ), 
      },

      // E M P L O Y E E 

      { path: "/employee/employee-list", 
        element: (
          <PermissionRoute permission="access employees">
            <EmployeeList /> 
          </PermissionRoute>
        ), 
      },
      { path: "/employee/add-employee", 
        element: (
          <PermissionRoute permission="create employee">
            <AddEmployee /> 
          </PermissionRoute>
        ), 
      },    
      { path: "/employee/show-employee/:id", 
        element: (
          <PermissionRoute permission="access employees">
            <ShowEmployee /> 
          </PermissionRoute>
        ), 
      },  
      { path: "/employee/update-employee/:id", 
        element: (
          <PermissionRoute permission="update employee">
            <UpdateEmployee /> 
          </PermissionRoute>
        ), 
      },   

      //-------------------------- EMPLOYEE -----------------------------//
      
      // D A S H B O A R D
      
      { path: "/e-dashboard", element: (
        <PermissionRoute permission="access employee dashboard">
          <EmployeeDashboard />
        </PermissionRoute>
      )},

      { path: "/assigned-tasks", element: (
        <PermissionRoute permission="access assigned tasks">
          <AssignedTasksList />
        </PermissionRoute>
      )},

      { path: "/assigned-tasks/show-assigned-task/:id", element: (
        <PermissionRoute permission="access assigned tasks">
          <AssignedTaskShow />
        </PermissionRoute>
      )},

      { path: "/assigned-tasks/update-assigned-task/:id", element: (
        <PermissionRoute permission="update assigned task">
          <AssignedTaskUpdate />
        </PermissionRoute>
      )},
    ],
  },
];

export default ThemeRoutes;
