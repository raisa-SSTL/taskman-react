import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import SwitchCameraOutlinedIcon from '@mui/icons-material/SwitchCameraOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const Menuitems = [
  // {
  //   title: "Dashboard",
  //   icon: DashboardOutlinedIcon,
  //   href: "/dashboards/dashboard1",
  // },
  // {
  //   title: "Autocomplete",
  //   icon: AddToPhotosOutlinedIcon,
  //   href: "/form-elements/autocomplete",
    
  // },
  // {
  //   title: "Buttons",
  //   icon: AspectRatioOutlinedIcon,
  //   href: "/form-elements/button",
    
  // },
  // {
  //   title: "Checkbox",
  //   icon: AssignmentTurnedInOutlinedIcon,
  //   href: "/form-elements/checkbox",
    
  // },
  // {
  //   title: "Radio",
  //   icon: AlbumOutlinedIcon,
  //   href: "/form-elements/radio",
    
  // },
  // {
  //   title: "Slider",
  //   icon: SwitchCameraOutlinedIcon,
  //   href: "/form-elements/slider",
    
  // },
  // {
  //   title: "Switch",
  //   icon: SwitchLeftOutlinedIcon,
  //   href: "/form-elements/switch",
    
  // },
  // {
  //   title: "Form",
  //   icon: DescriptionOutlinedIcon,
  //   href: "/form-layouts/form-layouts",
    
  // },
  // {
  //   title: "Table",
  //   icon: AutoAwesomeMosaicOutlinedIcon,
  //   href: "/tables/basic-table",
    
  // },

  //----------------------

  // {
  //   title: "Add Task",
  //   icon: AddToPhotosOutlinedIcon,
  //   href: "/task/add-task",
  // },
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/dashboard",
    permission: "access admin dashboard",
  },
  {
    title: "Task",
    icon: DescriptionOutlinedIcon,
    href: "/task/task-list",
    permission: "access tasks",
  },
  {
    title: "Employee",
    icon: PersonOutlinedIcon,
    href: "/employee/employee-list",
    permission: "access employees",
  },

  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/e-dashboard",
    permission: "access employee dashboard",
  },

  {
    title: "Assigned Tasks",
    icon: DescriptionOutlinedIcon,
    href: "/assigned-tasks",
    permission: "access assigned tasks",
  },
  // {
  //   title: "Add Employee",
  //   icon: DashboardOutlinedIcon,
  //   href: "/employee/add-employee",
  //   permission: "create employees",
  // },
  // {
  //   title: "Show Task",
  //   icon: DescriptionOutlinedIcon,
  //   href: "/task/show-task/:id",
  // },
  // {
  //   title: "Tasks",
  //   icon: AddToPhotosOutlinedIcon,
  //   children: [
  //     {
  //       title: "Add Task",
  //       icon: AddToPhotosOutlinedIcon,
  //       href: "/task/add-task",
  //     },
  //     {
  //       title: "Task List",
  //       icon: DescriptionOutlinedIcon,
  //       href: "/task/task-list",
  //     },
  //   ],
  // },
];

export default Menuitems;
