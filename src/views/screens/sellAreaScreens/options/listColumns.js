import { CBadge } from "@coreui/react";

export const columns = [
  {
    name: "id_pvta",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "cod_pvta",
    label: "Código",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return (
          <CBadge color="info">
            <strong>{tableMeta.rowData[1]}</strong>
          </CBadge>
        );
      },
    },
  },
  {
    name: "desc_pvta",
    label: "Descripción",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return (
          <h6>
            <strong>{tableMeta.rowData[2]}</strong>
          </h6>
        );
      },
    },
  },
  {
    name: "activo",
    label: "¿Está activo?",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        const active = tableMeta.rowData[3];
        return (
          <CBadge color={active ? "success" : "info"}>
            {active ? "Activo" : "No activo"}
          </CBadge>
        );
      },
    },
  },
];
