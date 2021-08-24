import { IconButton, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { LinkContainer } from "react-router-bootstrap";
import { Add } from "@material-ui/icons";
import { CBadge } from "@coreui/react";

export const columns = [
  {
    name: "workerId",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "worker",
    label: "Trabajador",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      filterOptions: {
        fullWidth: true,
      },
      customBodyRender: (value, tableMeta) => {
        return <h6>{value}</h6>;
      },
    },
  },
  {
    name: "evaluated",
    label: "Evaluación Final",
    options: {
      filter: true,
      sort: false,
      filterType: "dropdown",
      filterOptions: {
        fullWidth: true,
      },
      customBodyRender: (value, tableMeta) => {
        const variant =
          value === "No Evaluado"
            ? "warning"
            : value === "Deficiente"
            ? "danger"
            : value === "Adecuado"
            ? "info"
            : value === "Superior"
            ? "success"
            : "";
        return (
          <h5>
            <CBadge color={variant}>{value}</CBadge>
          </h5>
        );
      },
    },
  },
  {
    name: "anualEvaluation",
    label: "Acciones",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (evalId, tableMeta) => {
        const fullName = tableMeta.rowData[1];
        const workerId = tableMeta.rowData[0];
        const hotelId = tableMeta.rowData[4];
        const year = tableMeta.rowData[5];

        return (
          <div>
            {evalId === null ? (
              <LinkContainer
                to={`/evaluation/anual/add/${hotelId}/${workerId}/${year}`}
              >
                <Tooltip
                  title={`Realizar evaluación Anual de ${fullName}`}
                  placement="bottom"
                >
                  <IconButton>
                    <Add />
                  </IconButton>
                </Tooltip>
              </LinkContainer>
            ) : (
              <div>
                <LinkContainer to={`/evaluation/anual/edit/${hotelId}/${workerId}/${year}/${evalId}`} /* Edit Url */>
                  <Tooltip
                    title={`Editar evaluación Anual de ${fullName}`}
                    placement="bottom"
                  >
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </LinkContainer>
                <LinkContainer to={`/evaluation/anual/show/${hotelId}/${workerId}/${year}/${evalId}`} /* Show Url */>
                  <Tooltip
                    title={`Consultar evaluación Anual de ${fullName}`}
                    placement="bottom"
                  >
                    <IconButton>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </LinkContainer>
              </div>
            )}
          </div>
        );
      },
    },
  },
  {
    name: "hotelId",
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
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
];
