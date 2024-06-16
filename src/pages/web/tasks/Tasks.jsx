import useAuth from "../../../hooks/useAuth";
import { Link, NavLink, useParams } from "react-router-dom";
import useCollection from "../../../hooks/useCollection";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import Table from "../../../components/Table";

const Tasks = () => {
  const { user } = useAuth();
  const urlParams = useParams();
  const { document: userDoc, loading: userDocLoading } = useFireStoreDoc("users", user?.uid);
  console.log("userDoc", userDoc, userDocLoading)
  const { data: usersCollection, loading: usersCollectionLoading } = useCollection("users");
  const { data: tasksCollection, loading: tasksCollectionLoading } = useCollection("allTasks");

  let pendingTasks, completedTasks;
  if (tasksCollection) {
    pendingTasks = tasksCollection.filter(task => task.status === "Not Started");
    completedTasks = tasksCollection.filter(task => task.status === "Done");
  };
  console.log(pendingTasks, completedTasks);

  const taskColumns = [
    {
      name: "Task Name",
      selector: (row) => row.taskTitle,
    },
    {
      name: "Created By (Manager)",
      selector: (row) => {
        const manager = usersCollection?.find(user => user.id === row.assignedBy);
        return manager ? manager.name : "Unknown";
      },
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.assignedAt).toDateString(),
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

  if (tasksCollectionLoading) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="header">
        <Link to="/tasks" className="page-title">Tasks</Link>
        {(userDoc?.role === "Manager" || userDoc?.role === "Admin") && (
          <Link to="/tasks/addTask">Add a Task</Link>
        )}
      </div>
      <div className="page-content">
        <div>An overview of all tasks</div>
        {(userDoc?.role === "Manager" || userDoc?.role === "Admin") && (
          <>
          <div className="inner-navs">
            <NavLink to="/tasks/notStarted">Not Started</NavLink>
            <NavLink to="/tasks/inProgress">In Progress</NavLink>
            <NavLink to="/tasks/completed">Completed</NavLink>
          </div>
          {(urlParams?.taskStatus === undefined || urlParams?.taskStatus === "notStarted") && (
            <Table 
              columns={taskColumns} 
              data={pendingTasks}
            />
          )}
          {urlParams?.taskStatus === "completed" && (
            <Table 
              // columns={taskColumns} 
              data={completedTasks}
            />
          )}
          </>
        )}
        {userDoc?.role === "Employee" && (
          <>
          <div className="inner-navs">
            <NavLink to="/tasks/notStarted">Not Started</NavLink>
            <NavLink to="/tasks/inProgress">In Progress</NavLink>
          </div>
          {(urlParams?.taskStatus === undefined || urlParams?.taskStatus === "notStarted") && (
            <Table 
              columns={taskColumns} 
              data={pendingTasks}
            />
          )}
          {urlParams?.taskStatus === "inProgress" && (
            <Table 
              // columns={taskColumns} 
              data={completedTasks}
            />
          )}
          </>
        )}
      </div>
    </div>
  );
};

export default Tasks;