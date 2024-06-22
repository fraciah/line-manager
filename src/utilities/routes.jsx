import Home from "../pages/web/Home";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import Users from "../pages/web/users/Users";
import UserView from "../pages/web/users/UserView";
import Managers from "../pages/web/managers/Managers";
import ManagerView from "../pages/web/managers/ManagerView";
import Employees from "../pages/web/employees/Employees";
import EmployeeView from "../pages/web/employees/EmployeeView";
import Tasks from "../pages/web/tasks/Tasks";
import AddTask from "../pages/web/tasks/AddTask";
import TaskView from "../pages/web/tasks/TaskView";
import EditTask from "../pages/web/tasks/EditTask";
import Groups from "../pages/web/groups/Groups";
import GroupView from "../pages/web/groups/GroupView";
import Error404 from "../pages/errors/Error404";
import Profile from "../pages/web/Profile";
import HowItWorks from "../pages/web/HowItWorks";
import Error403 from "../pages/errors/Error403";

export const routes = [
    {
        path: "/",
        element: Home,
        roles:["*"],
    },
    {
        path: "/how-it-works",
        element: HowItWorks,
        roles:["*"],
    },
    {
        path: "/signup",
        element: SignUp,
        roles:["*"],
    },
    {
        path: "/login",
        element: Login,
        roles:["*"],
    },
    {
        path: "/profile",
        element: Profile,
        roles: ["Admin", "Manager", "Employee"],
    },
    {
        path: "/users",
        element: Users,
        roles: ["Admin"],
    },
    {
        path: "/users/:id/view",
        element: UserView,
        roles: ["Admin"],
    },
    {
        path: "/managers",
        element: Managers,
        roles: ["Admin", "Manager"],
    },
    {
        path: "/managers/:id/view",
        element: ManagerView,
        roles: ["Admin", "Manager"],
    },
    {
        path: "/employees",
        element: Employees,
        roles: ["Admin", "Manager"],
    },
    {
        path: "/employees/:id/view",
        element: EmployeeView,
        roles: ["Admin", "Manager"],
    },
    {
        path: "/employees/:id/view/:view",
        element: EmployeeView,
        roles: ["Admin", "Manager"],
    },
    {
        path: "/tasks",
        element: Tasks,
        roles: ["Admin", "Manager", "Employee"],
    },
    {
        path: "/tasks/addTask",
        element: AddTask,
        roles: ["Admin", "Manager"],
    },
    {
        path: "/tasks/:taskStatus",
        element: Tasks,
        roles: ["Admin", "Manager", "Employee"],
    },
    {
        path: "/tasks/:id/view",
        element: TaskView,
        roles: ["Admin", "Manager", "Employee"],
    },
    {
        path: "/tasks/:id/edit",
        element: EditTask,
        roles: ["Admin", "Manager"],
    },
    {
        path: "/groups",
        element: Groups,
        roles: ["Admin", "Manager"],
    },
    {
        path: "/groups/:id/view",
        element: GroupView,
        roles: ["Admin", "Manager"],
    },
    {
        path: "/groups/:id/view/:view",
        element: GroupView,
        roles: ["Admin", "Manager"],
    },
    {
        path: "*",
        element: Error404,
        roles:["*"],
    },
    {
        path: "/unauthorized",
        element: Error403,
        roles:["*"],
    },
];