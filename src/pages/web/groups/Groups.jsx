import { useState } from "react";
import { Link } from "react-router-dom";
import useCollection from "../../../hooks/useCollection";
import CreateGroup from "./CreateGroup";
import Loading from "../../../components/Loading";

const Groups = () => {
  const { data: groupsCollection, loading: groupsCollectionLoading  } = useCollection("groups");
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
    <Loading isLoading={groupsCollectionLoading}/>
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
          {groupsCollection?.length === 0 ? (
            <div>No groups found.</div>
          ) : 
          groupsCollection?.map(group => (
            <Link 
              key={group.id} 
              className="group-item"
              to={`/groups/${group?.id}/view`}
            >
              <div 
                className="group-name"
              >{group?.name}</div>
              <div>Created on {new Date(group?.createdAt).toDateString()}</div>
            </Link>
          ))
          }
        </div>
      </div>  
    </div>
    </>
  )
}

export default Groups;