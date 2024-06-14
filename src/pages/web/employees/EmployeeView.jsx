import { Link, useParams } from "react-router-dom";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import { ChevronRight } from "lucide-react";

const EmployeeView = () => {
    const { id } = useParams();
    const { document: employeeDoc, loading: employeeDocLoading } = useFireStoreDoc("employees", id);

    if(employeeDocLoading) return <div>Loading...</div>

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
    </div>
  )
}

export default EmployeeView;