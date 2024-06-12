import RQUsers from "../../../RQ/RQUsers";
import Table from "../../../components/Table";

const Users = () => {
  const { data: users } = RQUsers();

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
      <h1>Users</h1>
      <Table columns={columns} data={users} />
    </div>
  )
}

export default Users;