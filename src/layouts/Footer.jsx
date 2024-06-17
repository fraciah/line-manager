import { Linkedin, Slack } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <div className="footer-col-title">CrispCo</div>
          <div className="footer-col-links">
            <a href="/">About Us</a>
            <a href="/">Our Services</a>
            <a href="/">Contact Us</a>
          </div>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Quick Links</div>
          <div className="footer-col-links">
            <a href="/">Home</a>
            <a href="/signup">Sign Up</a>
            <a href="/login">Login</a>
            <a href="/how-it-works">How it Works</a>
          </div>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Socials</div>
          <div className="socials">
            <a href="/"><Linkedin /></a>
            <a href="/"><Slack /></a>
          </div>
          <p>CrispCo - Line Manager</p>
          <p>
            Streamline and view tasks, manage departments, and optimize workflows, ensuring a smooth and productive work environment. 
          </p>
        </div>
      </div>
      <div className="tag">
        <a href="https://github.com/fraciah"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Crafted with 🤎 by Fraciah
        </a>
      </div>
    </footer>
  )
}

export default Footer;