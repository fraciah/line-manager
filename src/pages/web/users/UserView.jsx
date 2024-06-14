import { Link, useParams } from "react-router-dom";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import { useState } from "react";
import { db } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ChevronRight } from "lucide-react";

const UserView = () => {
  const { id } = useParams();
  const { document: userDoc, loading: userDocLoading } = useFireStoreDoc("users", id);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  if(userDocLoading) return <div>Loading...</div>

  const makeManager = async () => {
    setLoading(true);
    try {
      const userDocRef = doc(db, "users", id);
      await updateDoc(userDocRef, {
        ...userDoc,
        role: "Manager",
      });
      alert("User role updated successfully");
    }
    catch (error) {
      setError(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="header">
        {error && <div>{error}</div>}
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
          {userDoc?.role === "Employee" && (
            <button 
              className="btn"
              onClick={makeManager}
            >
              {loading ? "Loading..." : "Make Manager"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserView;