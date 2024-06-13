import DataTable from 'react-data-table-component';

const Table = ({ columns, data, onRowClicked }) => {
    return (
    <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        onRowClicked={onRowClicked}
        highlightOnHover
        striped
        responsive
        pagination
    />
    );
}

export default Table;

const customStyles = {
    headRow: {
      style: {
        background: "#6237A0",
        color: "white",
      },
    },
    rows: {
      style: {
        cursor: "pointer",
      },
    },
};