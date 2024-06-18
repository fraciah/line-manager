import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import logoTrim from "../../assets/images/logoTrim.png";

const SignUp = () => {
    const { register, 
            handleSubmit, 
            formState: { errors }, 
        } = useForm();
    const [loading, setLoading] = useState(false);
    const [ error, setError ] = useState("");
    const navigate = useNavigate();

    const onSignUp = async(userData) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
           
            const userDoc = doc(db, "users", auth.currentUser.uid);
            await setDoc(userDoc, {
                uid: auth.currentUser.uid,
                email: userData.email,
                role: "Employee",
                isAdmin: false,
                isActive: true,
            });

            const employeeDocRef = doc(db, "employees", auth.currentUser.uid);
            await setDoc(employeeDocRef, {
                uid: auth.currentUser.uid,
                email: userData.email,
                role: "Employee",
                isAdmin: false,
                isActive: true,
            })
            alert("Sucessfully signed up");
            setLoading(false);
            navigate("/login");
        } 
        catch (error) {
            setLoading(false);
            if(error.code === "auth/email-already-in-use"){
                console.log("Email already exists");
                setError(error.code);
                setLoading(false);
            }
            else if(error.code === "auth/provider-already-linked"){
                console.log("The provider is already linked to another account");
                setError("The provider is already linked to another account");
                setLoading(false);
            }
            else{
                console.log("!register",error);
                setError(error.message);
            }
        }
    }

  return (
    <div className="auth-container">
        <form onSubmit={handleSubmit(onSignUp)}>
            <div className="auth-title-holder">
                <div className="img-holder">
                    <img src={logoTrim} alt="img" />    
                </div>
                <div className="auth-title">Line Manager</div>
                <span>
                    Sign up to get started 
                </span>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="auth-details">
                <label htmlFor="">Email</label>
                <div className="error-message">{errors?.email?.message}</div>
                <input {...register("email", {
                    required: "Please enter your email address",
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
                    required: "Please enter your password",
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters long',
                    },
                })} 
                    className="auth-input" 
                    type="password" 
                    placeholder="Enter your password"
                />
            </div>
            <button className="btn auth-btn"
            >
                {loading? "Getting started..." : "Sign Up"}
            </button>
            <div className="auth-redirect">
                <p>Already signed up? <span onClick={() => navigate("/login")}>Login here</span></p>
            </div>
        </form>
    </div>
  )
}

export default SignUp;