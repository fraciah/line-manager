import useAuth from "../../../hooks/useAuth";
import { db } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import useCollection from "../../../hooks/useCollection";
import useSubCollection from "../../../hooks/useSubCollection";
import Table from "../../../components/Table";
import { ChevronRight, Watch } from "lucide-react";

const GroupView = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const { register, getValues, handleSubmit, setValue } = useForm();
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const { document: groupDoc, loading: groupDocLoading } = useFireStoreDoc("groups", id);
    const { data: employeesCollection, loading: employeesCollectionLoading } = useCollection("employees");
    const { data: usersCollection, loading: usersCollectionLoading } = useCollection("users");
    const { data : groupMembers, loading: groupMembersLoading } = useSubCollection("groups", id, "groupMembers");
    // console.log("groupMembers", groupMembers);
    // console.log("usersCollection",usersCollection)

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
                const groupRef = collection(db, "groups", id, "groupMembers");
                await addDoc(groupRef, {
                    groupMemberId: selectedEmployee.id,
                    name : selectedEmployee.name,
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

    const columns = [
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
                        >{employee.name}ee</div>
                    ))}
                </div>
            </div>
            <button>Add User</button>
        </form>
        <Table 
            columns={columns} 
            data={groupMembers}
            // onRowClicked={userClicked}
        />
    </div>
  )
}

export default GroupView;