import { Link, useParams } from "react-router-dom";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import { ChevronRight } from "lucide-react";

const ManagerView = () => {
    const { id } = useParams();
    const { document: managerDoc, loading: managerDocLoading } = useFireStoreDoc("managers", id);

    if(managerDocLoading) return <div>Loading...</div>

  return (
    <div className="page-container">
        <div className="header">
            <div className="header-title">
                <Link to="/managers" className="page-title title">Managers</Link>
                <ChevronRight />
                <div className="page-title">Manager</div>
            </div>
        </div>
        <div className="user-holder">
            <div className="user-card">
                <div className="avatar">
                    {managerDoc?.name.slice(0, 2)}
                </div>
                <div className="user-card-details">
                    <div className="user-card-detail">{managerDoc?.name}</div>
                    <div className="user-card-detail">{managerDoc?.username}</div>
                </div>
            </div>
            <div className="user-container">
                <div className="user-row">
                    <div className="user-col">
                        <div className="user-details">
                            <span>Id</span>
                            <div className="user-detail">{managerDoc?.id}</div>
                        </div>
                        <div className="user-details">
                            <span>Phone</span>
                            <div className="user-detail">{managerDoc?.phone}</div>
                        </div>
                    </div>
                    <div className="user-col">
                        <div className="user-details">
                            <span>Role</span>
                            <div className="user-detail">{managerDoc?.role}</div>
                        </div>
                        <div className="user-details">
                            <span>Email</span>
                            <div className="user-detail">{managerDoc?.email}</div>
                        </div>
                    </div>
                </div>
                <div className="user-row">
                    <div className="user-col">
                        <div className="user-details">
                            <span>City</span>
                            <div className="user-detail">{managerDoc?.address?.city}</div>
                        </div>
                        <div className="user-details">
                            <span>Street</span>
                            <div className="user-detail">{managerDoc?.address?.street}</div>
                        </div>
                    </div>
                    <div className="user-col">
                        <div className="user-details">
                            <span>Zipcode</span>
                            <div className="user-detail">{managerDoc?.address?.zipcode}</div>
                        </div>
                        <div className="user-details">
                            <span>Website</span>
                            <div className="user-detail">{managerDoc?.website}</div>
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

export default ManagerView;