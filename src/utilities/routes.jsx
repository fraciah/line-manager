import Home from "../pages/web/Home";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import Users from "../pages/web/users/Users";
import Managers from "../pages/web/managers/Managers";
import Employees from "../pages/web/employees/Employees";
import Tasks from "../pages/web/tasks/Tasks";
import Groups from "../pages/web/groups/Groups";
import Error404 from "../pages/errors/Error404";

export const routes = [
    {
        path: "/",
        element: Home,
        auth: false,
    },
    {
        path: "/signup",
        element: SignUp,
        auth: false,
    },
    {
        path: "/login",
        element: Login,
        auth: false,
    },
    {
        path: "/users",
        element: Users,
        auth: true,
    },
    {
        path: "/managers",
        element: Managers,
        auth: true,
    },
    {
        path: "/employees",
        element: Employees,
        auth: true,
    },
    {
        path: "/tasks",
        element: Tasks,
        auth: true,
    },
    {
        path: "/groups",
        element: Groups,
        auth: true,
    },
    {
        path: "*",
        element: Error404,
        auth: false,
    },
];