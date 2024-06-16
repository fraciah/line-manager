import { Link, NavLink, useParams } from "react-router-dom";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import useSubCollection from "../../../hooks/useSubCollection";
import useCollection from "../../../hooks/useCollection";
import Table from "../../../components/Table";
import { ChevronRight } from "lucide-react";

const EmployeeView = () => {
    const urlParams = useParams();
    const { id } = urlParams;
    const { data: managersCollection, loading: managersCollectionLoading } = useCollection("managers");
    const { document: employeeDoc, loading: employeeDocLoading } = useFireStoreDoc("employees", id);
    const { data: groupsSubCollection, loading: groupsSubCollectionLoading } = useSubCollection("employees", id, "memberGroups");
    
    const groupColumns = [
        {
            name: "Group Name",
            selector: (row) => row.name,
        },
        {
            name: "Added On",
            selector: (row) => new Date(row.addedAt).toDateString(),
        },
        {
            name: "Added By",
            selector: (row) => {
                const manager = managersCollection.find(manager => manager.id === row.addedBy);
                return manager ? manager.name : "Unknown";
            },
        }
    ];

    if(employeeDocLoading || managersCollectionLoading) return <div>Loading...</div>
  return (
    <div className="page-container">
        <div className="header">
            <div className="header-title">
                <Link to="/employees" className="page-title title">Employees</Link>
                <ChevronRight />
                <div className="page-title">Employee</div>
            </div>
        </div>
        <div className="user-holder">
            <div className="user-card">
                <div className="avatar">
                    {employeeDoc?.name.slice(0, 2)}
                </div>
                <div className="user-card-details">
                    <div className="user-card-detail">{employeeDoc?.name}</div>
                    <div className="user-card-detail">{employeeDoc?.username}</div>
                </div>
            </div>
            <div className="user-container">
                <div className="user-row">
                    <div className="user-col">
                        <div className="user-details">
                            <span>Id</span>
                            <div className="user-detail">{employeeDoc?.id}</div>
                        </div>
                        <div className="user-details">
                            <span>Phone</span>
                            <div className="user-detail">{employeeDoc?.phone}</div>
                        </div>
                    </div>
                    <div className="user-col">
                        <div className="user-details">
                            <span>Role</span>
                            <div className="user-detail">{employeeDoc?.role}</div>
                        </div>
                        <div className="user-details">
                            <span>Email</span>
                            <div className="user-detail">{employeeDoc?.email}</div>
                        </div>
                    </div>
                </div>
                <div className="user-row">
                    <div className="user-col">
                        <div className="user-details">
                            <span>City</span>
                            <div className="user-detail">{employeeDoc?.address?.city}</div>
                        </div>
                        <div className="user-details">
                            <span>Street</span>
                            <div className="user-detail">{employeeDoc?.address?.street}</div>
                        </div>
                    </div>
                    <div className="user-col">
                        <div className="user-details">
                            <span>Zipcode</span>
                            <div className="user-detail">{employeeDoc?.address?.zipcode}</div>
                        </div>
                        <div className="user-details">
                            <span>Website</span>
                            <div className="user-detail">{employeeDoc?.website}</div>
                        </div>
                    </div>
                </div>
                <div className="user-row">
                    <div className="user-col">
                        <div className="user-details">
                            <span>Created On</span>
                            {/* <div className="user-detail">{user?.metadata?.createdAt}</div> */}
                        </div>
                    </div>
                    <div className="user-col">
                        <div className="user-details">
                            <span>Last Login</span>
                            {/* <div className="user-detail">{user?.metadata?.lastLoginAt}</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="inner-navs">
            <NavLink 
                to={`/employees/${id}/view/groups`}
            >
                Groups
            </NavLink>
        </div>
        {(urlParams?.view === undefined || urlParams?.view === "groups") && (
            <Table 
                columns={groupColumns} 
                data={groupsSubCollection}
            />
        )}
    </div>
  )
}

export default EmployeeView;