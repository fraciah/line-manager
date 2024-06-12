import DataTable from 'react-data-table-component';

const Table = ({ columns, data }) => {
    return (
    <DataTable
        columns={columns}
        data={data}
        pagination
    />
    );
}

export default Table;