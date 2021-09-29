import React from "react";
import NoIncidents from "./NoIncidents";

function AbsencesTable({ list }) {
  return (
    <div>
      <h4 className="text-muted">
        <strong>3 - Ausencias</strong>
      </h4>
      {list.length === 0 ? (
        <NoIncidents type="AUSENCIAS" />
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
                    <p>Tiempo</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Importe</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Tarifa</p>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AbsencesTable;
