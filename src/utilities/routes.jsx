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
import Groups from "../pages/web/groups/Groups";
import GroupView from "../pages/web/groups/GroupView";
import Error404 from "../pages/errors/Error404";
import Profile from "../pages/web/Profile";

export const routes = [
    {
        path: "/",
        element: Home,
    },
    {
        path: "/signup",
        element: SignUp,
    },
    {
        path: "/login",
        element: Login,
    },
    {
        path: "/profile",
        element: Profile,
    },
    {
        path: "/users",
        element: Users,
    },
    {
        path: "/users/:id/view",
        element: UserView,
    },
    {
        path: "/managers",
        element: Managers,
    },
    {
        path: "/managers/:id/view",
        element: ManagerView,
    },
    {
        path: "/employees",
        element: Employees,
    },
    {
        path: "/employees/:id/view",
        element: EmployeeView,
    },
    {
        path: "/tasks",
        element: Tasks,
    },
    {
        path: "/groups",
        element: Groups,
    },
    {
        path: "/groups/:id/view",
        element: GroupView,
    },
    {
        path: "/groups/:id/view/:view",
        element: GroupView,
    },
    {
        path: "*",
        element: Error404,
    },
];