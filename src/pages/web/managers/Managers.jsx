import { Link, useNavigate } from "react-router-dom";
import Table from "../../../components/Table";
import useCollection from "../../../hooks/useCollection";
import Loading from "../../../components/Loading";

const Managers = () => {
  const navigate = useNavigate();
  const { data: managersCollection, loading: managersCollectionLoading } = useCollection("managers");

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
  ];

  return (
    <>
    <Loading isLoading={managersCollectionLoading}/>
    <div className="page-container">
      <div className="header">
        <Link to="/managers" className="page-title">Managers</Link>
      </div>
      <div className="page-content">
        <Table 
          columns={columns} 
          data={managersCollection}
          onRowClicked={managerClicked}
        />
      </div>
    </div>
    </>
  )
}

export default Managers;