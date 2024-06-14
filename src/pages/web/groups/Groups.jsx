import { useState } from "react";
import { Link } from "react-router-dom";
import useCollection from "../../../hooks/useCollection";
import CreateGroup from "./CreateGroup";

const Groups = () => {
  const { data: groupsCollection, loading: groupsCollectionLoading  } = useCollection("groups");
  const [showModal, setShowModal] = useState(false);
  // console.log(groupsCollection);
  
  if(groupsCollectionLoading) return <div>Loading...</div>

  return (
    <div className="page-container">
      <div className="header">
        <Link to="/users" className="page-title">Groups</Link>
        <div onClick={() => setShowModal(true)}>Create Group</div>
      </div>
      {showModal && <CreateGroup setShowModal={setShowModal}/>}
      
      <div className="page-content">
        <div className="group-container">
          {groupsCollection.map(group => (
            <div key={group.id} className="list-item">
              <Link to={`/groups/${group.id}/view`}>{group.name}</Link>
            </div>
          ))}
        </div>
      </div>  
    </div>
  )
}

export default Groups;