import { Link, useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import useCollection from "../../../hooks/useCollection";
import fetchAndSyncUsers from "../../../utilities/fetchAndSyncUsers";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
// import useFireStoreDoc from "../../../hooks/useFireStoreDoc";

const Users = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { data: usersCollection, loading: usersLoading } = useCollection("users");
    // const { document: currentUser, loading: currentUserLoading } = useFireStoreDoc("users", user?.uid);
    //if users have been fetched and synced
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        //fetch and sync users only once when the component mounts
        if (!fetched) {
            fetchAndSyncUsers().then(() => {
                setFetched(true); //fetched to true after users are fetched and synced
            });
        }
    }, [fetched]);

    const userClicked = (row) => {
        navigate(`/users/${row.id}/view`);
    };

    const columns = [
      {
        name: "Name",
        selector: (row) => row.name,
      },
      {
        name: "Email",
        selector: (row) => row.email,
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

    if (usersLoading || currentUserLoading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="page-container">
            <div className="header">
                <Link to="/users" className="page-title">Users</Link>
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