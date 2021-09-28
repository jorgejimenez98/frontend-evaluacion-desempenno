import { IconButton, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { FaBook } from "react-icons/all";
import { LinkContainer } from "react-router-bootstrap";
import { Add } from "@material-ui/icons";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";

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
    name: "fullName",
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
    name: "monthlyGastronomyEvaluation",
    label: "Evaluación de Gastronomía",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (evalId, tableMeta) => {
        const fullName = tableMeta.rowData[1];
        const hotelId = tableMeta.rowData[6];
        const payTimeId = tableMeta.rowData[7];
        const workerId = tableMeta.rowData[0];
        return (
          <div>
            {evalId === null ? (
              <LinkContainer
                to={`/evaluation/gastronomy/monthly/add/${hotelId}/${workerId}/${payTimeId}`}
              >
                <Tooltip
                  title={`Realizar evaluación de Gastronomía a ${fullName}`}
                  placement="bottom"
                >
                  <IconButton>
                    <Add />
                  </IconButton>
                </Tooltip>
              </LinkContainer>
            ) : (
              <div>
                <LinkContainer
                  to={`/evaluation/gastronomy/monthly/edit/${hotelId}/${workerId}/${payTimeId}/${evalId}`} /* Edit Url */
                >
                  <Tooltip
                    title={`Editar evaluación de Gastronomía a ${fullName}`}
                    placement="bottom"
                  >
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </LinkContainer>
                <LinkContainer
                  to={`/evaluation/gastronomy/monthly/show/${hotelId}/${workerId}/${payTimeId}/${evalId}`} /* Show Url */
                >
                  <Tooltip
                    title={`Consultar evaluación de Gastronomía a ${fullName}`}
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
    name: "monthlyMeliaEvaluation",
    label: "Evaluación de Melia",
    options: {
      filter: false,
      sort: false,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        const fullName = tableMeta.rowData[1];
        const hotelId = tableMeta.rowData[6];
        const payTimeId = tableMeta.rowData[7];
        const workerId = tableMeta.rowData[0];
        const gastronomyEvaluation = tableMeta.rowData[2];
        const disabled = gastronomyEvaluation === null;
        return (
          <div>
            {value === null ? (
              <LinkContainer to={`#`}>
                <Tooltip
                  title={`Realizar evaluación de Melia a ${fullName}`}
                  placement="bottom"
                >
                  <IconButton disabled={disabled}>
                    <Add />
                  </IconButton>
                </Tooltip>
              </LinkContainer>
            ) : (
              <div>
                <LinkContainer
                  to={`/evaluation/monthly/melia/edit/${hotelId}/${workerId}/${payTimeId}/${gastronomyEvaluation}/${value}`} /* Edit Url */
                >
                  <Tooltip
                    title={`Editar evaluación de Melia a ${fullName}`}
                    placement="bottom"
                  >
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </LinkContainer>
                <LinkContainer
                  to={`/evaluation/monthly/melia/show/${hotelId}/${workerId}/${payTimeId}/${gastronomyEvaluation}/${value}`} /* Show Url */
                >
                  <Tooltip
                    title={`Consultar evaluación de Melia a ${fullName}`}
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
    name: "",
    label: "Libro del Desempeño",
    options: {
      filter: false,
      sort: false,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        const fullName = tableMeta.rowData[1];
        const hotelId = tableMeta.rowData[6];
        const payTimeId = tableMeta.rowData[7];
        const workerId = tableMeta.rowData[0];
        return (
          <div className="ml-4">
            <LinkContainer
              to={`/performanceBook/${workerId}/${payTimeId}/${hotelId}`}
            >
              <Tooltip
                title={`Generar Portada del Libro del Desempeño a ${fullName}`}
                placement="bottom"
              >
                <IconButton>
                  <FaBook />
                </IconButton>
              </Tooltip>
            </LinkContainer>
          </div>
        );
      },
    },
  },
  {
    name: "",
    label: "Incidencias",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta) => {
        const fullName = tableMeta.rowData[1];
        const hotelId = tableMeta.rowData[6];
        const payTimeId = tableMeta.rowData[7];
        const workerId = tableMeta.rowData[0];
        return (
          <div>
            <LinkContainer
              to={`/worker/incidents/show/${hotelId}/${workerId}/${payTimeId}/`}
            >
              <Tooltip
                title={`Consultar incidencias de ${fullName}`}
                placement="bottom"
              >
                <IconButton>
                  <PersonPinCircleIcon />
                </IconButton>
              </Tooltip>
            </LinkContainer>
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
    name: "payTimeId",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
];
