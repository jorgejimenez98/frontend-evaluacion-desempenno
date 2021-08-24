import { IconButton, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { LinkContainer } from "react-router-bootstrap";
import { CBadge } from "@coreui/react";

export const columns = [
  {
    name: "id",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false
    },
  },
  {
    name: "username",
    label: "Nombre de Usuario",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[1]}</strong>;
      },
    },
  },
  {
    name: "name",
    label: "Nombre Completo",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "email",
    label: "Correo",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        const email = tableMeta.rowData[3];
        return <a href={`mailto:${email}`}>{email}</a>;
      },
    },
  },
  {
    name: "rol",
    label: "Rol",
    options: {
      filter: true,
      sort: true,
      filterType: 'dropdown',
      customBodyRender: (value, tableMeta) => {
        const rol = tableMeta.rowData[4];
        return (
          <CBadge color={rol === 'Administrador' ? "success" : "info"}>
            {rol === 'Administrador' ? "Administrador" : "Jefe de Alimentos y Bebidas del complejo"}
          </CBadge>
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
        const userName = tableMeta.rowData[1];
        const userId = tableMeta.rowData[0];
        return (
          <LinkContainer to={`/users/list/edit/${userId}`}>
            <Tooltip title={`Editar Usuario: ${userName}`} placement="bottom">
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
