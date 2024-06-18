import { useState } from "react";
import { Link } from "react-router-dom";
import useCollection from "../../../hooks/useCollection";
import CreateGroup from "./CreateGroup";

const Groups = () => {
  const { data: groupsCollection, loading: groupsCollectionLoading  } = useCollection("groups");
  const [showModal, setShowModal] = useState(false);
  console.log(groupsCollection);
  
  if(groupsCollectionLoading) return <div>Loading...</div>

  return (
    <div className="page-container">
      <div className="header">
        <Link to="/users" className="page-title">Groups</Link>
        <div 
          onClick={() => setShowModal(true)}
          className="add-btn"
        >Create Group</div>
      </div>
      {showModal && <CreateGroup setShowModal={setShowModal}/>}
      
      <div className="page-content">
        <div className="group-container">
          {groupsCollection.map(group => (
            <Link 
              key={group.id} 
              className="group-item"
              to={`/groups/${group.id}/view`}
            >
              <div 
                className="group-name"
              >{group.name}</div>
              <div>Created on {new Date(group.createdAt).toDateString()}</div>
            </Link>
          ))}
        </div>
      </div>  
    </div>
  )
}

export default Groups;