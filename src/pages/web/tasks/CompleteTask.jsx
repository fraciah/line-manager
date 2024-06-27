import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const CompleteTask = ({ setShowComplete, taskIdParams, task }) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleComplete = async() => {
        try{
            setLoading(true);
            //mark task as completed in respective collections
            const taskRef = doc(db, "allTasks", taskIdParams);
            await updateDoc(taskRef, {
                status: "Completed",
                isActive: false,
                completedOn: Date.now(),
            });

            const taskEmployeeSubCollection = doc(db, "employees", task.assignedTo, "tasks", taskIdParams);
            await updateDoc(taskEmployeeSubCollection, {
                status: "Completed",
                isActive: false,
                completedOn: Date.now(),
            });

            const taskGroupSubCollection = doc(db, "groups", task.groupId, "tasks", taskIdParams);
            await updateDoc(taskGroupSubCollection, {
                status: "Completed",
                isActive: false,
                completedOn: Date.now(),
            });
            setLoading(false);
            setShowComplete(false);
            alert("Successfully cleared the task!");
            navigate("/tasks");
        }
        catch(error){
            setError(error.message);
        }
    };

  return (
    <div className="overlay">
      <div className="modal-container">
        <X 
            className="close-btn"
            onClick={() => setShowComplete(false)}
        />
        {error && <div className="error-message">{error}</div>}
        <div className="title">Marking this task as completed will clear it from your task board</div>
        <div className="actions">
            <button 
                className="task-btn del"
                onClick={() => setShowComplete(false)}
            >
                Cancel
            </button>
            <button 
                className="task-btn edit"
                onClick={handleComplete}
                >
                {loading ? "Loading..." : "Proceed"}
            </button>
        </div>
      </div>
    </div>
  )
}

export default CompleteTask;