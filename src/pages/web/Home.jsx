import home1 from "../../assets/images/home1.png";
import home2 from "../../assets/images/home2.png";
import home3 from "../../assets/images/home3.png";
import home4 from "../../assets/images/home4.png";
import background from "../../assets/images/background.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="header-container">
        <img src={background} alt="" className="home-background"/>
        <div className="header">
          <div className="header-title">CrispCo.</div>
          <div className="header-title">Line Management</div>
          <p>
            CrispCo's Line Management System.
          </p>
          <div>
            <Link to="/signup" className="btn ">Get Started</Link>
          </div>
        </div>
      </div>
      
      <div className="section section1">
        <div className="section-content">
          <div className="section-title">About CrispCo</div>
          <div className="section-desc">
            CrispCo is your trusted partner in achieving organizational excellence through smart, streamlined solutions. Our focus is on bringing clarity and efficiency to your business operations with innovative tools and technologies.
          </div>
          <div className="section-desc">
            Visit our main website for more information.
          </div>
        </div>
        <div className="section-img-holder">
          <img src={home1} alt="" className="home1"/>
        </div>
      </div>

      <div className="section section2">
        <div className="section-img-holder">
          <img src={home2} alt="" />
        </div>
        <div className="section-content">
          <div className="section-title">Our line Management System</div>
          <div className="section-desc">
            Our line management system is designed to help CrispCo's staff manage their tasks and responsibilities efficiently. It provides a clear overview of the tasks that need to be completed, as well as the status of each task.
          </div>
          <div className="section-desc">
            Features include:
            <ul>
              <li>Task assignment</li>
              <li>Task tracking</li>
              <li>Task completion</li>
              <li>Department / Group creation</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home;