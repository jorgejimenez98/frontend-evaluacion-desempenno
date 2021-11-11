import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { getWorkerDetails } from "src/redux/actions/workerActions";
import { addAnualEvaluation } from "src/redux/actions/anualEvaluationActions";
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
import { ANUAL_EVALUATION_ADD_RESET } from "src/redux/constants/anualEvaluationConstants";
import { Formik, Form } from "formik";
import FormikErrorScroll from "formik-error-scroll";
import NoAddErrorModal from "./options/NoAddErrorModal";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";
import { detaultTexts } from "./options/defaultText";

export const initialValues = {
  resumen: "",
  cumplimiento: "",
  comportamiento: "",
  usoYCuidado: "",
  recomendaciones: "",
  evaluacionFinal: "",
};

function AnualEvaluationAdd({ match, history }) {
  const dispatch = useDispatch();
  const hotelId = match.params.hotelId;
  const workerId = match.params.workerId;
  const year = match.params.year;

  const [showAddError, setShowAddError] = useState(false);
  const [showDefaultButtom, setShowDefaultButtom] = useState(true);

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

  // Add Evaluation Selector
  const {
    loading: loadingAdd,
    error: errorAdd,
    success: successAdd,
  } = useSelector((state) => state.anualEvaluationsAdd);

  if (!showAddError && worker && year > new Date().getFullYear()) {
    setShowAddError(true);
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
      if (successAdd) {
        const message = "Evaluación Anual insertada satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: ANUAL_EVALUATION_ADD_RESET });
        history.push(`/evaluations/anual/${hotelId}`);
      }
      if (hotelId) {
        dispatch(getHotelDetails(hotelId, true));
      }
      if (workerId) {
        dispatch(getWorkerDetails(workerId));
      }
    }
    return () => {
      dispatch({ type: WORKER_DETAILS_RESET });
      dispatch({ type: HOTEL_DETAILS_RESET });
      dispatch({ type: ANUAL_EVALUATION_ADD_RESET });
      resetForm();
    };
    // eslint-disable-next-line
  }, [userInfo, hotelId, dispatch, history, workerId, successAdd]);

  const closeModal = () => {
    setShowAddError(false);
    history.push(`/evaluations/anual/${hotelId}`);
  };

  const handleDefaultText = () => {
    setShowDefaultButtom(false);
    const texts = detaultTexts(year);
    initialValues.resumen = texts.resumenValorativo;
    initialValues.cumplimiento = texts.cumplimentoObjetivos;
    initialValues.comportamiento = texts.comportamiento;
    initialValues.usoYCuidado = texts.usoYCuidado;
    initialValues.recomendaciones = texts.recomendaciones;
    const message =
      "Se han establecido los textos por defecto. Inserte la Evaluación Final";
    dispatch(setSnackbar(true, "info", message));
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const resetForm = () => {
    initialValues.resumen = "";
    initialValues.cumplimiento = "";
    initialValues.comportamiento = "";
    initialValues.usoYCuidado = "";
    initialValues.recomendaciones = "";
    const message = "Formulario Reseteado";
    dispatch(setSnackbar(true, "info", message));
  };

  return (
    <React.Fragment>
      {errorHotel && <Message variant="danger">{errorHotel}</Message>}
      {errorWorker && <Message variant="danger">{errorWorker}</Message>}
      {errorAdd && <Message variant="danger">{errorAdd}</Message>}

      <NoAddErrorModal
        showModal={showAddError}
        closeModal={closeModal}
        year={year}
        workerName={worker?.nombreCompleto}
      />

      <h3 className="text-muted text-center mb-2">
        Realizar Evaluación Anual <strong>{hotel?.name}</strong>
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
            dateCreation={new Date().toLocaleDateString()}
          />

          <CCardFooter>
            <div className="text-center mb-n3">
              <SrollDownButtom />
            </div>
          </CCardFooter>
        </CCardBody>
      </CCard>

      {/* Default Buttom */}
      {showDefaultButtom && (
        <div className="text-center mb-3">
          <Button variant="contained" onClick={handleDefaultText}>
            Definir Textos por defecto
          </Button>
        </div>
      )}

      {/* Indocadores */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={(values) => {
          const params = {
            workerId,
            year,
            values,
          };
          dispatch(addAnualEvaluation(params));
        }}
        render={(props) => (
          <Form>
            <CCard className="shadow">
              <CCardHeader>
                <CRow>
                  <CCol xs="12" sm="8" md="10">
                    <h4 className="text-muted mt-2">Indicadores a Evaluar</h4>
                  </CCol>
                  <CCol xs="12" sm="4" md="2">
                    <div className="card-header-actions">
                      <Tooltip title="Restear Formulario">
                        <IconButton
                          onClick={() => {
                            resetForm();
                            setShowDefaultButtom(true);
                            dispatch(
                              setSnackbar(true, "info", "Formulario Reseteado")
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
                      <strong>Resumen valorativo</strong> de las Evaluaciones
                      Mensuales del Desempeño del año
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
                        props.touched.resumen && Boolean(props.errors.resumen)
                      }
                      valid={
                        props.touched.resumen && !Boolean(props.errors.resumen)
                      }
                      onChange={props.handleChange}
                    />
                    <CInvalidFeedback>{props.errors.resumen}</CInvalidFeedback>
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
                      <strong>Comportamiento</strong> de las normas de seguridad
                      y salud del trabajo en el periodo.
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
                      <strong>Uso y cuidado</strong> de los recursos materiales,
                      fundamentalmente de los portadores energéticos y de los
                      equipos de protección personal en el periodo.
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
                      <strong>Recomendaciones</strong> y necesidad de acciones
                      de capacitación a programar para elevar la competencia
                      laboral del trabajador
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

              {loadingAdd && <Loader />}
              <CCardFooter>
                <div className="text-center mb-4">
                  <ButtonGroup
                    variant="contained"
                    aria-label="contained primary button group"
                  >
                    <Button variant="contained" color="primary" type={"submit"}>
                      <BiUpload size={20} className="mr-2" /> Completar
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
  );
}

export default AnualEvaluationAdd;
