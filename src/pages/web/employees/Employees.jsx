import Table from "../../../components/Table";
import { Link, useNavigate } from "react-router-dom";
import useCollection from "../../../hooks/useCollection";

const Employees = () => {
  const navigate = useNavigate();
  const { data: employeesCollection, loading: employeesCollectionLoading } = useCollection("employees");

  const employeeClicked = (row) => {
    navigate(`/employees/${row.id}/view`);
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
      name: "Phone Number",
      selector: (row) => row.phone,
    },
  ];

  return (
    <div className="page-container">
      <div className="header">
        <Link to="/employees" className="page-title">Employees</Link>
      </div>
      <div className="page-content">
        <Table 
          columns={columns} 
          data={employeesCollection}
          onRowClicked={employeeClicked}
        />
      </div>
    </div>
  )
}

export default Employees;