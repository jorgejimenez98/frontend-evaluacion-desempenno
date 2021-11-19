import { CBadge } from "@coreui/react";
import { FaHotel } from "react-icons/all";
export const columns = [
  {
    name: "name",
    label: "Nombre Completo",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        return <strong>{value}</strong>;
      },
    },
  },
  {
    name: "hotel",
    label: "Hotel",
    options: {
      filter: true,
      sort: true,
      filterType: "dropdown",
      customBodyRender: (value, tableMeta) => {
        return (
          <div>
            <FaHotel
              size={18}
              color={"#3399ff"}
              className="c-sidebar-nav-icon"
            />
            &nbsp; {value}
          </div>
        );
      },
    },
  },
  // First Evaluation
  {
    name: "firstEvalTotal",
    label: "Última Evaluación",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        const text = tableMeta.rowData[4];

        let colorBadge = "success";
        if (text !== null) {
          colorBadge = text.includes("M")
            ? "danger"
            : text.includes("B")
            ? "info"
            : text.includes("R")
            ? "warning"
            : "success";
        }
        return (
          <div>
            {value ? (
              <h5>
                <CBadge color={colorBadge}>{text}</CBadge>
              </h5>
            ) : (
              <h5>
                <CBadge color={"danger"}>No Registrada</CBadge>
              </h5>
            )}
          </div>
        );
      },
    },
  },

  {
    name: "firstEvalDate",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "firstEvalCalification",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },

  // Second Evaluation
  {
    name: "secondEvalTotal",
    label: "Penúltima Evaluación",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        const text = tableMeta.rowData[7];

        let colorBadge = "success";
        if (text !== null) {
          colorBadge = text.includes("M")
            ? "danger"
            : text.includes("B")
            ? "info"
            : text.includes("R")
            ? "warning"
            : "success";
        }
        return (
          <div>
            {value ? (
              <h5>
                <CBadge color={colorBadge}>{text}</CBadge>
              </h5>
            ) : (
              <h5>
                <CBadge color={"danger"}>No Registrada</CBadge>
              </h5>
            )}
          </div>
        );
      },
    },
  },

  {
    name: "secondEvalDate",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "secondEvalCalification",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },

  // Third Evaluation
  {
    name: "thirdEvalTotal",
    label: "Antepenúltima Evaluación",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        const text = tableMeta.rowData[9];
        let colorBadge = "success";
        if (text !== null) {
          colorBadge = text.includes("M")
            ? "danger"
            : text.includes("B")
            ? "info"
            : text.includes("R")
            ? "warning"
            : "success";
        }
        return (
          <div>
            {value ? (
              <h5>
                <CBadge color={colorBadge}>{text}</CBadge>
              </h5>
            ) : (
              <h5>
                <CBadge color={"danger"}>No Registrada</CBadge>
              </h5>
            )}
          </div>
        );
      },
    },
  },

  {
    name: "thirdEvalDate",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "thirdEvalCalification",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  // Filters
  {
    name: "firstcalificacion",
    label: "última Evaluación",
    options: {
      filter: true,
      filterType: "dropdown",
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "secondcalificacion",
    label: "Última Evaluación",
    options: {
      filter: true,
      filterType: "dropdown",
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "thirdcalificacion",
    label: "Antepenúltima Evaluación",
    options: {
      filter: true,
      filterType: "dropdown",
      display: false,
      viewColumns: false,
    },
  },
];
