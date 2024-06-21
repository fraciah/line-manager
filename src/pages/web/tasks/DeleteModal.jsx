import { deleteDoc, doc } from "firebase/firestore";
import { X } from "lucide-react";
import { useState } from "react";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({setShowModal, taskIdParams, groupId}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const deleteTask = async() => {
        try{
            setLoading(true);
            //delete task from allTasks collection and tasks subcollection of groups
            const taskRef = doc(db, "allTasks", taskIdParams);
            const taskSubRef = doc(db, "groups", groupId, "tasks", taskIdParams);
            await deleteDoc(taskRef);
            await deleteDoc(taskSubRef);
            setLoading(false);
            setShowModal(false);
            navigate("/tasks"); ///test this
            alert("Task deleted successfully");
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
            onClick={() => setShowModal(false)}
        />
        {error && <div className="error-message">{error}</div>}
        <div className="title">Are you sure you want to delete this task?</div>
        <div className="actions">
            <button 
                className="task-btn edit"
                onClick={deleteTask}
            >
                {loading ? "Deleting..." : "Yes"}
            </button>
            <button 
                className="task-btn del"
                onClick={() => setShowModal(false)}>No</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;