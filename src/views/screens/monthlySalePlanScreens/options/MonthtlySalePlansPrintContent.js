import React from "react";

const MonthtlySalePlansPrintContent = React.forwardRef(
  ({ data, coin, hotelName, year }, ref) => {
    return (
      <React.Fragment>
        <div ref={ref}>
          {/* HEADER */}
          <div className="row">
            <div className="col-md-2">
              <h4 className="float-left">{hotelName}</h4>
            </div>
            <div className="col-md-7 border-dark-side">
              <h4 className={"text-center title"}>
                CUENTA DE RESULTADOS SISTEMA INTEGRADO
              </h4>
            </div>
            <div className="col-md-3">
              <h4>{coin}</h4>
            </div>
          </div>
          <hr />
          <h4 className="text-center">PLAN DE VENTAS - {year}</h4>

          {/* TABLE */}
          <div className="table-responsive">
            <table className="table table-bordered table-sm mt-3">
              <thead>
                <tr>
                  <th>Concepto</th>
                  <th className="text-center">Enero</th>
                  <th className="text-center">Febrero</th>
                  <th className="text-center">Marzo</th>
                  <th className="text-center">Abril</th>
                  <th className="text-center">Mayo</th>
                  <th className="text-center">Junio</th>
                  <th className="text-center">Julio</th>
                  <th className="text-center">Agosto</th>
                  <th className="text-center">Septiembre</th>
                  <th className="text-center">Octubre</th>
                  <th className="text-center">Noviembre</th>
                  <th className="text-center">Diciembre</th>
                  <th className="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {data?.length === 0 ? (
                  <tr className="text-center">
                    <td colSpan="14">
                      <p className="text-muted mt-2">
                        No hay plan de ventas registrados
                      </p>
                    </td>
                  </tr>
                ) : (
                  <React.Fragment>
                    {data?.map((item, i) => {
                      if (i === data?.length - 1) {
                        const index = data?.length - 1;
                        return (
                          <React.Fragment key={i}>
                            <tr>
                              <td colSpan="14"></td>
                            </tr>
                            <tr>
                              <td colSpan="14"></td>
                            </tr>

                            <tr className="table-bordered border-dark table-active">
                              <td>
                                <strong>TOTAL</strong>
                              </td>
                              <td className="text-center">
                                <strong>{data[index][0]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{data[index][1]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{data[index][2]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{data[index][3]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{data[index][4]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{data[index][5]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{data[index][6]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{data[index][7]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{data[index][8]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{data[index][9]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{data[index][10]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{data[index][11]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{data[index][12]}</strong>
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      } else {
                        return (
                          <React.Fragment key={i}>
                            <tr style={{ marginBottom: "15px" }}>
                              <td colSpan="14">
                                <strong className="table-bordered border-dark mt-2 mb-2">
                                  {item[0]}
                                </strong>
                              </td>
                            </tr>

                            {item[1].map((pvta, x) => (
                              <tr key={x}>
                                <td>{pvta[0]}</td>
                                <td className="text-center">{pvta[1][0]}</td>
                                <td className="text-center">{pvta[1][1]}</td>
                                <td className="text-center">{pvta[1][2]}</td>
                                <td className="text-center">{pvta[1][3]}</td>
                                <td className="text-center">{pvta[1][4]}</td>
                                <td className="text-center">{pvta[1][5]}</td>
                                <td className="text-center">{pvta[1][6]}</td>
                                <td className="text-center">{pvta[1][7]}</td>
                                <td className="text-center">{pvta[1][8]}</td>
                                <td className="text-center">{pvta[1][9]}</td>
                                <td className="text-center">{pvta[1][10]}</td>
                                <td className="text-center">{pvta[1][11]}</td>
                                <td className="text-center">{pvta[1][12]}</td>
                              </tr>
                            ))}

                            <tr>
                              <td colSpan="14"></td>
                            </tr>

                            <tr className="table-active">
                              <td>
                                <strong>Subtotal {item[0]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{item[2][0]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{item[2][1]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{item[2][2]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{item[2][3]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{item[2][4]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{item[2][5]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{item[2][6]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{item[2][7]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{item[2][8]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{item[2][9]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{item[2][10]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{item[2][11]}</strong>
                              </td>
                              <td className="text-center">
                                <strong>{item[2][12]}</strong>
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      }
                    })}
                  </React.Fragment>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
);

export default MonthtlySalePlansPrintContent;
