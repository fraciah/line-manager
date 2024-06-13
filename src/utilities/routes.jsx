import Home from "../pages/web/Home";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";
import Users from "../pages/web/users/Users";
import Managers from "../pages/web/managers/Managers";
import Employees from "../pages/web/employees/Employees";
import Tasks from "../pages/web/tasks/Tasks";
import Groups from "../pages/web/groups/Groups";
import Error404 from "../pages/errors/Error404";
import UserView from "../pages/web/users/UserView";

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
        path: "/employees",
        element: Employees,
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
        path: "*",
        element: Error404,
    },
];