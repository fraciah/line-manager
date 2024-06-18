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
            <div className="user-header-title">
                <div>
                    {/* <Users /> */}
                    <Link to="/employees" className="user-page-title">Employees</Link>
                </div>
                <div>
                    <ChevronRight />
                    <span className="user-page-title">Employee</span>    
                </div>
            </div>
        </div>
        <div className="user-holder">
            <div className="user-card">
                <div className="avatar">
                    {employeeDoc?.name ? employeeDoc?.name.slice(0, 2): "NA"}
                </div>
                <div className="user-card-details">
                    <div className="user-card-name">Name: {employeeDoc?.name ? employeeDoc?.name : "NA"}</div>
                    <div className="user-card-username">Username: {employeeDoc?.username ? employeeDoc?.username : "NA"}</div>
                </div>
            </div>
            <div className="user-container">
                <div className="user-details-container">
                    <div className="user-details">
                        <span>Id</span>
                        <div className="user-detail">{employeeDoc?.id}</div>
                    </div>
                    <div className="user-details">
                        <span>Phone</span>
                        <div className="user-detail">{employeeDoc?.phone ? employeeDoc?.phone : "NA"}</div>
                    </div>
                
                    <div className="user-details">
                        <span>Role</span>
                        <div className="user-detail">{employeeDoc?.role}</div>
                    </div>
                    <div className="user-details">
                        <span>Email</span>
                        <div className="user-detail">{employeeDoc?.email}</div>
                    </div>
                    <div className="user-details">
                        <span>City</span>
                        <div className="user-detail">{employeeDoc?.address?.city ? employeeDoc?.address?.city : "NA"}</div>
                    </div>
                    <div className="user-details">
                        <span>Street</span>
                        <div className="user-detail">{employeeDoc?.address?.street? employeeDoc?.address?.street : "NA"}</div>
                    </div>
                
                    <div className="user-details">
                        <span>Zipcode</span>
                        <div className="user-detail">{employeeDoc?.address?.zipcode? employeeDoc?.address?.zipcode : "NA"}</div>
                    </div>
                    <div className="user-details">
                        <span>Website</span>
                        <div className="user-detail">{employeeDoc?.website? employeeDoc?.website : "NA"}</div>
                    </div>
                    <div className="user-details">
                        <span>Joined On</span>
                        <div className="user-detail">NA</div>
                    </div>
                
                    <div className="user-details">
                        <span>Last Login</span>
                        <div className="user-detail">NA</div>
                    </div>
                </div>      
            </div>
        </div>
        <div className="inner-navs">
            <div className="card-navs-holder">
                <NavLink 
                    to={`/employees/${id}/view/groups`}
                    className={`card-nav ${urlParams?.view === undefined ? "active" : ""}`}
                >
                    Groups
                </NavLink>
            </div>
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