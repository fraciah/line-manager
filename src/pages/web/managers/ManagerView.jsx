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
            <div className="user-header-title">
            <div>
                {/* <Users /> */}
                <Link to="/managers" className="user-page-title">Managers</Link>
            </div>
            <div>
                <ChevronRight />
                <span className="user-page-title">Manager</span>    
            </div>
            </div>
        </div>
        <div className="user-holder">
            <div className="user-card">
                <div className="avatar">
                    {managerDoc?.name? managerDoc?.name.slice(0, 2): "NA"}
                </div>
                <div className="user-card-details">
                    <div className="user-card-name">Name: {managerDoc?.name? managerDoc?.name: "NA"}</div>
                    <div className="user-card-username">Username: {managerDoc?.username? managerDoc?.username: "NA"}</div>
                </div>
            </div>
            <div className="user-container">
                <div className="user-details-container">
                    <div className="user-details">
                        <span>Id</span>
                        <div className="user-detail">{managerDoc?.id}</div>
                    </div>
                    <div className="user-details">
                        <span>Phone</span>
                        <div className="user-detail">{managerDoc?.phone? managerDoc?.phone: "NA"}</div>
                    </div>
                
                    <div className="user-details">
                        <span>Role</span>
                        <div className="user-detail">{managerDoc?.role}</div>
                    </div>
                    <div className="user-details">
                        <span>Email</span>
                        <div className="user-detail">{managerDoc?.email}</div>
                    </div>

                    <div className="user-details">
                        <span>City</span>
                        <div className="user-detail">{managerDoc?.address?.city? managerDoc?.address?.city: "NA"}</div>
                    </div>
                    <div className="user-details">
                        <span>Street</span>
                        <div className="user-detail">{managerDoc?.address?.street? managerDoc?.address?.street: "NA"}</div>
                    </div>
                
                    <div className="user-details">
                        <span>Zipcode</span>
                        <div className="user-detail">{managerDoc?.address?.zipcode ? managerDoc?.address?.zipcode: "NA"}</div>
                    </div>
                    <div className="user-details">
                        <span>Website</span>
                        <div className="user-detail">{managerDoc?.website? managerDoc?.website: "NA"}</div>
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
    </div>
  )
}

export default ManagerView;