import Table from "../../../components/Table";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useCollection from "../../../hooks/useCollection";
import useFireStoreDoc from "../../../hooks/useFireStoreDoc";
import Loading from "../../../components/Loading";

const Employees = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: employeesCollection, loading: employeesCollectionLoading } = useCollection("employees");
  const { document: userDoc, loading: userDocLoading } = useFireStoreDoc("users", user?.uid);

  let employees;

  if(employeesCollection) {
    if(userDoc?.role === "Admin") {
      employees = employeesCollection;
    }
    else {
      employees =  employeesCollection && employeesCollection.filter(employee => employee.isActive);
    }
  };

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

  if(userDoc?.role === "Admin") {
    columns.push({
      name: "Is Active",
      selector: (row) => (row.isActive? "Yes" : "No"),
    });
  }

  return (
    <>
    <Loading isLoading={employeesCollectionLoading || userDocLoading}/>
    <div className="page-container">
      <div className="header">
        <Link to="/employees" className="page-title">Employees</Link>
      </div>
      <div className="page-content">
        <Table 
          columns={columns} 
          data={employees}
          onRowClicked={employeeClicked}
        />
      </div>
    </div>
    </>
  )
}

export default Employees;