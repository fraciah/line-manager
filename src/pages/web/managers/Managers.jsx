import { Link, useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import useCollection from "../../../hooks/useCollection";

const Managers = () => {
  const navigate = useNavigate();
  const { data: managersCollection, loading: managersCollectionLoading } = useCollection("managers");
  console.log(managersCollectionLoading)
  console.log("managersCollection", managersCollection)

  const managerClicked = (row) => {
    navigate(`/managers/${row.id}/view`)
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
    {
      name: "Is Active",
      selector: (row) => row.isActive? "Yes" : "No",
    },
  ];

  return (
    <div className="page-container">
      <div className="header">
        <Link to="/managers" className="page-title">Managers</Link>
      </div>
      <Table 
        columns={columns} 
        data={managersCollection}
        onRowClicked={managerClicked}
      />
    </div>
  )
}

export default Managers;