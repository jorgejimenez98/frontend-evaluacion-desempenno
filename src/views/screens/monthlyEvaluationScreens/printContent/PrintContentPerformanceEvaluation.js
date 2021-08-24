import React from "react";

const PrintContentPerformanceEvaluation = React.forwardRef(
  ({ evaluations, hotel, payTimes, payTimeId, evaluator }, ref) => {
    const payTime = payTimes[payTimeId];
    return (
      <React.Fragment>
        <div ref={ref}>
          {/* HEADER */}
          <h3 className="text-center">RESUMEN DEL DESEMPEÑO</h3>
          <h3 className="text-center">{hotel?.name}</h3>

          <h4>
            MES: {payTime?.month} - {payTime?.year}
          </h4>

          {/* Table */}
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
                      <p>No.</p>
                    </div>
                  </th>
                  <th>
                    <div className="text-center">
                      <p>Nombre y Apellidos</p>
                    </div>
                  </th>
                  <th>
                    <div className="text-center">
                      <p> Asistencia y puntualidad</p>
                    </div>
                  </th>
                  <th>
                    <div className="text-center">
                      <p> Dominio y cumplimiento de las tareas</p>
                    </div>
                  </th>
                  <th>
                    <div className="text-center">
                      <p> Trabajo en Equipo</p>
                    </div>
                  </th>
                  <th>
                    <div className="text-center">
                      <p>Calidad y atención al cliente</p>
                    </div>
                  </th>
                  <th>
                    <div className="text-center">
                      <p>
                        Cuidado de las areas, uso adecuado de recursos y medios
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="text-center">
                      <p>
                        Cumplimiento de normas de uniformidad y comportamiento
                      </p>
                    </div>
                  </th>
                  <th>
                    <div className="text-center">
                      <p>Capacidad de cambio, iniciativa e interes</p>
                    </div>
                  </th>
                  <th>
                    <div className="text-center">
                      <p>TOTAL</p>
                    </div>
                  </th>
                  <th>
                    <div className="text-center">
                      <p>% DESC. IDON.</p>
                    </div>
                  </th>
                  <th>
                    <div className="text-center">
                      <p>Motivo del Descuento</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {evaluations.map((evaluation, index) => {
                  const existEval = evaluation.meliaEvaluation !== null;
                  if (existEval) {
                    const evl = evaluation.meliaEvaluation;
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{evaluation.worker}</td>
                        <td>
                          <div className="text-center mt-2">
                            <h6>{evl.asist_punt}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="text-center mt-2">
                            <h6>{evl.dom_cum_tars}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="text-center mt-2">
                            <h6>{evl.trab_equipo}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="text-center mt-2">
                            <h6>{evl.cal_aten_cliente}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="text-center mt-2">
                            <h6>{evl.cui_area_rec_medios}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="text-center mt-2">
                            <h6>{evl.cump_normas}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="text-center mt-2">
                            <h6>{evl.cap_camb_ini_int}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="text-center mt-2">
                            <h6>
                              <strong>{evaluation.total}</strong>
                            </h6>
                          </div>
                        </td>
                        <td>
                          <div className="text-center mt-2">
                            <h6>
                              <strong>{evaluation.discount}</strong>
                            </h6>
                          </div>
                        </td>
                        <td></td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{evaluation.worker}</td>
                        <td colSpan="8">
                          <div className="text-center">
                            <h5 className="pt-1 mr-3">No evaluado</h5>
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>

          {/* Evaluator */}
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="text-left">
                <h5 className="text-uppercase">
                  HECHO POR: {evaluator.nombreCompleto}
                </h5>
              </div>
            </div>
            <div className="col-md-6">
              <h5 className="text-uppercase">CARGO: {evaluator.cargo}</h5>
              <h5>FIRMA: _____________________________</h5>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
);

export default PrintContentPerformanceEvaluation;
