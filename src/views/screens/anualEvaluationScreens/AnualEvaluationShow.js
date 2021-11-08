import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
// Icons
import { Cancel, Print } from "@material-ui/icons";
// Actions
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { getWorkerDetails } from "src/redux/actions/workerActions";
import { getAnualEvaluationDetails } from "src/redux/actions/anualEvaluationActions";
// Constants
import { HOTEL_DETAILS_RESET } from "src/redux/constants/hotelConstants";
import { WORKER_DETAILS_RESET } from "src/redux/constants/workerConstants";
import { ANUAL_EVALUATION_DETAILS_RESET } from "src/redux/constants/anualEvaluationConstants";
// Components
import FinalEvalBadge from "./options/FinalEvalBadge";
import PrintContent from "./options/PrintContent";
import HeaderForm from "./options/HeaderForm";
import GoBackButtonListHeader from "src/containers/utils/GoBackButtonListHeader";
import { Loader, Message, SrollDownButtom } from "src/containers/utils/index";
import { ButtonGroup, Button } from "@material-ui/core";
import { LinkContainer } from "react-router-bootstrap";
import {
  CCol,
  CCard,
  CCardHeader,
  CRow,
  CCardBody,
  CCardFooter,
  CFormGroup,
  CLabel,
  CTextarea,
} from "@coreui/react";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function AnualEvaluationShow({ match, history }) {
  const dispatch = useDispatch();
  const hotelId = match.params.hotelId;
  const workerId = match.params.workerId;
  const year = match.params.year;
  const evaluationId = match.params.evaluationId;

  /* Print */
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // User login Selector
  const { userInfo } = useSelector((state) => state.userLogin);

  // Hotel Details Selector
  const { error: errorHotel, hotel } = useSelector(
    (state) => state.hotelDetails
  );

  // Worker Details Selector
  const { error: errorWorker, worker } = useSelector(
    (state) => state.workerDetails
  );

  // Anual Evaluation Details Selector
  const {
    loading: loadingDetails,
    error: errorDetails,
    anualEvaluation,
  } = useSelector((state) => state.anualEvaluationsDetails);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo.IsFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (tokenhasExpired(userInfo)) {
        redirectLogin(history, dispatch);
      }
      if (hotelId) {
        dispatch(getHotelDetails(hotelId, true));
      }
      if (workerId) {
        dispatch(getWorkerDetails(workerId));
      }
      if (evaluationId) {
        dispatch(getAnualEvaluationDetails(evaluationId));
      }
    }
    return () => {
      dispatch({ type: WORKER_DETAILS_RESET });
      dispatch({ type: HOTEL_DETAILS_RESET });
      dispatch({ type: ANUAL_EVALUATION_DETAILS_RESET });
    };
  }, [userInfo, hotelId, dispatch, history, workerId, evaluationId]);

  return (
    <React.Fragment>
      {loadingDetails ? (
        <Loader />
      ) : errorDetails ? (
        <Message variant="danger">{errorDetails}</Message>
      ) : (
        anualEvaluation && (
          <React.Fragment>
            {errorHotel && <Message variant="danger">{errorHotel}</Message>}
            {errorWorker && <Message variant="danger">{errorWorker}</Message>}

            <h3 className="text-muted text-center mb-2">
              Consultar Evaluación Anual <strong>{hotel?.name}</strong>
            </h3>

            {/* Header */}
            <CCard className="shadow">
              <CCardHeader>
                <CRow>
                  <CCol xs="12" sm="8" md="8">
                    <h4 className="text-muted">Datos Necesarios</h4>
                  </CCol>
                  <CCol xs="12" sm="4" md="4">
                    <div className="card-header-actions">
                      <GoBackButtonListHeader
                        link={`/evaluations/anual/${hotelId}`}
                        title={`Volver al Listado de Evaluaciones Anuales del ${hotel?.name}`}
                      />
                    </div>
                  </CCol>
                </CRow>
              </CCardHeader>

              <CCardBody>
                <HeaderForm
                  year={year}
                  worker={worker}
                  dateCreation={anualEvaluation.evaluationDate}
                />

                <CCardFooter>
                  <div className="text-center mb-n3">
                    <SrollDownButtom />
                  </div>
                </CCardFooter>
              </CCardBody>
            </CCard>

            {/* Indocadores */}
            <CCard className="shadow">
              <CCardHeader>
                <CRow>
                  <CCol xs="12" sm="8" md="8">
                    <h4 className="text-muted">Indicadores Evaluados</h4>
                  </CCol>
                </CRow>
              </CCardHeader>

              <CCardBody>
                <CFormGroup row>
                  <CCol md="3" className="all-center">
                    <CLabel>
                      <strong>Resumen valorativo</strong> de las Evaluaciones
                      Mensuales del Desempeño del año
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      className="disabled-normal"
                      rows="8"
                      disabled
                      value={anualEvaluation.ind1_resume}
                    />
                  </CCol>
                </CFormGroup>

                <hr />

                <CFormGroup row>
                  <CCol md="3" className="all-center">
                    <CLabel>
                      <strong>Cumplimiento</strong> de los objetivos, funciones
                      y tareas individuales y la realización del trabajo con
                      eficiencia, calidad y productividad requerida en el
                      periodo.
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      className="disabled-normal"
                      rows="8"
                      disabled
                      value={anualEvaluation.ind2_cumpl}
                    />
                  </CCol>
                </CFormGroup>

                <hr />

                <CFormGroup row>
                  <CCol md="3" className="all-center">
                    <CLabel>
                      <strong>Comportamiento</strong> de las normas de seguridad
                      y salud del trabajo en el periodo.
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      rows="8"
                      className="disabled-normal"
                      value={anualEvaluation.ind3_comport}
                      disabled
                    />
                  </CCol>
                </CFormGroup>

                <hr />

                <CFormGroup row>
                  <CCol md="3" className="all-center">
                    <CLabel>
                      <strong>Uso y cuidado</strong> de los recursos materiales,
                      fundamentalmente de los portadores energéticos y de los
                      equipos de protección personal en el periodo.
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      rows="8"
                      className="disabled-normal"
                      disabled
                      value={anualEvaluation.ind4_uso_cuid}
                    />
                  </CCol>
                </CFormGroup>

                <hr />

                <CFormGroup row>
                  <CCol md="3" className="all-center">
                    <CLabel>
                      <strong>Recomendaciones</strong> y necesidad de acciones
                      de capacitación a programar para elevar la competencia
                      laboral del trabajador
                    </CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      rows="8"
                      className="disabled-normal"
                      disabled
                      value={anualEvaluation.ind5_recomend}
                    />
                  </CCol>
                </CFormGroup>
              </CCardBody>
            </CCard>

            {/* Final Evaluation */}
            <CCard className="shadow">
              <CCardHeader>
                <CRow>
                  <CCol xs="12" sm="12" md="12" className="text-center">
                    <h4 className="text-muted">Evaluación Final</h4>
                  </CCol>
                </CRow>
              </CCardHeader>

              <CCardBody className="text-center">
                <FinalEvalBadge finalEval={anualEvaluation.finalEvaluation} />
              </CCardBody>
            </CCard>

            <div className="text-center mb-4">
              <ButtonGroup
                variant="contained"
                aria-label="contained primary button group"
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePrint}
                >
                  <Print size={20} className="mr-2" /> Imprimir Evaluación
                </Button>
                <LinkContainer to={`/evaluations/anual/${hotelId}`}>
                  <Button variant="contained">
                    <Cancel className="mr-2" /> Volver al Listado
                  </Button>
                </LinkContainer>
              </ButtonGroup>
            </div>

            {/* Print Content */}
            <div style={{ display: "none" }}>
              <PrintContent
                ref={componentRef}
                evaluation={anualEvaluation}
                worker={worker}
                year={year}
              />
            </div>
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
}

export default AnualEvaluationShow;
