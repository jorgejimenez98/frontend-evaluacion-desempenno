import React from "react";
import { listOptions, MUIDataTable } from "src/containers/utils/index";
import { columns } from "./options/columns";

function TableEvalInfo({ table }) {
  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "none";
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = true;
  listOptions.filter = true;


  // Add Buttom to insert users to the table
  listOptions.customToolbar = () => {
    return null;
  };
  return (
    <div>
      <MUIDataTable
        title={`Listado de Evaluaciones (${table.length})`}
        data={table}
        columns={columns}
        options={listOptions}
      />
    </div>
  );
}

export default TableEvalInfo;
