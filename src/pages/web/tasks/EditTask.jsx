import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import { ChevronRight } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Loading from "../../../components/Loading";

const EditTask = () => {
  const urlParams = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors }} = useForm();
  const { document: task, loading: taskLoading } = useFireStoreDoc("allTasks", urlParams?.id);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setValue("taskTitle", task.taskTitle);
      setValue("taskDesc", task.taskDesc);
      setValue("taskGroup", task.groupName);
      setValue("searchUser", task.assignedToName);
    }
  }, [task]);

  const editTask = async (data) => {
    setLoading(true);
    try {
      //edit a task in respective collections
      const taskRef = doc(db, "allTasks", urlParams?.id);
      await updateDoc(taskRef, {
        taskTitle: data.taskTitle,
        taskDesc: data.taskDesc,
        editedOn: Date.now(),
      });

      const taskEmployeeSubCollection = doc(db, "employees", task.assignedTo, "tasks", urlParams?.id);
      await updateDoc(taskEmployeeSubCollection, {
        taskTitle: data.taskTitle,
        taskDesc: data.taskDesc,
        editedOn: Date.now(),
      });

      const taskGroupSubCollection = doc(db, "groups", task.groupId, "tasks", urlParams?.id);
      await updateDoc(taskGroupSubCollection, {
        taskTitle: data.taskTitle,
        taskDesc: data.taskDesc,
        editedOn: Date.now(),
      });
      setError("");
      setLoading(false);
      alert("Task edited successfully!");
      navigate(`/tasks/${urlParams?.id}/view`);
    }
    catch(error){
      setError(error.message)
    }
  };
  
  return (
    <>
    <Loading isLoading={taskLoading}/>
    <div className="page-container">
      <div className="header">
        <div className="user-header-title">
          <div>
            <Link to="/tasks" className="user-page-title">Tasks</Link>
          </div>
          <div>
            <ChevronRight />
            <Link to={`/tasks/${urlParams?.id}/view`} className="user-page-title view-task">View Task</Link>
            <ChevronRight />
            <div className="user-page-title">Edit Task</div>
          </div>
        </div>
        <Link to={`/tasks/${urlParams?.id}/view`} className="btn-cancel">Cancel</Link >
      </div>
      <div className="page-content">
        <form onSubmit={handleSubmit(editTask)} className="task-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="">Task Title</label>
            <div className="error-message">{errors?.taskTitle?.message}</div>
            <input {...register("taskTitle",
              { required: "Please enter the task title" }
            )}
              className="task-input" 
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Task Description</label>
            <div className="error-message">{errors?.taskDesc?.message}</div>
            <textarea {...register("taskDesc",
              { required: "Please enter the task description" }
            )}
              className="task-input"
              rows="5"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="">Group</label>
            <input 
              {...register("taskGroup")}
              className="task-input disabled"
              disabled
             />
          </div>
          <div className="form-group">
            <label htmlFor="">Assign to</label>
            <input 
              {...register("searchUser")}
              className="task-input disabled"
              disabled
            />
          </div>
          <button className="btn assign">
            {loading ? "Editing..." : "Edit Task"}
          </button>
        </form>
      </div>
    </div> 
    </>
  )
}

export default EditTask;