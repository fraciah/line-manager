import RQUsers from "../../../RQ/RQUsers";

const Users = () => {
  const { data: users } = RQUsers();

  return (
    <div>
      <h1>Users</h1>
      <div>
        {users && users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  )
}

export default Users;