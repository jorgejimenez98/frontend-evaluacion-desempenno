import { CBadge } from "@coreui/react";
import { IconButton, Tooltip } from "@material-ui/core";
import { LinkContainer } from "react-router-bootstrap";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { FaUserEdit, ImWarning } from "react-icons/all";
import React from "react";

export const columns = [
  {
    name: "no_interno",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "nombreCompleto",
    label: "Nombre Completo",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[1]}</strong>;
      },
    },
  },
  {
    name: "cat_ocup",
    label: "Categoría",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        return (
          <h5>
            <CBadge color={"success"}>
              <strong>{tableMeta.rowData[2]}</strong>
            </CBadge>
          </h5>
        );
      },
    },
  },
  {
    name: "cargo",
    label: "Cargo",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        return (
          <h5>
            <CBadge color={"info"}>
              <strong>{tableMeta.rowData[3]}</strong>
            </CBadge>
          </h5>
        );
      },
    },
  },
  {
    name: "operador",
    label: "Operador",
    options: {
      filter: false,
      sort: false,
      print: false,
      download: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const item = tableMeta.tableData[tableMeta.rowIndex];
        const operador = item[4];
        return (
          <React.Fragment>
            {!operador ? (
              <IconButton>
                <ImWarning />
                <h6 className="ml-2 mt-2">No tiene</h6>
              </IconButton>
            ) : (
              <h6>{operador.descripcion}</h6>
            )}
          </React.Fragment>
        );
      },
    },
  },
  {
    name: "hotel",
    label: "Acciones",
    options: {
      filter: false,
      viewColumns: false,
      sort: false,
      print: false,
      download: false,
      customBodyRender: (hotelId, tableMeta, updateValue) => {
        const item = tableMeta.tableData[tableMeta.rowIndex];
        const operador = item[4];
        const title = !operador
          ? `Seleccionar Operador a ${item[1]}`
          : `Cambiar Operador a ${item[1]}`;
        return (
          <LinkContainer to={`/operator/worker/${item[0]}/${hotelId}`}>
            <Tooltip title={title} placement="bottom">
              <IconButton>
                {!operador ? <PersonAddIcon /> : <FaUserEdit />}
              </IconButton>
            </Tooltip>
          </LinkContainer>
        );
      },
    },
  },
];
// TiUserDelete
export const columnsImport = [
  {
    name: "no_interno",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "nombre",
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
    name: "apell1",
    label: "Primer Apellido",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[2]}</strong>;
      },
    },
  },
  {
    name: "apell2",
    label: "Segundo Apellido",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[3]}</strong>;
      },
    },
  },
  {
    name: "categoriaName",
    label: "Categoría",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        return (
          <h5>
            <CBadge color={"success"}>
              <strong>{value}</strong>
            </CBadge>
          </h5>
        );
      },
    },
  },
  {
    name: "cargoName",
    label: "Cargo",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        return (
          <h5 className="text-center">
            <CBadge color={"info"}>
              <strong>{value}</strong>
            </CBadge>
          </h5>
        );
      },
    },
  },
];
