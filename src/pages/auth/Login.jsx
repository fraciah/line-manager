import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logoTrim from "../../assets/images/logoTrim.png";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [ error, setError ] = useState("");
  const navigate = useNavigate();
  const { register,
          handleSubmit,
          formState: { errors },
        } = useForm();


  const onLogin = async(userData) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      setLoading(false);  
      navigate("/profile");
    } 
    catch (error) {
      console.log(error);
      console.log(error.code);
      if(error.code === "auth/invalid-credential" || error.code === "auth/invalid-email"){
        setError("Please enter the correct email and/or password")
      }
      else {
        setError("An error occurred. Please try again later.");
      }
    }
  }

  return (
  <div className="auth-container">
    <form onSubmit={handleSubmit(onLogin)}>
      <div className="auth-title-holder">
        <div className="img-holder">
          <img src={logoTrim} alt="img" />
        </div>
        <div className="auth-title">Line Manager</div>
        <span>
          Login to get started
        </span>  
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="auth-details">
        <label htmlFor="">Email</label>
        <div className="error-message">{errors?.email?.message}</div>
        <input {...register("email", {
                  required: "Please enter your email"
              })} 
                  className="auth-input" 
                  type="text" 
                  placeholder="Enter your email"
          />
      </div>
      <div className="auth-details">
        <label htmlFor="">Password</label>
        <div className="error-message">{errors?.password?.message}</div>
        <input {...register("password", {
                  required: "Please enter a password"
                })} 
                  className="auth-input" 
                  type="password" 
                  placeholder="Enter your password"
          />
      </div>
      <button className="btn auth-btn">
        {loading ? "Authenticating..." : "Login"}
      </button>
      <div className="auth-redirect">
          <p>Not registered? <span onClick={() => navigate("/signup")}>Register here</span></p>
      </div>
    </form>
  </div>
  )
}

export default Login;