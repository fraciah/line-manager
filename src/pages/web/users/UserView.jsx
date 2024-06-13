import { Link, useParams } from "react-router-dom";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import useAuth from "../../../hooks/useAuth";
import { ChevronRight } from "lucide-react";

const UserView = () => {
  const { id } = useParams();
  const { user} = useAuth();
  const { document: userDoc, loading } = useFireStoreDoc("users", id);
  // console.log("userDoc",userDoc)
  // console.log("loading",loading)
  // console.log("user",user)

  if(loading) return <div>Loading...</div>

  return (
    <div className="page-container">
      <div className="header">
        <div className="header-title">
          <div className="title">Admin View</div>
          <ChevronRight />
          <Link to="/users" className="title page">Users</Link>
          <ChevronRight />
          <div className="title">User</div>
        </div>
        <div className="title">Hello {userDoc?.username}</div>
      </div>

      <div className="user-holder">
        <div className="user-card">
          <div className="avatar">
            {userDoc?.name.slice(0, 2)}
          </div>
          <div className="user-card-details">
            <div className="user-card-detail">{userDoc?.name}</div>
            <div className="user-card-detail">{userDoc?.username}</div>
          </div>
        </div>
        <div className="user-container">
          <div className="user-row">
            <div className="user-col">
              <div className="user-details">
                <span>Id</span>
                <div className="user-detail">{userDoc?.id}</div>
              </div>
              <div className="user-details">
                <span>Phone</span>
                <div className="user-detail">{userDoc?.phone}</div>
              </div>
            </div>
            <div className="user-col">
              <div className="user-details">
                <span>Role</span>
                <div className="user-detail">{userDoc?.role}</div>
              </div>
              <div className="user-details">
                <span>Email</span>
                <div className="user-detail">{userDoc?.email}</div>
              </div>
            </div>
          </div>
          <div className="user-row">
            <div className="user-col">
              <div className="user-details">
                <span>City</span>
                <div className="user-detail">{userDoc?.address?.city}</div>
              </div>
              <div className="user-details">
                <span>Street</span>
                <div className="user-detail">{userDoc?.address?.street}</div>
              </div>
            </div>
            <div className="user-col">
              <div className="user-details">
                <span>Zipcode</span>
                <div className="user-detail">{userDoc?.address?.zipcode}</div>
              </div>
              <div className="user-details">
                <span>Website</span>
                <div className="user-detail">{userDoc?.website}</div>
              </div>
            </div>
          </div>
          <div className="user-row">
            <div className="user-col">
              <div className="user-details">
                <span>Created On</span>
                <div className="user-detail">{user?.metadata?.createdAt}</div>
              </div>
            </div>
            <div className="user-col">
              <div className="user-details">
                <span>Last Login</span>
                <div className="user-detail">{user?.metadata?.lastLoginAt}</div>
              </div>
            </div>
          </div>
          <button className="btn">Make manager</button>
        </div>
      </div>
    </div>
  )
}

export default UserView;