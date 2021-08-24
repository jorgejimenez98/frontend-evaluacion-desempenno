import { CBadge } from "@coreui/react";
import { IconButton, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { LinkContainer } from "react-router-bootstrap";

export const columns = [
  {
    name: "id",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "name",
    label: "Nombre",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[1]}</strong>;
      },
    },
  },
  {
    name: "pos_db_name",
    label: "Base de datos del POS",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return (
          <h4>
            <CBadge color={"success"}>{tableMeta.rowData[2]}</CBadge>
          </h4>
        );
      },
    },
  },
  {
    name: "pms_db_name",
    label: "Base de datos del PMS",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return (
          <h4>
            <CBadge color={"info"}>{tableMeta.rowData[3]}</CBadge>
          </h4>
        );
      },
    },
  },
  {
    name: "zunPrUnidadOrganizativaId",
    label: "ID de la Unidad Organizativa del ZunPR",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return (
          <h6>
            <strong>{tableMeta.rowData[4]}</strong>
          </h6>
        );
      },
    },
  },
  {
    name: "Acciones",
    label: "",
    options: {
      filter: false,
      viewColumns: false,
      sort: false,
      print: false,
      download: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const item = tableMeta.tableData[tableMeta.rowIndex];
        return (
          <LinkContainer to={`/hotels/edit/${item[0]}`}>
            <Tooltip title={`Editar Hotel: ${item[1]}`} placement="bottom">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </LinkContainer>
        );
      },
    },
  },
];
