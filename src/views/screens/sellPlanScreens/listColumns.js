import React from "react";
import { CBadge } from "@coreui/react";
import { IconButton, Tooltip } from "@material-ui/core";
import { LinkContainer } from "react-router-bootstrap";
import { Visibility, Edit } from "@material-ui/icons";

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
    name: "year",
    label: "Año",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        return (
          <h5>
            <CBadge color={"info"} className="ml-2">
              {value}
            </CBadge>
          </h5>
        );
      },
    },
  },
  {
    name: "currency",
    label: "Moneda",
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
    name: "hotel",
    label: "Acciones",
    options: {
      filter: false,
      viewColumns: false,
      sort: false,
      print: false,
      download: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const item = tableMeta.tableData[tableMeta.rowIndex];
        return (
          <div>
            <LinkContainer to={`/sellPlan/${value.id}/edit/${item[0]}`}>
              <Tooltip
                title={`Editar año del Plan de Venta`}
                placement="bottom"
              >
                <IconButton>
                  <Edit />
                </IconButton>
              </Tooltip>
            </LinkContainer>
            <LinkContainer to={`/monthlySalePlan/${value.id}/list/${item[0]}`}>
              <Tooltip
                title={`Gestionar Planes de Venta mensuales del ${item[1]} del ${value.name}`}
                placement="bottom"
              >
                <IconButton>
                  <Visibility />
                </IconButton>
              </Tooltip>
            </LinkContainer>
          </div>
        );
      },
    },
  },
];
