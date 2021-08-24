import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Actions
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { getPayTimeDetails } from "src/redux/actions/payTimesActions";
import {
  getWorkerDetails,
  getEvaluatorDetails,
} from "src/redux/actions/workerActions";
import {
  getMonthlyGastronomyEvaluationDetails,
  getMonthlyMeliaEvaluationDetails,
  editMonthlyMeliaEvaluation,
} from "src/redux/actions/monthlyEvaluationActions";
// Constants
import { HOTEL_DETAILS_RESET } from "src/redux/constants/hotelConstants";
import { PAYTIMES_DETAILS_RESET } from "src/redux/constants/payTimesConstants";
import {
  MONTHLY_MELIA_EVALUATION_ADD_RESET,
  MONTHLY_MELIA_EVALUATION_DETAILS_RESET,
  MONTHLY_MELIA_EVALUATION_EDIT_RESET,
  WORKER_MONTHLY_EVALUATION_DETAILS_RESET,
} from "src/redux/constants/monthlyEvaluationConstants";
import {
  WORKER_DETAILS_RESET,
  WORKER_EVALUATOR_DETAILS_RESET,
} from "src/redux/constants/workerConstants";
// Components
import { Message, SrollDownButtom, Loader } from "src/containers/utils/index";
import EvaluatorContent from "../monthlyEvaluationScreens/options/EvaluatorContent";
import GoBackButtonListHeader from "src/containers/utils/GoBackButtonListHeader";
import FormContent from "./options/FormContent";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import ErrorEditModal from "../monthlyEvaluationScreens/options/ErrorEditModal";

function EditMonthlyMeliaEvaluation({ match, history }) {
  const dispatch = useDispatch();
  const hotelId = match.params.hotelId;
  const workerId = match.params.workerId;
  const payTimeId = match.params.payTimeId;
  const gastronomyEvaluationId = match.params.gastronomyEvaluationId;
  const meliaEvaluationId = match.params.meliaEvaluationId;

  // My States
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [differenceDays, setDifferenceDays] = useState(0);
  const [evalDate, setEvalDate] = useState("");

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);

  // Hotel Details Selector
  const { error: errorHotel, hotel } = useSelector(
    (state) => state.hotelDetails
  );

  // Worker Details Selector
  const { error: errorWorker, worker } = useSelector(
    (state) => state.workerDetails
  );

  // Pay Time Details
  const { error: errorPayTime, payTime } = useSelector(
    (state) => state.payTimesDetails
  );

  // Evaluator Details
  const { error: errorEvaluator, evaluator } = useSelector(
    (state) => state.evaluatorDetails
  );

  // Monthly Gastronomy Evaluation Details Selector
  const { error: errorDetails, monthlyGastronomyEvaluation } = useSelector(
    (state) => state.monthlyEvaluationDetails
  );

  // Monthly Melia Evaluation Details Selector
  const {
    loading: loadingDetails,
    error: errorDetailsEval,
    monthlyMeliaEvaluation,
  } = useSelector((state) => state.monthlyMeliaEvaluationDetails);

  // Evaluation Edit Selector
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = useSelector((state) => state.monthlyMeliaEvaluationEdit);

  // Check Evaluation Date
  if (!showErrorModal && monthlyMeliaEvaluation) {
    const evalDate = new Date(
      monthlyMeliaEvaluation.evaluationDate
    ).getTime();
    const actualDate = new Date().getTime();
    const diff = actualDate - evalDate;
    const daysDiff = parseInt(diff / (1000 * 60 * 60 * 24));
    if (daysDiff !== null && daysDiff >= 7) {
      setEvalDate(monthlyMeliaEvaluation.evaluationDate);
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
      if (successEdit) {
        const message =
          "Evaluación Mensual de Melia editada satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: MONTHLY_MELIA_EVALUATION_EDIT_RESET });
        history.push(`/evaluations/monthly/${hotelId}`);
      }
      if (meliaEvaluationId) {
        dispatch(getMonthlyMeliaEvaluationDetails(meliaEvaluationId));
      }
      if (gastronomyEvaluationId) {
        dispatch(getMonthlyGastronomyEvaluationDetails(gastronomyEvaluationId));
      }
      if (hotelId) {
        dispatch(getHotelDetails(hotelId, true));
      }
      if (workerId) {
        dispatch(getWorkerDetails(workerId));
      }
      if (payTimeId) {
        dispatch(getPayTimeDetails(payTimeId));
      }
      dispatch(getEvaluatorDetails());
    }
    return () => {
      dispatch({ type: WORKER_DETAILS_RESET });
      dispatch({ type: HOTEL_DETAILS_RESET });
      dispatch({ type: PAYTIMES_DETAILS_RESET });
      dispatch({ type: WORKER_EVALUATOR_DETAILS_RESET });
      dispatch({ type: WORKER_MONTHLY_EVALUATION_DETAILS_RESET });
      dispatch({ type: MONTHLY_MELIA_EVALUATION_ADD_RESET });
      dispatch({ type: MONTHLY_MELIA_EVALUATION_DETAILS_RESET });
      dispatch({ type: MONTHLY_MELIA_EVALUATION_EDIT_RESET });
    };
  }, [
    userInfo,
    hotelId,
    dispatch,
    history,
    workerId,
    payTimeId,
    meliaEvaluationId,
    gastronomyEvaluationId,
    successEdit,
  ]);

  const handleSubmit = (evaluations, observations) => {
    const params = {
      meliaEvaluationId,
      payTimeId,
      evaluateWorkerId: workerId,
      evaluatorWorkerId: evaluator?.no_interno,
      evaluations,
      observations,
    };
    dispatch(editMonthlyMeliaEvaluation(params));
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    history.push(`/evaluations/monthly/${hotelId}`);
  };

  return (
    <React.Fragment>
      <ErrorEditModal
        showModal={showErrorModal}
        closeModal={closeErrorModal}
        evalDate={evalDate}
        differenceDays={differenceDays}
        workerName={worker?.nombreCompleto}
        evalType={"Melia"}
      />
      {loadingDetails && <Loader />}
      {loadingEdit && <Loader />}
      {errorHotel && <Message variant="danger">{errorHotel}</Message>}
      {errorWorker && <Message variant="danger">{errorWorker}</Message>}
      {errorPayTime && <Message variant="danger">{errorPayTime}</Message>}
      {errorEvaluator && <Message variant="danger">{errorEvaluator}</Message>}
      {errorDetails && <Message variant="danger">{errorDetails}</Message>}
      {errorEdit && <Message variant="danger">{errorEdit}</Message>}
      {errorDetailsEval && (
        <Message variant="danger">{errorDetailsEval}</Message>
      )}

      <h3 className="text-muted text-center mb-2">{hotel?.name}</h3>

      <CCard className="shadow">
        <CCardHeader>
          <CRow>
            <CCol xs="12" sm="8" md="8">
              <h4 className="text-muted">Editar Evaluación Mensual de Melia</h4>
            </CCol>
            <CCol xs="12" sm="4" md="4">
              <div className="card-header-actions">
                <GoBackButtonListHeader
                  link={`/evaluations/monthly/${hotelId}`}
                  title={`Volver al Listado de Evaluaciones Mensuales del ${hotel?.name}`}
                />
              </div>
            </CCol>
          </CRow>
        </CCardHeader>

        <CCardBody>
          <EvaluatorContent
            worker={worker}
            payTime={payTime}
            evaluator={evaluator}
            dateCreation={monthlyMeliaEvaluation?.evaluationDate}
          />

          <CCardFooter>
            <div className="text-center mb-n3">
              <SrollDownButtom />
            </div>
          </CCardFooter>
        </CCardBody>
      </CCard>

      {monthlyMeliaEvaluation && (
        <FormContent
          monthlyGastronomyEvaluation={monthlyGastronomyEvaluation}
          handleSubmitEval={handleSubmit}
          monthlyMeliaEvaluation={monthlyMeliaEvaluation}
          onlyShow={false}
          handlePrint={null}
        />
      )}
    </React.Fragment>
  );
}

export default EditMonthlyMeliaEvaluation;
