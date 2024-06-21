import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import useCollection from "../../../hooks/useCollection";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const TaskView = () => {
  const { user } = useAuth();
  const urlParams = useParams();
  const navigate = useNavigate();
  const { data: allTasksCollection, loading: allTasksCollectionLoading } = useCollection("allTasks");
  const { document: task, loading: taskLoading } = useFireStoreDoc("allTasks", urlParams?.id);
  const { document: manager, loading: managerLoading } = useFireStoreDoc("managers", task?.assignedBy);
  const { document: currentUser, loading: currentUserLoading } = useFireStoreDoc("users", user?.uid);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const taskExistsInAllTask = allTasksCollection && allTasksCollection?.find(task => task.id === urlParams?.id);

  const deleteTask = async() => {
    try{
      setLoading(true);
      //delete task from tasks subcollection of employees collection
      const taskSubRef = doc(db, "employees", user?.uid, "tasks", urlParams?.id);
      await deleteDoc(taskSubRef);
      setLoading(false);
      navigate("/tasks");
      alert("Task cleared successfully");
    }
    catch(error){
      setError(error.message);
    }
  };

  //if task is deleted from allTasks collection
  if((taskExistsInAllTask === undefined)){
    return (
      <div className="page-container">
        {error && <div className="error-message">{error}</div>}
        <div className="task-deleted">
          <div>This task was deleted</div>
          {currentUser?.role === "Employee" &&
            <button
              className="btn" 
              onClick={deleteTask}>
              {loading ? "Clearing..." : "Clear from your tasks"}
            </button>
          }
        </div>
      </div>
    )
  }
   
  if(taskLoading || 
    managerLoading ||
    currentUserLoading ||
    allTasksCollectionLoading
  ) return <div>Loading...</div>;

  
  return (
    <div className="page-container">
      {showModal && <DeleteModal 
                        setShowModal={setShowModal} 
                        taskIdParams={urlParams?.id}
                        groupId={task?.groupId}
                    />}
      <div className="header">
        <div className="user-header-title">
          <div>
              <Link to="/tasks" className="user-page-title">Tasks</Link>
          </div>
          <div>
              <ChevronRight />
              <div className="user-page-title">View Task</div>
          </div>
        </div>
      </div>
      <div>
        <div className="task-info">
          <div className="task-title">{task?.taskTitle}</div>
          <div className="task-desc">{task?.taskDesc}</div>
        </div>
        <div className="item-container">
          <div className="item-details">
            <div className="details">
              <div className="item-detail">
                <span className="detail-title">Group:</span>
                <span>{task?.groupName}</span>
              </div>
              <div className="item-detail">
                <span className="detail-title">Status:</span>
                <span>{task?.status}</span>
              </div>
              <div className="item-detail">
                <span className="detail-title">Assigned To:</span>
                {currentUser?.role != "Employee" ?
                  <Link to={`/employees/${task?.assignedTo}/view`}>
                    {task?.assignedToName? task?.assignedToName : "Name not provided"}
                  </Link>
                  : <span>{task?.assignedToName? task?.assignedToName : "Name not provided"}</span>
                }
              </div>
              <div className="item-detail">
                <span className="detail-title">Assigned By:</span>
                {currentUser?.role != "Employee" ?
                  <Link to={`/managers/${task?.assignedBy}/view`}>
                    {manager?.name ? manager?.name : "Name not provided"}
                  </Link>
                  : <span>{manager?.name ? manager?.name : "Name not provided"}</span>
                }
              </div>
              <div className="item-detail">
                <span className="detail-title">Added On:</span>
                <span>{new Date(task?.assignedAt).toDateString()}</span>
              </div>
              {task?.editedOn && 
                <div className="item-detail">
                  <span className="detail-title">Edited On:</span>
                  <span>{new Date(task?.editedOn).toDateString()}</span>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="actions">
          {(currentUser?.role === "Admin" || currentUser?.id === task?.assignedBy) ? (
            <>
              <Link 
                to={`/tasks/${task.id}/edit`}
                className="task-btn edit"
              >Edit</Link>
              <button 
                className="task-btn del"
                onClick={() => setShowModal(true)}
              >Delete</button>
            </>
          ) : currentUser?.role === "Manager" ? (
              <>
                <button 
                  disabled 
                  className="task-btn disabled"
                  title="Action not allowed. Please contact the respective manager."
                  >Edit</button>
                <button 
                  disabled 
                  className="task-btn disabled"
                  title="Action not allowed. Please contact the respective manager."
                >Delete</button>
              </>
            ) : (
              <button 
                className="task-btn btn"
                title="Under development"
              >Mark as in Progress</button>
            )}
        </div>
      </div>
    </div>
  )
}

export default TaskView;
