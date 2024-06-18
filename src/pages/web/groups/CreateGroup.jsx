import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";

const CreateGroup = ({setShowModal}) => {
    const { user } = useAuth();
    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [ error, setError ] = useState("");
    const createGroup = async (groupData) => {
        if(groupData.groupName.trim().length === 0) return setError("Please enter the group name");
        try {
            const groupCollectionRef = collection(db, "groups");
            await addDoc(groupCollectionRef, {
                createdBy: user.uid,
                name: groupData.groupName,
                createdAt: Date.now(),
            });
            alert("Group created successfully!");
            setShowModal(false);
        } catch (error) {
            setError(error.message);
        }
    };

  return (
    <div className="overlay">
        <div className="new-group-container">
            <X 
                className="close-btn"
                onClick={() => setShowModal(false)}
            />
            {error && <div className="error-message">{error}</div>}
            <div className="title">Create New Group</div>
            <form onSubmit={handleSubmit(createGroup)}>
                <div className="form-group">
                    <label htmlFor="">Group Name</label>
                    <div className="error-message">{errors?.groupName?.message}</div>
                    <input {...register("groupName", {
                        required: "Please enter the group name"
                    })} 
                        className="create-input" 
                        type="text" 
                        placeholder="Enter group Name"
                    />
                </div>
                <button className="btn create">Create</button>
            </form>
        </div>
    </div>
  )
}

export default CreateGroup;