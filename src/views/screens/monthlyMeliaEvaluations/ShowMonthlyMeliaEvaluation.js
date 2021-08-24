import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button, ButtonGroup } from "@material-ui/core";
import { Print, Visibility, ArrowBack } from "@material-ui/icons";
// Actions
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { getPayTimeDetails } from "src/redux/actions/payTimesActions";
import {
  getWorkerDetails,
  getEvaluatorDetails,
} from "src/redux/actions/workerActions";
import {
  getMonthlyGastronomyEvaluationDetails,
  getMonthlyMeliaEvaluationDetails,
} from "src/redux/actions/monthlyEvaluationActions";
// Constants
import { HOTEL_DETAILS_RESET } from "src/redux/constants/hotelConstants";
import { PAYTIMES_DETAILS_RESET } from "src/redux/constants/payTimesConstants";
import {
  MONTHLY_MELIA_EVALUATION_ADD_RESET,
  MONTHLY_MELIA_EVALUATION_DETAILS_RESET,
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
import ComponentPrint from "./options/ComponentPrint";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";

function ShowMonthlyMeliaEvaluation({ match, history }) {
  const dispatch = useDispatch();
  const hotelId = match.params.hotelId;
  const workerId = match.params.workerId;
  const payTimeId = match.params.payTimeId;
  const gastronomyEvaluationId = match.params.gastronomyEvaluationId;
  const meliaEvaluationId = match.params.meliaEvaluationId;

  const [contentDisplay, setContentDisplay] = useState("inline");
  const [printDisplay, setPrintDisplay] = useState("none");

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const consultPrintContent = () => {
    scrollTop();
    setContentDisplay("none");
    setPrintDisplay("inline");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (userInfo.IsFoodAndDrinkBoss) {
      history.push("/403");
    } else {
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
  ]);

  return (
    <React.Fragment>
      {loadingDetails && <Loader />}
      {errorHotel && <Message variant="danger">{errorHotel}</Message>}
      {errorWorker && <Message variant="danger">{errorWorker}</Message>}
      {errorPayTime && <Message variant="danger">{errorPayTime}</Message>}
      {errorEvaluator && <Message variant="danger">{errorEvaluator}</Message>}
      {errorDetails && <Message variant="danger">{errorDetails}</Message>}
      {errorDetailsEval && (
        <Message variant="danger">{errorDetailsEval}</Message>
      )}

      <div style={{ display: contentDisplay }}>
        <h3 className="text-muted text-center mb-2">{hotel?.name}</h3>

        <CCard className="shadow">
          <CCardHeader>
            <CRow>
              <CCol xs="12" sm="8" md="8">
                <h4 className="text-muted">
                  Consultar Evaluación Mensual de Melia
                </h4>
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
            handleSubmitEval={null}
            monthlyMeliaEvaluation={monthlyMeliaEvaluation}
            onlyShow={true}
            handlePrint={handlePrint}
            consultPrintContent={consultPrintContent}
          />
        )}
      </div>

      <div style={{ display: printDisplay }}>
        <CCard className="shadow">
          <CCardBody>
            <ComponentPrint
              ref={componentRef}
              payTime={payTime}
              workerEvaluate={worker}
              evaluator={evaluator}
              hotel={hotel}
              monthlyMeliaEvaluation={monthlyMeliaEvaluation}
            />
          </CCardBody>

          <CCardFooter>
            <div className="text-center">
              <ButtonGroup
                variant="contained"
                aria-label="contained primary button group"
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    history.push(`/evaluations/monthly/${hotelId}`);
                  }}
                >
                  <ArrowBack className="mr-2" /> Volver al listado
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePrint}
                >
                  <Print className="mr-2" /> Imprimir Evaluación
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    scrollTop();
                    setContentDisplay("inline");
                    setPrintDisplay("none");
                  }}
                >
                  <Visibility className="mr-2" /> Volver al estado normal
                </Button>
              </ButtonGroup>
            </div>
          </CCardFooter>
        </CCard>
      </div>
    </React.Fragment>
  );
}

export default ShowMonthlyMeliaEvaluation;
