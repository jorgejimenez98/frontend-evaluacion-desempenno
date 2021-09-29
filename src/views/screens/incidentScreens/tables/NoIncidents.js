import React from "react";

function NoIncidents({ type }) {
  return (
    <div className="text-center mb-1">
      <h4 className="text-muted">
        No hay incidencias de <strong>{type}</strong> registrados
      </h4>
    </div>
  );
}

export default NoIncidents;
