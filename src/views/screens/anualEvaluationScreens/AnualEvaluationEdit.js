import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { getWorkerDetails } from "src/redux/actions/workerActions";
import {
  getAnualEvaluationDetails,
  editAnualEvaluation,
} from "src/redux/actions/anualEvaluationActions";
import { Loader, Message, SrollDownButtom } from "src/containers/utils/index";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import { HOTEL_DETAILS_RESET } from "src/redux/constants/hotelConstants";
import { WORKER_DETAILS_RESET } from "src/redux/constants/workerConstants";
import {
  ButtonGroup,
  Button,
  Select,
  FormControl,
  MenuItem,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { LinkContainer } from "react-router-bootstrap";
import { Cancel, RotateLeft } from "@material-ui/icons";
import { BiUpload } from "react-icons/all";
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
  CInvalidFeedback,
} from "@coreui/react";
import GoBackButtonListHeader from "src/containers/utils/GoBackButtonListHeader";
import HeaderForm from "./options/HeaderForm";
import { BootstrapInput } from "../monthlySalePlanScreens/options/styles";

import { validationSchema } from "./options/validation";
import {
  ANUAL_EVALUATION_DETAILS_RESET,
  ANUAL_EVALUATION_EDIT_RESET,
} from "src/redux/constants/anualEvaluationConstants";
import { Formik, Form } from "formik";
import FormikErrorScroll from "formik-error-scroll";
import ErrorEditAnualEvalModal from "./options/ErrorEditAnualEvalModal";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

export const initialValues = {
  resumen: "",
  cumplimiento: "",
  comportamiento: "",
  usoYCuidado: "",
  recomendaciones: "",
  evaluacionFinal: "",
};

function AnualEvaluationEdit({ match, history }) {
  const dispatch = useDispatch();
  const hotelId = match.params.hotelId;
  const workerId = match.params.workerId;
  const year = match.params.year;
  const evaluationId = match.params.evaluationId;

  // My States
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [differenceDays, setDifferenceDays] = useState(0);
  const [evalDate, setEvalDate] = useState("");

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

  // Edit Evaluation Selector
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = useSelector((state) => state.anualEvaluationsEdit);

  // Init Evaluation Values
  initialValues.resumen = anualEvaluation?.ind1_resume;
  initialValues.cumplimiento = anualEvaluation?.ind2_cumpl;
  initialValues.comportamiento = anualEvaluation?.ind3_comport;
  initialValues.usoYCuidado = anualEvaluation?.ind4_uso_cuid;
  initialValues.recomendaciones = anualEvaluation?.ind5_recomend;
  initialValues.evaluacionFinal = anualEvaluation?.finalEvaluation;

  // Validate Evaluation Date
  if (!showErrorModal && anualEvaluation) {
    const evalDate = new Date(anualEvaluation.evaluationDate).getTime();
    const actualDate = new Date().getTime();
    const diff = actualDate - evalDate;
    const daysDiff = parseInt(diff / (1000 * 60 * 60 * 24));
    if (daysDiff !== null && daysDiff >= 7) {
      setEvalDate(anualEvaluation.evaluationDate);
      setDifferenceDays(daysDiff);
      setShowErrorModal(true);
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo.IsFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (tokenhasExpired(userInfo)) {
        redirectLogin(history, dispatch);
      }
      if (successEdit) {
        const message = "Evaluación Anual editada satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: ANUAL_EVALUATION_EDIT_RESET });
        history.push(`/evaluations/anual/${hotelId}`);
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
  }, [
    userInfo,
    hotelId,
    dispatch,
    history,
    workerId,
    evaluationId,
    successEdit,
  ]);

  const closeErrorModal = () => {
    setShowErrorModal(false);
    history.push(`/evaluations/anual/${hotelId}`);
  };

  return (
    <React.Fragment>
      {loadingDetails ? (
        <Loader />
      ) : errorDetails ? (
        <Message variant="danger">{errorDetails}</Message>
      ) : (
        anualEvaluation && (
          <React.Fragment>
            {errorEdit && <Message variant="danger">{errorEdit}</Message>}
            {errorHotel && <Message variant="danger">{errorHotel}</Message>}
            {errorWorker && <Message variant="danger">{errorWorker}</Message>}

            <ErrorEditAnualEvalModal
              showModal={showErrorModal}
              closeModal={closeErrorModal}
              evalDate={evalDate}
              differenceDays={differenceDays}
              workerName={worker?.nombreCompleto}
            />

            <h3 className="text-muted text-center mb-2">
              Editar Evaluación Anual <strong>{hotel?.name}</strong>
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
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnChange={true}
              validateOnBlur={true}
              onSubmit={(values) => {
                const params = {
                  evaluationId,
                  workerId,
                  year,
                  values,
                };
                dispatch(editAnualEvaluation(params));
              }}
              render={(props) => (
                <Form>
                  <CCard className="shadow">
                    <CCardHeader>
                      <CRow>
                        <CCol xs="12" sm="8" md="8">
                          <h4 className="text-muted">Indicadores a Evaluar</h4>
                        </CCol>
                        <CCol xs="12" sm="4" md="4">
                          <div className="card-header-actions">
                            <Tooltip title={"Resetar Formulario"}>
                              <IconButton
                                onClick={() => {
                                  props.resetForm();
                                  dispatch(
                                    setSnackbar(
                                      true,
                                      "info",
                                      "Formulario Reseteado"
                                    )
                                  );
                                }}
                              >
                                <RotateLeft />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </CCol>
                      </CRow>
                    </CCardHeader>

                    <CCardBody>
                      <CFormGroup row>
                        <CCol md="3" className="all-center">
                          <CLabel>
                            <strong>Resumen valorativo</strong> de las
                            Evaluaciones Mensuales del Desempeño del año
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CTextarea
                            name="resumen"
                            id="resumen"
                            rows="8"
                            placeholder="Escribe aquí el resumen"
                            value={props.values.resumen}
                            invalid={
                              props.touched.resumen &&
                              Boolean(props.errors.resumen)
                            }
                            valid={
                              props.touched.resumen &&
                              !Boolean(props.errors.resumen)
                            }
                            onChange={props.handleChange}
                          />
                          <CInvalidFeedback>
                            {props.errors.resumen}
                          </CInvalidFeedback>
                        </CCol>
                      </CFormGroup>

                      <hr />

                      <CFormGroup row>
                        <CCol md="3" className="all-center">
                          <CLabel>
                            <strong>Cumplimiento</strong> de los objetivos,
                            funciones y tareas individuales y la realización del
                            trabajo con eficiencia, calidad y productividad
                            requerida en el periodo.
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CTextarea
                            name="cumplimiento"
                            id="cumplimiento"
                            rows="8"
                            placeholder="Escribe aquí el cumplimiento de los objetivos"
                            value={props.values.cumplimiento}
                            invalid={
                              props.touched.cumplimiento &&
                              Boolean(props.errors.cumplimiento)
                            }
                            valid={
                              props.touched.cumplimiento &&
                              !Boolean(props.errors.cumplimiento)
                            }
                            onChange={props.handleChange}
                          />
                          <CInvalidFeedback>
                            {props.errors.cumplimiento}
                          </CInvalidFeedback>
                        </CCol>
                      </CFormGroup>

                      <hr />

                      <CFormGroup row>
                        <CCol md="3" className="all-center">
                          <CLabel>
                            <strong>Comportamiento</strong> de las normas de
                            seguridad y salud del trabajo en el periodo.
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CTextarea
                            name="comportamiento"
                            id="comportamiento"
                            rows="8"
                            placeholder="Escribe aquí el comportamiento"
                            value={props.values.comportamiento}
                            invalid={
                              props.touched.comportamiento &&
                              Boolean(props.errors.comportamiento)
                            }
                            valid={
                              props.touched.comportamiento &&
                              !Boolean(props.errors.comportamiento)
                            }
                            onChange={props.handleChange}
                          />
                          <CInvalidFeedback>
                            {props.errors.comportamiento}
                          </CInvalidFeedback>
                        </CCol>
                      </CFormGroup>

                      <hr />

                      <CFormGroup row>
                        <CCol md="3" className="all-center">
                          <CLabel>
                            <strong>Uso y cuidado</strong> de los recursos
                            materiales, fundamentalmente de los portadores
                            energéticos y de los equipos de protección personal
                            en el periodo.
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CTextarea
                            name="usoYCuidado"
                            id="usoYCuidado"
                            rows="8"
                            placeholder="Escribe aquí el Uso y cuidado de los recursos materiales"
                            value={props.values.usoYCuidado}
                            invalid={
                              props.touched.usoYCuidado &&
                              Boolean(props.errors.usoYCuidado)
                            }
                            valid={
                              props.touched.usoYCuidado &&
                              !Boolean(props.errors.usoYCuidado)
                            }
                            onChange={props.handleChange}
                          />
                          <CInvalidFeedback>
                            {props.errors.usoYCuidado}
                          </CInvalidFeedback>
                        </CCol>
                      </CFormGroup>

                      <hr />

                      <CFormGroup row>
                        <CCol md="3" className="all-center">
                          <CLabel>
                            <strong>Recomendaciones</strong> y necesidad de
                            acciones de capacitación a programar para elevar la
                            competencia laboral del trabajador
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <CTextarea
                            name="recomendaciones"
                            id="recomendaciones"
                            rows="8"
                            placeholder="Escribe aquí las Recomendaciones"
                            value={props.values.recomendaciones}
                            invalid={
                              props.touched.recomendaciones &&
                              Boolean(props.errors.recomendaciones)
                            }
                            valid={
                              props.touched.recomendaciones &&
                              !Boolean(props.errors.recomendaciones)
                            }
                            onChange={props.handleChange}
                          />
                          <CInvalidFeedback>
                            {props.errors.recomendaciones}
                          </CInvalidFeedback>
                        </CCol>
                      </CFormGroup>
                    </CCardBody>
                  </CCard>

                  {/* Final Evaluation */}
                  <CCard className="shadow">
                    <CCardHeader>
                      <CRow>
                        <CCol xs="12" sm="8" md="8">
                          <h4 className="text-muted">Finalizar Evaluación</h4>
                        </CCol>
                        <CCol xs="12" sm="4" md="4">
                          <div className="card-header-actions">
                            <Tooltip title={"Resetar Formulario"}>
                              <IconButton
                                onClick={() => {
                                  props.resetForm();
                                  dispatch(
                                    setSnackbar(
                                      true,
                                      "info",
                                      "Formulario Reseteado"
                                    )
                                  );
                                }}
                              >
                                <RotateLeft />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </CCol>
                      </CRow>
                    </CCardHeader>

                    <CCardBody>
                      <CFormGroup row>
                        <CCol md="3" className="all-center">
                          <CLabel>
                            <strong>Evaluación Final</strong>
                          </CLabel>
                        </CCol>
                        <CCol xs="12" md="9">
                          <FormControl style={{ width: "100%" }}>
                            <Select
                              id="evaluacionFinal"
                              name="evaluacionFinal"
                              displayEmpty
                              value={props.values.evaluacionFinal}
                              onChange={props.handleChange}
                              input={<BootstrapInput />}
                              className={
                                props.errors.evaluacionFinal
                                  ? "new border border-danger"
                                  : ""
                              }
                            >
                              <MenuItem disabled value="">
                                <em>Seleccione aquí</em>
                              </MenuItem>

                              <MenuItem value="Deficiente">Deficiente</MenuItem>
                              <MenuItem value="Adecuado">Adecuado</MenuItem>
                              <MenuItem value="Superior">Superior</MenuItem>
                            </Select>
                            {props.errors.evaluacionFinal && (
                              <small className="text-red">
                                {props.errors.evaluacionFinal}
                              </small>
                            )}
                          </FormControl>
                        </CCol>
                      </CFormGroup>
                    </CCardBody>

                    {loadingEdit && <Loader />}

                    <CCardFooter>
                      <div className="text-center mb-4">
                        <ButtonGroup
                          variant="contained"
                          aria-label="contained primary button group"
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            type={"submit"}
                          >
                            <BiUpload size={20} className="mr-2" /> Editar
                            Evaluación
                          </Button>
                          <LinkContainer to={`/evaluations/anual/${hotelId}`}>
                            <Button variant="contained">
                              <Cancel className="mr-2" /> Cancelar
                            </Button>
                          </LinkContainer>
                        </ButtonGroup>
                      </div>
                    </CCardFooter>
                  </CCard>
                  <FormikErrorScroll
                    offset={0}
                    align={"top"}
                    focusDelay={100}
                    ease={"linear"}
                    duration={800}
                  />
                </Form>
              )}
            />
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
}

export default AnualEvaluationEdit;
