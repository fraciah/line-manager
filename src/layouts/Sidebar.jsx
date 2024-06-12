import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { BookCheck, Boxes, ChevronRight, Contact, Lock, UserCheck, Users } from "lucide-react";
import large_logo from "../assets/images/large_logo.png";
import small_logo from "../assets/images/small_logo.png";

const Sidebar = ({ toggleSideBar, hideSidebar }) => {
    const navigate = useNavigate();

    const navLinks = [
        {
            path: "/users",
            icon: <Users />,
            title: "Users",
        },
        {
            path: "/managers",
            icon: <UserCheck />,
            title: "Managers",
        },
        {
            path: "/employees",
            icon: <Contact />,
            title: "Employees",
        },
        {
            path: "/tasks",
            icon: <BookCheck />,
            title: "Tasks",
        },
        {
            path: "/groups",
            icon: <Boxes />,
            title: "Groups",
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
            {hideSidebar && (
                <div className="logo">
                    <img src={large_logo} alt="logo" />
                </div>
            )}
            {!hideSidebar && (
                <div className="logo">
                    <img src={small_logo} alt="logo" />
                </div>
            )}
            <div className="sidebar-links">
                <div className="sidelinks">
                    {navLinks?.map((link, linkIndex) => (
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