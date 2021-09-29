import React from "react";
import NoIncidents from "./NoIncidents";

function VacationTable({ list }) {
  console.log(list);
  return (
    <div>
      <h4 className="text-muted">
        <strong>4 - Vacaciones</strong>
      </h4>
      {list.length === 0 ? (
        <NoIncidents type="VACACIONES" />
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
                  <div className="text-center">
                    <p>Tiempo Total</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Importe Total</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Días Periodo</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Importe Periodo</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>¿Se ha pagado?</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map((value, index) => (
                <tr key={index}>
                  <td className="text-center">{value[3]}</td>
                  <td className="text-center">{value[4]}</td>
                  <td className="text-center">{value[5]}</td>
                  <td className="text-center">{value[6]}</td>
                  <td className="text-center">
                    {value[7] === 1 ? "Sí" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VacationTable;
