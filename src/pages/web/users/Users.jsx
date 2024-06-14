import { Link, useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import useCollection from "../../../hooks/useCollection";
import fetchAndSyncUsers from "../../../utilities/fetchAndSyncUsers";
import { useEffect } from "react";
import { ChevronRight, Shield } from "lucide-react";

const Users = () => {
  const navigate = useNavigate();
  const { data: usersCollection } = useCollection("users");

  // useEffect(() => {
  //   fetchAndSyncUsers();
  // }, []); 
  //users already fetched and synced with firebase

  const userClicked = (row) => {
    navigate(`/users/${row.id}/view`);
  };

  const columns = [
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Is Active",
      selector: (row) => row.isActive? "Yes" : "No",
    },
  ];

  return (
    <div className="page-container">
      <div className="header">
        <div className="header-title">
          <div className="title">Admin View</div>
          <ChevronRight />
          <Link to="/users" className="title page">Users</Link>
        </div>
        <div className="title">Hello User</div>
      </div>
      <Table 
        columns={columns} 
        data={usersCollection}
        onRowClicked={userClicked}
      />
    </div>
  )
}

export default Users;