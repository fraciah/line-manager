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
    const [selectedGroup, setSelectedGroup] = useState(null); ///////
    const [searchGroup, setSearchGroup] = useState("");  //////
    const [filteredGroups, setFilteredGroups] = useState([]); //////
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchUser, setSearchUser] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [error, setError] = useState("");
    const { data : groupMembers, loading: groupMembersLoading } = useSubCollection("groups", selectedGroup?.id, "groupMembers");
    // console.log("groupMembers", groupMembers);
    // console.log("selectedUser",selectedUser)

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
    console.log("SElected User", selectedUser)

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
    // console.log("selectedUser", selectedUser)

    const addTask = async (data) => {
        if (!selectedUser) {
            setError("Please choose an employee for this task");
            return;
        }
        try{
            //add new task to allTasks collection and respective employee and group tasks subcollections
            const taskRef = doc(collection(db, "allTasks"));
            const taskId = taskRef.id;

            const taskEmployeeSubCollection = doc(db, "employees", selectedUser.groupMemberId, "tasks", taskId);
            await setDoc(taskEmployeeSubCollection, {
                taskTitle: data.taskTitle,      
                taskDesc: data.taskDesc,
                assignedTo: selectedUser.groupMemberId,
                assignedToName: selectedUser.name,
                assignedAt: Date.now(),
                assignedBy: user.uid,
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
                status: "Not Started",
                isActive: true,
            });
            
            setError("");
            alert("Task details added successfully!");
            navigate("/tasks")
        }
        catch (error) {
            setError(error.message);
        }
        console.log("data", data);
    };


  return (
    <div className="page-container">
        <div className="header">
            <div className="header-title">
                <Link to="/tasks" className="page-title">Tasks</Link>
                <ChevronRight />
                <div className="">Add a Task</div>
            </div>
            <Link to="/tasks">Cancel</Link >
        </div>

        <div className="page-content">
            <form onSubmit={handleSubmit(addTask)}>
                {error && <div className="">{error}</div>}
                <div>
                    <label htmlFor="">Task Title</label>
                    <div className="">{errors?.taskTitle?.message}</div>
                    <input {...register("taskTitle", {
                        required: "Please enter the task title"
                    })} 
                        className="" 
                        type="text" 
                        placeholder="Enter a task title"
                    />
                </div>
                <div>
                    <label htmlFor="">Task Description</label>
                    <div className="">{errors?.taskDesc?.message}</div>
                    <textarea {...register("taskDesc", {
                        required: "Please enter the task description"
                    })} 
                        className="" 
                        placeholder="Enter a task description"
                    />
                </div>
                <div>
                    <label htmlFor="">Group</label>
                    <div>
                        <input
                            type="text"
                            {...register("searchGroup", {
                                required: "Please enter the group",
                                onChange: onGroupChange,
                            })}
                            placeholder="Search for group"
                        />
                        <div>
                            {filteredGroups?.map(group => (
                                <div 
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
                <div>
                    <label htmlFor="">Assign to</label>
                    <div className="">{errors?.searchUser?.message}</div> 
                    <div>
                        <input
                            type="text"
                            {...register("searchUser", {
                                required: "Please choose an employee for this task",
                                onChange: onUserChange,
                            })}
                            placeholder="Search for user"
                        />
                        <div>
                            {filteredUsers?.map(user => (
                                <div 
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
                    <button className="btn">Assign</button>
                    :
                    <button disabled>Assign</button>
                }
            </form>
        </div>
    </div>
  )
}

export default AddTask;