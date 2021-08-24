import { CBadge } from "@coreui/react";

export const columns = [
  {
    name: "month",
    label: "Mes",
    options: {
      filterType: "dropdown",
      filter: true,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
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
    name: "monthOrder",
    label: "Mes",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        const month = tableMeta.rowData[0];
        return <h6>{month}</h6>;
      },
    },
  },
  {
    name: "year",
    label: "Año",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        return (
          <h6>
            <strong>{value}</strong>
          </h6>
        );
      },
    },
  },
  {
    name: "initialDate",
    label: "Fecha Inicial",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return (
          <h4>
            <CBadge color={"success"}>{value}</CBadge>
          </h4>
        );
      },
    },
  },
  {
    name: "endDate",
    label: "Fecha Final",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return (
          <h4>
            <CBadge color={"info"}>{value}</CBadge>
          </h4>
        );
      },
    },
  },
];

export const zunColumns = [
  {
    name: "nombre",
    label: "Mes",
    options: {
      filterType: "dropdown",
      filter: true,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "id_peri",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "orden",
    label: "Mes",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        const month = tableMeta.rowData[0];
        return <h6>{month}</h6>;
      },
    },
  },
  {
    name: "ejercicio",
    label: "Año",
    filterType: "dropdown",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        return (
          <h6>
            <strong>{value}</strong>
          </h6>
        );
      },
    },
  },
  {
    name: "fecha_inicio",
    label: "Fecha Inicial",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return (
          <h4>
            <CBadge color={"success"}>{value}</CBadge>
          </h4>
        );
      },
    },
  },
  {
    name: "fecha_fin",
    label: "Fecha Final",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return (
          <h4>
            <CBadge color={"info"}>{value}</CBadge>
          </h4>
        );
      },
    },
  },
];
