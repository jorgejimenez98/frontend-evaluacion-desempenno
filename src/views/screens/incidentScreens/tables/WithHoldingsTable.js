import React from "react";
import NoIncidents from "./NoIncidents";

function WithHoldingsTable({ list }) {
  return (
    <div>
      <h4 className="text-muted">
        <strong>5 - Retenciones</strong>
      </h4>
      {list.length === 0 ? (
        <NoIncidents type="RETENCIONES" />
      ) : (
        <div className="table-responsive">
          <table
            className="table mt-3
                table-bordered 
                table-hover 
                table-sm 
                table-align-middle"
          >
            <thead>
              <tr>
                <th>
                  <div>
                    <p>Descripción</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Importe Sueldo</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Importe Vacaciones</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Importe Subsidio</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>¿Está pendiente?</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Mensualidad</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Recargo</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>No RET</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((value, index) => (
                <tr key={index}>
                  <td>{value[3]}</td>
                  <td className="text-center">{value[4]}</td>
                  <td className="text-center">{value[5]}</td>
                  <td className="text-center">{value[6]}</td>
                  <td className="text-center">
                    {value[7] === 1 ? "Sí" : "No"}
                  </td>
                  <td className="text-center">{value[8]}</td>
                  <td className="text-center">{value[9]}</td>
                  <td className="text-center">{value[10]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default WithHoldingsTable;
