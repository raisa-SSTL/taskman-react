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
  { path: "/register", element: <Register/> },
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
      { path: "dashboards/dashboard1", exact: true, element: <Dashboard1 /> },
      { path: "tables/basic-table", element: <BasicTable /> },
      { path: "/form-layouts/form-layouts", element: <FormLayouts /> },
      { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
      { path: "/form-elements/button", element: <ExButton /> },
      { path: "/form-elements/checkbox", element: <ExCheckbox /> },
      { path: "/form-elements/radio", element: <ExRadio /> },
      { path: "/form-elements/slider", element: <ExSlider /> },
      { path: "/form-elements/switch", element: <ExSwitch /> },

      //--------------------------

      // T A S K

      { path: "/task/add-task", 
        element: (
          <PermissionRoute permission="create tasks">
            <AddTask />
          </PermissionRoute>
        ), 
      },
      { path: "/task/task-list", element: <TaskList /> },
      { path: "/task/show-task/:id", element: <ShowTask /> },
      { path: "/task/update-task/:id", element: <UpdateTask /> },

      // D A S H B O A R D

      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
];

export default ThemeRoutes;
