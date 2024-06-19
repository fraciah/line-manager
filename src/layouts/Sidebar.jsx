import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import useAuth from "../hooks/useAuth";
import useFireStoreDoc from "../hooks/useFireStoreDoc";
import { NavLink, useNavigate } from "react-router-dom";
import { BookCheck, Boxes, ChevronRight, Contact, Lock, User, UserCheck, Users } from "lucide-react";
import logo from "../assets/images/logo.png";

const Sidebar = ({ toggleSideBar, hideSidebar }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { document: currentUser } = useFireStoreDoc("users", user?.uid);  
    
    const navLinks = [
        {
            path: "/profile",
            icon: <User />,
            title: "Profile",
            view : ["Admin", "Manager", "Employee"],
        },
        {
            path: "/users",
            icon: <Users />,
            title: "All Users",
            view : ["Admin"],
        },
        {
            path: "/managers",
            icon: <UserCheck />,
            title: "Managers",
            view : ["Admin", "Manager"],
        },
        {
            path: "/employees",
            icon: <Contact />,
            title: "Employees",
            view : ["Admin", "Manager"],
        },
        {
            path: "/groups",
            icon: <Boxes />,
            title: "Groups",
            view : ["Admin", "Manager"],
        },
        {
            path: "/tasks",
            icon: <BookCheck />,
            title: "Tasks",
            view : ["Admin", "Manager", "Employee"],
        },
    ];

    const handleLogout = async () => {
        await signOut(auth);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        navigate("/");
    };

    return (
        <div className={hideSidebar ? "sidebar hide" : "sidebar"}>
            <div
                className={hideSidebar ? "sidebar-toggle hide" : "sidebar-toggle"}
                onClick={toggleSideBar}
            >
                <ChevronRight className="i"/>
            </div>
            {/* {hideSidebar && (
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
            )}
            {!hideSidebar && ( */}
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            {/* // )} */}
            <div className="sidebar-links">
                <div className="sidelinks">
                    {navLinks?.filter(link => link.view.includes(currentUser?.role)).map((link, linkIndex) => (
                        <NavLink to={link.path} className="sidelink" key={linkIndex}>
                            <div className="icon">
                                {link.icon}
                            </div>
                            <div className="text">{link.title}</div>
                        </NavLink>
                    ))}
                </div>
                <div className="sidelinks">
                    <div className="sidelink logout" onClick={handleLogout}>
                        <div className="icon">
                            <Lock />
                        </div>
                        <div className="text">Logout</div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Sidebar;