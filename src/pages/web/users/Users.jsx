import { useNavigate } from "react-router-dom";
import RQUsers from "../../../RQ/RQUsers";
import Table from "../../../components/Table";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import useAuth from "../../../hooks/useAuth";
import useCollection from "../../../hooks/useCollection";

const Users = () => {
  const navigate = useNavigate();
  const { data: users } = RQUsers();
  const { user } = useAuth();
  const { data: usersCollection } = useCollection("users");
  const { document, loading } = useFireStoreDoc("users", user?.uid);
  // console.log("user",user)
  // console.log("document",document)
  // console.log("usersCollection",usersCollection)

  const userClicked = (row) => {
    navigate(`/users/${row.id}/view`);
  };


  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
  ];

  return (
    <div className="page-container">
      <div>
        
      </div>
      <Table 
        columns={columns} 
        data={users}
        onRowClicked={userClicked}
      />
    </div>
  )
}

export default Users;