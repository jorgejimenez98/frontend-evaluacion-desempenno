import NoSearchResults from "src/containers/utils/NoSearchResults";

const listOptions = {
  filterType: "textField",
  responsive: "vertical",
  searchPlaceholder: "Escribe aquí",
  rowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 15, 25, 100],
  textLabels: {
    body: {
      noMatch: <NoSearchResults className="text-center" />,
      toolTip: "Ordenar",
      columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
    },
    pagination: {
      next: "Siguiente Página",
      previous: "Página anterior",
      rowsPerPage: "Columnas x página:",
      displayRows: "de",
    },
    toolbar: {
      search: "Buscar",
      downloadCsv: "Descargar CSV",
      print: "Imprimir",
      viewColumns: "Ver Columnas",
      filterTable: "Filtrar",
    },
    filter: {
      all: "TODOS",
      title: "FILTROS",
      reset: "RESETEAR",
    },
    viewColumns: {
      title: "Mostrar Columnas",
      titleAria: "Mostrar/Ocultar Columnas de la tabla",
    },
    selectedRows: {
      text: "columna(s) seleccionadas",
      delete: "Eliminar",
      deleteAria: "Eliminar columnas seleccionadas",
    },
  },
};

export default listOptions;
