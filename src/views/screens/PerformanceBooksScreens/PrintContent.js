import React from "react";
import Logo from "src/assets/img/logo.png";
import { CImg } from "@coreui/react";

const PrintContent = React.forwardRef(({ worker, payTime }, ref) => {
  return (
    <React.Fragment>
      <div ref={ref}>
        <div className="text-center">
          <div className="text-center">
            <CImg src={Logo} alt="logo" height={85} className="book-image" />
          </div>

          <h1 className="mt-5 font-italic" style={{ fontSize: "40px" }}>
            Evaluaciones del Desempeño
          </h1>
          <h1 className="font-italic" style={{ fontSize: "40px" }}>
            del Trabajador
          </h1>
          <h1 className="font-italic" style={{ fontSize: "40px" }}>
            {payTime?.year}
          </h1>

          <h4 className="font-italic mt-5">
            Nombre del Trabajador: <u>{worker?.nombreCompleto}</u>{" "}
          </h4>
          <h4 className="font-italic">Departamento: SERVICIOS GASTRONÓMICOS</h4>

          <h4 className="mt-5">
            <strong>RESUMEN DE EVALUACIÓN DEL DESEMPEÑO</strong>
          </h4>

          <div className="text-center">
            <table className="mt-5 table-bordered w-100 border-dark">
              <thead>
                <tr className=" border-dark">
                  <th className="text-center">Indicadores</th>

                  <th className="text-center">Ene</th>

                  <th className="text-center">Feb</th>

                  <th className="text-center">Mar</th>

                  <th className="text-center">Abr</th>

                  <th className="text-center">May</th>

                  <th className="text-center">Jun</th>

                  <th className="text-center">Jul</th>

                  <th className="text-center">Ago</th>

                  <th className="text-center">Sep</th>

                  <th className="text-center">Oct</th>

                  <th className="text-center">Nov</th>

                  <th className="text-center">Dic</th>
                </tr>
              </thead>

              <tbody>
                <tr style={{ height: "50px" }}>
                  <td className="text-center">
                    <strong>Evaluaciones</strong>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr style={{ height: "50px" }}>
                  <td className="text-center">
                    <strong>Asistencia</strong>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});

export default PrintContent;
