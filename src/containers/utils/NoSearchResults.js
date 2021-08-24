import React from "react";
import { ErrorOutline } from "@material-ui/icons";

function NoSearchResults() {
  return (
    <h4 className="text-muted">
       <ErrorOutline color="error" size={35} /> Lo sentimos. No hay resultados
    </h4>
  );
}

export default NoSearchResults;
