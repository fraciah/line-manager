import { Link } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
      <Footer />
    </div>
  )
}

export default Home;