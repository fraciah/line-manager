import useAuth from "../../../hooks/useAuth";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import useCollection from "../../../hooks/useCollection";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import Table from "../../../components/Table";
import useSubCollection from "../../../hooks/useSubCollection";
import Loading from "../../../components/Loading";

const Tasks = () => {
  const { user } = useAuth();
  const urlParams = useParams();
  const navigate = useNavigate();
  const { document: userDoc, loading: userDocLoading } = useFireStoreDoc("users", user?.uid);
  const { data: usersCollection, loading: usersCollectionLoading } = useCollection("users");
  const { data: tasksCollection, loading: tasksCollectionLoading } = useCollection("allTasks");
  const { data: employeeTasks, loading: employeeTasksLoading } = useSubCollection("employees", user?.uid, "tasks");

  let notStartedTasks, inProgressTasks, completedTasks;

  if (tasksCollection) {
    if (userDoc?.role === "Employee") {
      //filtering tasks for employee
      notStartedTasks = employeeTasks && employeeTasks.filter(task => task.status === "Not Started");
      inProgressTasks = employeeTasks && employeeTasks.filter(task => task.status === "In Progress");
    }
    //filtering tasks for manager, admin
    else {
      notStartedTasks = tasksCollection && tasksCollection.filter(task => task.status === "Not Started");
      inProgressTasks = tasksCollection && tasksCollection.filter(task => task.status === "In Progress");
      completedTasks = tasksCollection && tasksCollection.filter(task => task.status === "Done");
    }
  };

  const taskColumns = [
    {
      name: "Task Name",
      selector: (row) => row.taskTitle,
    },
    {
      name: "Created By",
      selector: (row) => {
        const manager = usersCollection?.find(user => user.id === row.assignedBy);
        return manager?.name ? manager.name : "Admin";
      },
    },
    {
      name: "Created On",
      selector: (row) => new Date(row.assignedAt).toDateString(),
    },
    {
      name: "Edited On",
      selector: (row) => row.editedOn ? new Date(row.editedOn).toDateString() : "-",
    },
    // {
    //   name: "Assigned To",
    //   selector: (row) => {
    //     const user = usersCollection?.find(user => user.id === row.assignedTo);
    //     return user ? user.name : "Unknown";
    //   },
    // },
    {
      name: "Group",
      selector: (row) => row.groupName,
    },
  ];
  if (userDoc?.role === "Manager" || userDoc?.role === "Admin") {
    taskColumns.push({
      name: "Assigned To",
      selector: (row) => {
        const user = usersCollection?.find(user => user.id === row.assignedTo);
        return user ? user.name : "Unknown";
      },
    });
  }
  const taskClicked = (row) => {
    navigate(`/tasks/${row.id}/view`);
  };

  return (
    <>
    <Loading isLoading={userDocLoading || 
                        usersCollectionLoading || 
                        tasksCollectionLoading || 
                        employeeTasksLoading} 
    />
    <div className="page-container">
      <div className="header">
        <Link to="/tasks" className="page-title">Tasks</Link>
        {(userDoc?.role === "Manager" || userDoc?.role === "Admin") && (
          <Link 
            to="/tasks/addTask"
            className="add-btn" 
          >Add a Task</Link>
        )}
      </div>
      <div className="page-content">
        <div>An overview of all tasks</div>
        {(userDoc?.role === "Manager" || userDoc?.role === "Admin") && (
          <>
          <div className="inner-navs">
            <div className="card-navs-holder">
              <NavLink 
                to="/tasks/notStarted"
                className={`card-nav ${urlParams?.taskStatus === undefined ? "active" : ""}`}
              >
                Not Started
              </NavLink>
              <NavLink 
                to="/tasks/inProgress"
                className="card-nav"
              >
                In Progress
              </NavLink>
              <NavLink 
                to="/tasks/completed"
                className="card-nav"
              >
                Completed
              </NavLink>
            </div>
          </div>
          {(urlParams?.taskStatus === undefined || urlParams?.taskStatus === "notStarted") && (
            <Table 
              columns={taskColumns} 
              data={notStartedTasks}
              onRowClicked={taskClicked}
            />
          )}
          {urlParams?.taskStatus === "inProgress" && (
            <Table 
              columns={taskColumns} 
              data={inProgressTasks}
              onRowClicked={taskClicked}
            />
          )}
          {urlParams?.taskStatus === "completed" && (
            <Table 
              columns={taskColumns} 
              data={completedTasks}
            />
          )}
          </>
        )}
        {userDoc?.role === "Employee" && (
          <>
          <div className="inner-navs">
            <div className="card-navs-holder">
              <NavLink 
                to="/tasks/notStarted"
                className={`card-nav ${urlParams?.taskStatus === undefined ? "active" : ""}`}
              >Not Started</NavLink>
              <NavLink 
                to="/tasks/inProgress"
                className="card-nav"
              >In Progress</NavLink>
            </div>
          </div>
          {(urlParams?.taskStatus === undefined || urlParams?.taskStatus === "notStarted") && (
            <Table 
              columns={taskColumns} 
              data={notStartedTasks}
              onRowClicked={taskClicked}
            />
          )}
          {urlParams?.taskStatus === "inProgress" && (
            <Table 
              columns={taskColumns} 
              data={inProgressTasks}
              onRowClicked={taskClicked}
            />
          )}
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default Tasks;