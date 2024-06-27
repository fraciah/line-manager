import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useCollection from "../../../hooks/useCollection";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import useSubCollection from "../../../hooks/useSubCollection";
import { db } from "../../../firebase";
import { setDoc, collection, doc } from "firebase/firestore";

const AddTask = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();
    const { data: groupsCollection, loading: groupsCollectionLoading  } = useCollection("groups");
    const { data: managersCollection, loading: managersCollectionLoading  } = useCollection("managers");
    const [selectedGroup, setSelectedGroup] = useState(null); ///////
    const [searchGroup, setSearchGroup] = useState("");  //////
    const [filteredGroups, setFilteredGroups] = useState([]); //////
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchUser, setSearchUser] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { data : groupMembers, loading: groupMembersLoading } = useSubCollection("groups", selectedGroup?.id, "groupMembers");

    useEffect(() => {
        if(groupsCollection){
            if (searchGroup === "") {
                setFilteredGroups([]);
            } 
            else{
                setFilteredGroups(
                    groupsCollection.filter(group =>
                        group.name.toLowerCase().includes(searchGroup.toLowerCase())
                    )
                );
            }
        }
    }, [searchGroup, groupsCollection]);

    useEffect(() => {
        if(groupMembers){
            if (searchUser === "") {
                setFilteredUsers([]);
            } 
            else{
                setFilteredUsers(
                    groupMembers.filter(user =>
                        user.name.toLowerCase().includes(searchUser.toLowerCase())
                    )
                );
            }
        }
    }, [searchUser, groupMembers]);

    const onGroupChange = () => {
        const searchGroup = getValues("searchGroup");
        setSearchGroup(searchGroup);
    };

    const selectGroup = (group) => {
        setValue("searchGroup", group.name);
        setSelectedGroup(group);
        setFilteredGroups([]);
    };

    const onUserChange = () => {
        const searchUser = getValues("searchUser");
        setSearchUser(searchUser);
    };

    const selectUser = (user) => {
        setValue("searchUser", user.name);
        setSelectedUser(user);
        setFilteredUsers([]);
    };

    const addTask = async (data) => {
        if (!selectedUser) {
            setError("Please choose an employee for this task");
            return;
        }
        //if selected user is a manager, show error////////
        const isManager = managersCollection.some(manager => manager.id === selectedUser.groupMemberId);
        if (isManager) {
            setError("Managers cannot be assigned tasks");
            return;
        }
        setLoading(true);
        try{
            //add new task to allTasks collection and respective employee and group tasks subcollections
            const taskRef = doc(collection(db, "allTasks"));
            const taskId = taskRef.id;

            const taskEmployeeSubCollection = doc(db, "employees", selectedUser.groupMemberId, "tasks", taskId);
            await setDoc(taskEmployeeSubCollection, {
                groupName: selectedGroup.name,
                taskTitle: data.taskTitle,      
                taskDesc: data.taskDesc,
                assignedTo: selectedUser.groupMemberId,
                assignedToName: selectedUser.name,
                assignedAt: Date.now(),
                assignedBy: user.uid,
                groupId: selectedGroup.id,
                editedOn: null,
                status: "Not Started",
                isActive: true,
            });

            const taskGroupSubCollection = doc(db, "groups", selectedGroup.id, "tasks", taskId);
            await setDoc(taskGroupSubCollection, {
                taskTitle: data.taskTitle,
                taskDesc: data.taskDesc,
                assignedTo: selectedUser.groupMemberId,
                assignedToName: selectedUser.name,
                assignedAt: Date.now(),
                assignedBy: user.uid,
                groupId: selectedGroup.id,
                editedOn: null,
                status: "Not Started",
                isActive: true,
            });

            await setDoc(taskRef, {
                groupId: selectedGroup.id,
                groupName: selectedGroup.name,
                taskTitle: data.taskTitle,
                taskDesc: data.taskDesc,
                assignedTo: selectedUser.groupMemberId,
                assignedToName: selectedUser.name,
                assignedAt: Date.now(),
                assignedBy: user.uid,
                editedOn: null,
                status: "Not Started",
                isActive: true,
            });
            setLoading(false);
            setError("");
            alert("Task details added successfully!");
            navigate("/tasks")
        }
        catch (error) {
            setError(error.message);
        }
        console.log("data", data);
    };

    if(groupsCollectionLoading) return <div>Loading...</div>;

  return (
    <div className="page-container">
        <div className="header">
            <div className="user-header-title">
                <div>
                    <Link to="/tasks" className="user-page-title">Tasks</Link>
                </div>
                <div>
                    <ChevronRight />
                    <div className="user-page-title">Add a Task</div>
                </div>
            </div>
            <Link to="/tasks" className="btn-cancel">Cancel</Link >
        </div>

        <div className="page-content">
            <form onSubmit={handleSubmit(addTask)} className="task-form">
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="">Task Title</label>
                    <div className="error-message">{errors?.taskTitle?.message}</div>
                    <input {...register("taskTitle", {
                        required: "Please enter the task title"
                    })} 
                        className="task-input" 
                        type="text" 
                        placeholder="Enter a task title"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Task Description</label>
                    <div className="error-message">{errors?.taskDesc?.message}</div>
                    <textarea {...register("taskDesc", {
                        required: "Please enter the task description"
                    })} 
                        className="task-input" 
                        placeholder="Enter a task description"
                        rows="5"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Group</label>
                    <div>
                        <input
                            type="text"
                            {...register("searchGroup", {
                                required: "Please enter the group",
                                onChange: onGroupChange,
                            })}
                            className="task-input"
                            placeholder="Search for group"
                        />
                        <div className="search-results">
                            {filteredGroups?.map(group => (
                                <div 
                                    className="search-result-item"
                                    key={group.id}
                                    onClick={() => selectGroup(group)}
                                >{group.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
                {selectedGroup && groupMembers.length === 0 && (
                    <div>
                        <p>No members in the group</p>
                    </div>
                )}
                {groupMembers.length > 0 && (
                <div className="form-group">
                    <label htmlFor="">Assign to</label>
                    <div className="error-message">{errors?.searchUser?.message}</div> 
                    <div>
                        <input
                            type="text"
                            {...register("searchUser", {
                                required: "Please choose an employee for this task",
                                onChange: onUserChange,
                            })}
                            className="task-input"
                            placeholder="Search for user"
                        />
                        <div className="search-results">
                            {filteredUsers?.map(user => (
                                <div 
                                    className="search-result-item"
                                    key={user.id}
                                    onClick={() => selectUser(user)}
                                >{user.name}</div>
                            ))}
                        </div>    
                    </div>
                </div>
                )}
                {/* <div>
                    <label htmlFor="">Due Date</label>
                    <input {...register("dueDate", {
                        required: "Please enter the due date"
                    })} 
                        className="" 
                        type="date" 
                    />
                </div> */}
                {groupMembers.length > 0 ?
                    <button className="btn assign">{loading? "Assigning..." : "Assign"}</button>
                    :
                    <button disabled className="disabled">Assign</button>
                }
            </form>
        </div>
    </div>
  )
}

export default AddTask;