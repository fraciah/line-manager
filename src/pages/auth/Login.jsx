import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Login = () => {
  const [ error, setError ] = useState("");
  const navigate = useNavigate();
  const { register,
          handleSubmit,
          formState: { errors },
        } = useForm();


  const onLogin = async(userData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
      const user = userCredential.user;
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      navigate("/users");
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
    <div className="">
      <form className="" onSubmit={handleSubmit(onLogin)}>
        <div className="">Login</div>
        {error && <div className="">{error}</div>}
        <div>
          <label htmlFor="">Email</label>
          <div className="">{errors?.email?.message}</div>
          <input {...register("email", {
                    required: "Please enter your email"
                })} 
                    className="" 
                    type="text" 
                    placeholder="Enter your email"
            />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <div className="">{errors?.password?.message}</div>
          <input {...register("password", {
                    required: "Please enter a password"
                })} 
                    className="" 
                    type="password" 
                    placeholder="Enter your password"
            />
        </div>
        <div className="auth-btn-container">
          <button className="btn">Login</button>
        </div>
        <div className="">
            <p>Not registered? <span onClick={() => navigate("/signup")}>Register here</span></p>
        </div>
      </form>
    </div>
  )
}

export default Login;