import React from "react";
import NoIncidents from "./NoIncidents";

function SubsidyTable({ list }) {
  return (
    <div>
      <h4 className="text-muted">
        <strong>6 - Subsidios</strong>
      </h4>
      {list.length === 0 ? (
        <NoIncidents type="SUBSIDIOS" />
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
                    <p>Tarifa Promedio</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Importe Total</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Importe Periodo</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Total de Días</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Periodo en Dias</p>
                  </div>
                </th>
                <th>
                  <div className="text-center">
                    <p>Debió Cobrar</p>
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
                  <td>{value[3]}</td>
                  <td className="text-center">{value[4]}</td>
                  <td className="text-center">{value[5]}</td>
                  <td className="text-center">{value[6]}</td>
                  <td className="text-center">{value[7]}</td>
                  <td className="text-center">{value[8]}</td>
                  <td className="text-center">{value[9]}</td>
                  <td className="text-center">
                    {value[9] === 1 ? "Sí" : "No"}
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

export default SubsidyTable;
