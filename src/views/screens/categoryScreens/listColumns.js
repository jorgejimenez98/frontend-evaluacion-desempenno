import { CBadge } from "@coreui/react";

export const columns = [
  {
    name: "id_categ",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "cod_categ",
    label: "Código",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return (
          <h5>
            <CBadge color="success">{tableMeta.rowData[1]}</CBadge>
          </h5>
        );
      },
    },
  },
  {
    name: "descripcion",
    label: "Descripción",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
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
    label: "Estado",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        return <CBadge color="info">{tableMeta.rowData[3] && "Activo"}</CBadge>;
      },
    },
  },
];
