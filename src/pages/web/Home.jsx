import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="header">
        <div className="header-title">CrispCo.</div>
        <div className="header-title">~ Line Management ~</div>
        <p>
          Official CrispCo's Line Management System.
        </p>
        <div>
          <Link to="/signup" className="btn ">Get Started</Link>
        </div>
      </div>
      
      <div className="section">
        <div>
          <div className="section-title">About CrispCo</div>
          <div className="section-content">
            CrispCo is your trusted partner in achieving organizational excellence through smart, streamlined solutions. Our focus is on bringing clarity and efficiency to your business operations with innovative tools and technologies.
          </div>
        </div>
        <div className="section-img-holder">
          <img src="" alt="" />
        </div>
      </div>

      <div className="section">
        <div className="section-img-holder">
          <img src="" alt="" />
        </div>
        <div>
          <div className="section-title">About CrispCo</div>
          <div className="section-content">
            CrispCo is your trusted partner in achieving organizational excellence through smart, streamlined solutions. Our focus is on bringing clarity and efficiency to your business operations with innovative tools and technologies.
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home;