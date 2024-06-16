import useAuth from "../../../hooks/useAuth";
import { db } from "../../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import useCollection from "../../../hooks/useCollection";
import useSubCollection from "../../../hooks/useSubCollection";
import Table from "../../../components/Table";
import { ChevronRight, Watch } from "lucide-react";

const GroupView = () => {
    const { user } = useAuth();
    const urlParams = useParams();
    const id = urlParams?.id;
    const navigate = useNavigate();
    const { register, getValues, handleSubmit, setValue } = useForm();
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { document: groupDoc, loading: groupDocLoading } = useFireStoreDoc("groups", id);
    const { data: employeesCollection, loading: employeesCollectionLoading } = useCollection("employees");
    const { data: usersCollection, loading: usersCollectionLoading } = useCollection("users");
    const { data : groupMembers, loading: groupMembersLoading } = useSubCollection("groups", id, "groupMembers");
    const { data : groupTasks, loading: groupTasksLoading } = useSubCollection("groups", id, "tasks");

    //filter employees based on search term
    useEffect(() => {
        if(employeesCollection){
            if (searchTerm === "") {
                setFilteredEmployees([]);
            } 
            else{
                setFilteredEmployees(
                    employeesCollection.filter(employee =>
                        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
            }
        }
    }, [searchTerm, employeesCollection]);
    
    const onSearchChange = () => {
        const searchTerm = getValues("search");
        setSearchTerm(searchTerm);
    };

    //update search input with clicked employee
    const selectEmployee = (employee) => {
        setValue("search", employee.name);
        setSelectedEmployee(employee);
        setFilteredEmployees([]);
    };
    
    const addUser = async() => {
        if (selectedEmployee) {
            //check if employee is already a member of the group
            const isAlreadyMember = groupMembers.some(member => member.groupMemberId === selectedEmployee.id);
            if (isAlreadyMember) {
                setError("Employee is already a member of this group");
                return;
            }
            
            try {
                //add employee to groupMembers subcollection in the group collection
                const groupRef = collection(db, "groups", id, "groupMembers");
                await addDoc(groupRef, {
                    groupMemberId: selectedEmployee.id,
                    name : selectedEmployee.name,
                    addedAt: Date.now(),
                    addedBy: user.uid,
                });

                //add group to employee's groups subcollection in the employees collection
                const memberGroupRef = doc(db, "employees", selectedEmployee.id, "memberGroups", id);
                await setDoc(memberGroupRef, {
                    groupId: id,
                    name: groupDoc.name,
                    addedAt: Date.now(),
                    addedBy: user.uid,
                });

                setSelectedEmployee(null);
                setValue("search", "");
                alert("User added to group successfully!");
            }
            catch (error) {
                setError(error.message);
            }
        }
    };    

    const groupMemberColumns = [
        {
            name: "Name",
            selector: (row) => row.name,
        },
        {
            name: "Added At",
            selector: (row) => new Date(row.addedAt).toDateString(),
        },
        {
            name: "Added By (Manager ID)",
            selector: (row) => row.addedBy,
        },
        {
            name : "Added By (Manager Name)",
            selector: (row) => {
                const manager = usersCollection.find(user => user.id === row.addedBy);
                return manager ? manager.name : "Unknown";
            }
        }
    ];

    const groupMemberClicked = (groupMember) => {
        navigate(`/employees/${groupMember.groupMemberId}/view`)
    };

    const groupTaskColumns = [
        {
            name: "Task Title",
            selector: (row) => row.taskTitle,
        },
        {
            name: "Assigned To",
            selector: (row) => {
                const user = usersCollection.find(user => user.id === row.assignedTo);
                return user ? user.name : "Unknown";
            },
        },
        {
            name: "Assigned At",
            selector: (row) => new Date(row.assignedAt).toDateString(),
        },
        {
            name : "Assigned By",
            selector: (row) => {
                const manager = usersCollection.find(user => user.id === row.assignedBy);
                return manager ? manager.name : "Unknown";
            }
        },
        {
            name: "Status",
            selector: (row) => row.status,
        }
    ];
    if(groupDocLoading) return <div>Loading...</div>

  return (
    <div className="page-container">
        <div className="header">
            <div className="header-title">
                <Link to="/groups" className="page-title title">Groups</Link>
                <ChevronRight />
                <div className="page-title">{groupDoc?.name}</div>
            </div>
        </div>
        <form 
            onSubmit={handleSubmit(addUser)}
            className="add-user"
        >
            {error && <div className="">{error}</div>}
            <div>
                <input
                    type="text"
                    {...register("search", {
                        onChange: onSearchChange,
                    })}
                    placeholder="Search for user"
                />
                <div>
                    {filteredEmployees.map(employee => (
                        <div 
                            key={employee.id}
                            onClick={() => selectEmployee(employee)}
                        >{employee.name}</div>
                    ))}
                </div>
            </div>
            <button>Add User</button>
        </form>

        <div className="inner-navs">
            <NavLink 
                to={`/groups/${id}/view/groupMembers`}
            >
                Group Members 
            </NavLink>
            <NavLink 
                to={`/groups/${id}/view/tasks`}
            >
                Tasks 
            </NavLink>
        </div>

        {(urlParams?.view === undefined || urlParams?.view === "groupMembers") && (
            <Table 
                columns={groupMemberColumns} 
                data={groupMembers}
                onRowClicked={groupMemberClicked}
            />
        )}
        {urlParams?.view === "tasks" && (
            <Table 
                columns={groupTaskColumns} 
                data={groupTasks}
                // onRowClicked={groupTaskClicked}
            />
        )}
    </div>
  )
}

export default GroupView;