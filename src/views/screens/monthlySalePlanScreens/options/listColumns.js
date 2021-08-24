import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { LinkContainer } from "react-router-bootstrap";
import { Edit } from "@material-ui/icons";
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
    name: "coinAcronimun",
    label: "",
    options: {
      filter: false,
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
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        const month = tableMeta.rowData[0];
        return (
          <h5>
            <strong>{month}</strong>
          </h5>
        );
      },
    },
  },
  {
    name: "family",
    label: "Familia",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        return (
          <h4>
            <CBadge color="info">{value}</CBadge>
          </h4>
        );
      },
    },
  },
  {
    name: "saleArea",
    label: "Punto de Venta",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        return (
          <h4>
            <CBadge color="success">{value}</CBadge>
          </h4>
        );
      },
    },
  },
  {
    name: "plan",
    label: "Plan Mensual",
    filterType: "textField",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        const coin = tableMeta.rowData[1];
        return (
          <h5>
            <strong>
              {value} {coin}
            </strong>
          </h5>
        );
      },
    },
  },
  {
    name: "hotelId",
    label: "Acciones",
    options: {
      filter: false,
      viewColumns: false,
      sort: false,
      print: false,
      download: false,
      customBodyRender: (value, tableMeta) => {
        const item = tableMeta.rowData
        return (
          <div>
            <LinkContainer
              to={`/monthlySalePlan/${value}/edit/${item[8]}/${item[2]}`}
            >
              <Tooltip
                title={`Editar Plan de Venta Mensual`}
                placement="bottom"
              >
                <IconButton>
                  <Edit />
                </IconButton>
              </Tooltip>
            </LinkContainer>
          </div>
        );
      },
    },
  },
  {
    name: "anualSalePlan",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
];
