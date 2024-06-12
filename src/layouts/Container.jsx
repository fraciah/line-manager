import { useState } from "react";
import Sidebar from "./Sidebar"

const Container = ({ page }) => {
    const [hideSidebar, setHideSidebar] = useState(false);
    function toggleSideBar() {
        setHideSidebar(!hideSidebar);
    };

  return (
    <div className="main-container">
      <Sidebar toggleSideBar={toggleSideBar} hideSidebar={hideSidebar}/>
      <div className={hideSidebar ? "main-content hide" : "main-content"}>
        {<page.element />}
      </div>
    </div>
  )
};

export default Container;