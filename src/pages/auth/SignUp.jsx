import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [ error, setError ] = useState("");
    const navigate = useNavigate();

    const onSignIn = async(userData) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
           
            const userDoc = doc(db, "users", userData.email);
            await setDoc(userDoc, {
                uid: auth.currentUser.uid,
                email: userData.email,
                role: "Employee",
                isAdmin: false,
            });
            navigate("/login");
        } 
        catch (error) {
            if(error.code === "auth/email-already-in-use"){
                console.log("Email already exists");
                setError(error.code);
            }
            else if(error.code === "auth/provider-already-linked"){
                console.log("The provider is already linked to another account");
                setError("The provider is already linked to another account");
            }
            else{
                console.log("!register",error);
                setError(error);
            }
        }
    }

  return (
    <div className="">
        <form className="" onSubmit={handleSubmit(onSignIn)}>
            <div className="">SignUp</div>
            {error && <div className="">{error}</div>}
            <div>
                <label htmlFor="">Email</label>
                <div className="">{errors?.email?.message}</div>
                <input {...register("email", {
                    required: "Please enter your email address",
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
                    required: "Please enter a password",
                    minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters long',
                    },
                })} 
                    className="" 
                    type="password" 
                    placeholder="Enter your password"
                />
            </div>
            
            <button className="">SignUp</button>
               
            <div className="">
                <p>Already signed up? <span onClick={() => navigate("/login")}>Login here</span></p>
            </div>
        </form>
    </div>
  )
}

export default SignUp;