import React from "react";

const ComponentPrint = React.forwardRef(
  (
    { payTime, workerEvaluate, evaluator, monthlyMeliaEvaluation, hotel },
    ref
  ) => {
    const evl = monthlyMeliaEvaluation?.totalCalificacion
      ?.split("-")[1]
      ?.trim();
    return (
      <React.Fragment>
        <div ref={ref}>
          {/* Header */}
          <h4 className="text-center">
            <strong>EVALUACIÓN MENSUAL DE MELIA</strong>
          </h4>
          <h4 className="text-center">
            <strong>{hotel?.name}</strong>
          </h4>

          <div className="row mt-3">
            <div className="col-md-6">
              <div className="text-left">
                <h5 className="text-uppercase">
                  <strong>MES</strong>: {payTime?.month}
                </h5>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-right">
                <h5 className="text-uppercase">
                  <strong>AÑO</strong>: {payTime?.year}
                </h5>
              </div>
            </div>
          </div>

          {/* Caracteristicas de los trabajadores */}

          <div className="text-left">
            <h5 className="text-uppercase">
              NOMBRE DEL EVALUADO:{" "}
              <strong>
                <u>{workerEvaluate?.nombreCompleto}</u>
              </strong>
            </h5>
          </div>
          <div className="text-left">
            <h5 className="text-uppercase">
              CARGO QUE OCUPA EL EVALUADO:{" "}
              <strong>
                <u>{workerEvaluate?.cargo}</u>
              </strong>
            </h5>
          </div>
          <hr />
          <div className="text-left">
            <h5 className="text-uppercase">
              NOMBRE DEL EVALUADOR:{" "}
              <strong>
                <u>{evaluator?.nombreCompleto}</u>
              </strong>
            </h5>
          </div>
          <div className="text-left">
            <h5 className="text-uppercase">
              CARGO QUE OCUPA EL EVALUADOR:{" "}
              <strong>
                <u>{evaluator?.cargo}</u>
              </strong>
            </h5>
          </div>

          {/* Table */}
          <table className="table table-bordered mt-3 table-hover">
            <thead>
              <tr className="table-sm">
                <th>
                  <div className="text-left">
                    <p>Indicadores</p>
                  </div>
                </th>
                <th>
                  <div className="text-center pt-2">
                    <p>M - 2</p>
                  </div>
                </th>
                <th>
                  <div className="text-center pt-2">
                    <p>R - 3</p>
                  </div>
                </th>
                <th>
                  <div className="text-center pt-2">
                    <p>B - 4</p>
                  </div>
                </th>
                <th>
                  <div className="text-center pt-2">
                    <p>MB - 5</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Asistencia y puntualidad</td>
                <td>
                  {monthlyMeliaEvaluation?.asist_punt === 2 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.asist_punt === 3 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.asist_punt === 4 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.asist_punt === 5 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td>Dominio y cumplimiento de las tareas</td>
                <td>
                  {monthlyMeliaEvaluation?.dom_cum_tars === 2 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.dom_cum_tars === 3 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.dom_cum_tars === 4 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.dom_cum_tars === 5 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td>Trabajo en equipo</td>
                <td>
                  {monthlyMeliaEvaluation?.trab_equipo === 2 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.trab_equipo === 3 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.trab_equipo === 4 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.trab_equipo === 5 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td>Calidad y atención al cliente</td>
                <td>
                  {monthlyMeliaEvaluation?.cal_aten_cliente === 2 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.cal_aten_cliente === 3 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.cal_aten_cliente === 4 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.cal_aten_cliente === 5 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  Cuidado de las áreas, uso adecuado de recursos y medios de
                  trabajo
                </td>
                <td>
                  {monthlyMeliaEvaluation?.cui_area_rec_medios === 2 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.cui_area_rec_medios === 3 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.cui_area_rec_medios === 4 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.cui_area_rec_medios === 5 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td>Cumplimiento de normas de uniformidad y comportamiento</td>
                <td>
                  {monthlyMeliaEvaluation?.cump_normas === 2 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.cump_normas === 3 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.cump_normas === 4 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.cump_normas === 5 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td>Capacidad de cambio, iniciativa e interés. </td>
                <td>
                  {monthlyMeliaEvaluation?.cap_camb_ini_int === 2 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.cap_camb_ini_int === 3 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.cap_camb_ini_int === 4 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
                <td>
                  {monthlyMeliaEvaluation?.cap_camb_ini_int === 5 && (
                    <div className="text-center">
                      <div className="tick-mark"></div>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Calificaciones */}

          <h4 className="text-right mt-2">
            Total: <strong>{monthlyMeliaEvaluation?.totalCalificacion}</strong>
          </h4>
          <br />
          <div className="row">
            <div className="col-md-6">
              <div className="text-left">
                <h5 className="text-uppercase">
                  CALIFICACIÓN OBTENIDA EN EL MES:{" "}
                  <u>
                    {evl === "R"
                      ? "Regular"
                      : evl === "M"
                      ? "Mal"
                      : evl === "B"
                      ? "Bien"
                      : evl === "MB"
                      ? "Muy Bien"
                      : ""}
                  </u>
                </h5>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-right">
                <h5 className="text-uppercase">
                  CONFORME: <strong>Sí: ____ No: ____</strong>
                </h5>
              </div>
            </div>
          </div>

          <h5>
            RANGOS DE CALIFICACION.{" "}
            <strong>
              Muy Bien: 35–32 Bien: 31-28 Regular: 27-21 Mal: 20-14
            </strong>
          </h5>

          <br />

          {/* FIRMAS */}

          <div className="row">
            <div className="col-md-6">
              <div className="text-left">
                <h5 className="text-uppercase">
                  <strong>FIRMA DEL EVALUADO: _________________________</strong>
                </h5>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-right">
                <h5 className="text-uppercase">
                  <strong>
                    FIRMA DEL EVALUADOR: _________________________
                  </strong>
                </h5>
              </div>
            </div>
          </div>

          {/* OBSERVACIONES */}

          <h5>
            <strong>Observaciones:</strong>
          </h5>
          <div className="table-bordered" style={{ minHeight: "100px" }}>
            <h6 className="m-2">{monthlyMeliaEvaluation?.observations}</h6>
          </div>

          {/* Notas */}
          <br />

          <h5>
            <strong>Nota:</strong>
          </h5>

          <ol>
            <li>
              {" "}
              La evaluación final en ningún caso podrá evaluarse de{" "}
              <strong>MB</strong> si algún indicador es evaluado de{" "}
              <strong>Mal o Regular.</strong>{" "}
            </li>
            <li>
              {" "}
              La evaluación final en ningún caso podrá evaluarse de{" "}
              <strong>B</strong> si algún indicador es evaluado de{" "}
              <strong>Mal.</strong>{" "}
            </li>
            <li>
              {" "}
              De presentarse algunos de los casos anteriormente descriptos, el
              resultado de la evaluación final será la calificación inmediata
              inferior a la que le correspondía por la puntuación obtenida y se
              le pagará por el máximo porciento correspondiente esa escala.{" "}
            </li>
          </ol>
        </div>
      </React.Fragment>
    );
  }
);

export default ComponentPrint;
