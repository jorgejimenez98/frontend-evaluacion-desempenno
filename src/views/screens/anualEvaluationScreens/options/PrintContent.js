import React from "react";

const PrintContent = React.forwardRef(({ worker, evaluation, year }, ref) => {
  const myEval = evaluation.finalEvaluation;
  return (
    <React.Fragment>
      <div ref={ref}>
        {/* HEADER */}
        <div className="text-center">
          <h4>
            <strong>ANEXO 2</strong>
          </h4>
        </div>
        <div className="text-center">
          <h4>
            <strong>EVALUACIÓN ANUAL DEL DESEMPEÑO</strong>
          </h4>
        </div>

        <br />

        {/* WORKER */}
        <h4>
          <strong>
            Resumen Evaluativo del Trabajador: {worker?.nombreCompleto}
          </strong>
        </h4>

        <h4>
          <strong>CARGO: {worker?.cargo}</strong>
        </h4>

        <h4>
          <strong>
            Periodo: AÑO <u>{year}</u>
          </strong>
        </h4>

        <br />

        {/* INDICATORS */}

        {/* STEP 1 */}
        <h4>
          <strong>
            1.- Resumen valorativo de las Evaluaciones Mensuales del Desempeño
            del año.
          </strong>
        </h4>
        <h5>{evaluation.ind1_resume}</h5>

        <br />

        {/* STEP 2 */}

        <h4>
          <strong>
            2.- Cumplimiento de los objetivos, funciones y tareas individuales y
            la realización del trabajo con eficiencia, calidad y productividad
            requerida en el periodo.
          </strong>
        </h4>
        <h5>{evaluation.ind2_cumpl}</h5>

        <br />

        {/* STEP 3 */}

        <h4>
          <strong>
            3.- Comportamiento de las normas de seguridad y salud del trabajo en
            el periodo.
          </strong>
        </h4>
        <h5>{evaluation.ind3_comport}</h5>

        <br />

        {/* STEP 4 */}

        <h4>
          <strong>
            4.- Uso y cuidado de los recursos materiales, fundamentalmente de
            los portadores energéticos y de los equipos de protección personal
            en el periodo.
          </strong>
        </h4>
        <h5>{evaluation.ind4_uso_cuid}</h5>

        <br />

        {/* STEP 5 */}

        <h4>
          <strong>
            5.- Recomendaciones y necesidad de acciones de capacitación a
            programar para elevar la competencia laboral del trabajador
          </strong>
        </h4>
        <h5>{evaluation.ind5_recomend}</h5>

        <br />

        {/* FINAl EVALUATION */}
        <div className="text-center">
          <u>
            <h4>
              <strong>Evaluación Final Alcanzada</strong>
            </h4>
          </u>
        </div>

        <br />

        <h4>
          <strong>
            Desempeño Laboral Superior:{"  "}
            <u>{myEval === "Superior" ? "__X__" : "_____"}</u>
          </strong>
        </h4>
        <h4>
          <strong>
            Desempeño Laboral Adecuado:{"  "}
            <u>{myEval === "Adecuado" ? "__X__" : "_____"}</u>
          </strong>
        </h4>
        <h4>
          <strong>
            Desempeño Laboral Deficiente:{"  "}
            <u>{myEval === "Deficiente" ? "__X__" : "_____"}</u>
          </strong>
        </h4>

        {/* FIRMAS */}
        <br />
        <br />
        <br />

        {/* FIRMAS */}

        <div className="row">
          <div className="col-md-6">
            <div className="text-left">
              <h4>
                <strong>Firma del Evaluado: _________________________</strong>
              </h4>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-right">
              <h4>
                <strong>Firma del Evaluador: _________________________</strong>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});

export default PrintContent;
