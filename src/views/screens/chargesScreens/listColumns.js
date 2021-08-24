import { CBadge } from "@coreui/react";

export const columns = [
  {
    name: "id_cargos",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "cod_cargo",
    label: "Código",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return (
          <h5>
            <CBadge color="success" size={25}>
              {tableMeta.rowData[1]}
            </CBadge>
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
    name: "ocupacion",
    label: "Categoría",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        return (
          <h6>
            <strong>{tableMeta.rowData[3]}</strong>
          </h6>
        );
      },
    },
  },
];
