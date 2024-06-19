import useAuth from "../../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import { ChevronRight } from "lucide-react";

const TaskView = () => {
  const { user } = useAuth();
  const urlParams = useParams();
  const { document: task, loading: taskLoading } = useFireStoreDoc("allTasks", urlParams?.id);
  const { document: manager, loading: managerLoading } = useFireStoreDoc("managers", task?.assignedBy);
  const { document: currentUser, loading: currentUserLoading } = useFireStoreDoc("users", user?.uid);

  if(taskLoading || 
    managerLoading ||
    currentUserLoading
  ) return <div>Loading...</div>;
  
  return (
    <div className="page-container">
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
                <span className="detail-title">Added On:</span>
                <span>{new Date(task?.assignedAt).toDateString()}</span>
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
                <span className="detail-title">Status:</span>
                <span>{task?.status}</span>
              </div>
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
                title="Under development"
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
