import {Text} from "components";
import { DataGrid } from '@material-ui/data-grid';

const LinksList = ({clients}) => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'organizationName',
          headerName: 'Организация',
          width: 150,
          editable: true,
        },
        {
          field: 'unp',
          headerName: 'УНП',
          width: 150,
          editable: true,
        },
        {
          field: 'bank',
          headerName: 'Банк',
          width: 110,
          editable: true,
        },
        {
          field: 'bic',
          headerName: 'БИК',
          width: 110,
          editable: true,
        },
        {
          field: 'contractName',
          headerName: 'Договор',
          width: 110,
          editable: true,
        },
        {
          field: 'contractDate',
          headerName: 'Дата договора',
          width: 110,
          editable: true,
        },
        {
          field: 'notice',
          headerName: 'Примечание',
          description: 'Это колонка не сортируется',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.getValue(params.id, 'organizationName') || ''} ${
              params.getValue(params.id, 'unp') || ''
            }`,
        },
      ];
      


let rows = []
      clients.map ((client, index) => {
         return ( rows.push ({ id: `${index +1}`, organizationName: `${client.organization}`, unp: `${client.unp}`, bank: `${client.bank}`, bic: `${client.bic}`, contractName:`${client.contractname}`, contractDate:`${new Date(client.contractdate).toLocaleDateString()}`, notice: `${client.notice}`},
         ))
      })

    if (!clients.length) {
        return <Text variant={"p"} className={"page__title"}>No clients here =(</Text>
    }


    return (
        
            <div style={{ height: 650, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
              />
            </div>
        
    )
}

export default LinksList