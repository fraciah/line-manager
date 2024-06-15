import { Link } from "react-router-dom";

const Tasks = () => {
  return (
    <div className="page-container">
      <div className="header">
        <Link to="/tasks" className="page-title">Tasks</Link>
        <Link to="/tasks/addTask">Add a Task</Link >
      </div>
    </div>
  )
}

export default Tasks;