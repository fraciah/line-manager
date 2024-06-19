import useAuth from "../../hooks/useAuth";
import useFireStoreDoc from "../../hooks/useFireStoreDoc";

const Profile = () => {
  const { user } = useAuth();
  const { document: currentUser, loading: currentUserLoading } = useFireStoreDoc("users", user?.uid);

  if(currentUserLoading) return <div>Loading...</div>;
  
  return (
    <div className="item-container">  
      <div className="page-container">  
        <div className="item-details"> 
          <div className="title-holder"> 
            <span className="title">My Profile</span> 
            {currentUser?.role === "Admin" && 
              <div className="role admin">Admin</div>
            }
            {currentUser?.role === "Manager" && 
              <div className="role manager">Manager</div>
            }
            {currentUser?.role === "Employee" && 
              <div className="role employee">Employee</div>
            }
          </div>
          <div className="details">  
            <div className="item-detail">  
              <span className="detail-title">Name:</span>
              <span>{currentUser?.name ? currentUser?.name :"NA"}</span>
            </div>
            <div className="item-detail">  
              <span className="detail-title">Email:</span>
              <span>{currentUser?.email ? currentUser?.email :"NA"}</span>
            </div>
            <div className="item-detail">  
              <span className="detail-title">Username:</span>
              <span>{currentUser?.username ? currentUser?.username :"NA"}</span>
            </div>
            <div className="item-detail">  
              <span className="detail-title">Phone No:</span>
              <span>{currentUser?.phone ? currentUser?.phone :"NA"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="page-container">
        <div className="item-details">
          <div className="details">  
            <div className="item-detail">  
              <span className="detail-title">City:</span>
              <span>{currentUser?.address?.city ? currentUser?.address?.city :"NA"}</span>
            </div>
            <div className="item-detail">  
              <span className="detail-title">Street:</span>
              <span>{currentUser?.address?.street ? currentUser?.address?.street :"NA"}</span>
            </div>
            <div className="item-detail">  
              <span className="detail-title">Suite:</span>
              <span>{currentUser?.address?.suite ? currentUser?.address?.suite :"NA"}</span>
            </div>
            <div className="item-detail">  
              <span className="detail-title">ZipCode:</span>
              <span>{currentUser?.address?.zipcode ? currentUser?.address?.zipcode :"NA"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;