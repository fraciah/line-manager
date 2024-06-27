import { Link, useParams } from "react-router-dom";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import { useState } from "react";
import { db } from '../../../firebase';
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { ChevronRight, Users } from "lucide-react";
import useCollection from "../../../hooks/useCollection";
import Loading from "../../../components/Loading";

const UserView = () => {
  const { id } = useParams();
  const { document: userDoc, loading: userDocLoading } = useFireStoreDoc("users", id);
  const { data: allTasks, loading: allTasksLoading } = useCollection("allTasks");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const userHasTasks = allTasks && allTasks.some(task => task.assignedTo === id && task.status !== "Completed");
  // console.log(userHasTasks);

  const makeManager = async () => {
    setLoading(true);
    try {
      //update user role to manager
      const userDocRef = doc(db, "users", id);
      await updateDoc(userDocRef, {
        role: "Manager",
      });

      //create a new entry in the managers collection
      const managerDocRef = doc(db, "managers", id);
      await setDoc(managerDocRef, {
        ...userDoc,
        role: "Manager",
      });

      //remove new manager from employees collection
      const removeRef = doc(db, "employees", id)
      await deleteDoc(removeRef);

      alert("User successfully changed to manager!");
    }
    catch (error) {
      setError(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Loading isLoading={userDocLoading || allTasksLoading}/>
    <div className="page-container">
      <div className="header">
        {error && <div className="error-message">{error}</div>}
        <div className="user-header-title">
          <div>
            {/* <Users /> */}
            <Link to="/users" className="user-page-title">Users</Link>
          </div>
          <div>
            <ChevronRight />
            <span className="user-page-title">User</span>    
          </div>
        </div>
      </div>

      <div className="user-holder">
        <div className="user-card">
          <div className="avatar">
            {userDoc?.name ? userDoc?.name.slice(0, 2) : "NA"}
          </div>
          <div className="user-card-details">
            <div className="user-card-name">Name: {userDoc?.name? userDoc?.name : "NA"}</div>
            <div className="user-card-username">Username: {userDoc?.username? userDoc?.username : "NA"}</div>
          </div>
        </div>
        <div className="user-container">
          <div className="user-details-container">
            <div className="user-details">
              <span>Id:</span>
              <div className="user-detail">{userDoc?.id}</div>
            </div>
            <div className="user-details">
              <span>Phone:</span>
              <div className="user-detail">{userDoc?.phone ? userDoc?.phone : "NA"}</div>
            </div>
            <div className="user-details">
              <span>Role:</span>
              <div className="user-detail">{userDoc?.role}</div>
            </div>
            <div className="user-details">
              <span>Email:</span>
              <div className="user-detail">{userDoc?.email}</div>
            </div>
            <div className="user-details">
              <span>City:</span>
              <div className="user-detail">{userDoc?.address?.city? userDoc?.address?.city : "NA"}</div>
            </div>
            <div className="user-details">
              <span>Street:</span>
              <div className="user-detail">{userDoc?.address?.street? userDoc?.address?.street : "NA"}</div>
            </div>
            <div className="user-details">
              <span>Zipcode:</span>
              <div className="user-detail">{userDoc?.address?.zipcode? userDoc?.address?.zipcode : "NA"}</div>
            </div>
            <div className="user-details">
              <span>Website:</span>
              <div className="user-detail">{userDoc?.website? userDoc?.website: "NA"}</div>
            </div>
            <div className="user-details">
              <span>Joined On:</span>
              <div className="user-detail">NA</div>
            </div>
            <div className="user-details">
              <span>Last Login:</span>
              <div className="user-detail">NA</div>
            </div>
          </div>
          {userDoc?.role === "Employee" && (
            <button 
              className={`manager-btn ${loading || userHasTasks ? 'disabled' : 'active'}`}
              onClick={makeManager}
              disabled={loading || userHasTasks}
              title={userHasTasks && "User has pending tasks and cannot be made a manager"}
            >
              {loading ? "Loading..." : "Make Manager"}
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default UserView;