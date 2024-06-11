import Home from "../pages/web/Home";
import Users from "../pages/web/users/Users";
import Managers from "../pages/web/managers/Managers";
import Employees from "../pages/web/employees/Employees";
import Tasks from "../pages/web/tasks/Tasks";
import Groups from "../pages/web/groups/Groups";

export const routes = [
    {
        path: "/",
        element: Home,
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
];