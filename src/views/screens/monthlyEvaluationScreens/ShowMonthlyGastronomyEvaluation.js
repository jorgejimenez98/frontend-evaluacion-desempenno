import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Actions
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { getPayTimeDetails } from "src/redux/actions/payTimesActions";
import {
  getWorkerDetails,
  getEvaluatorDetails,
} from "src/redux/actions/workerActions";
import { getMonthlyGastronomyEvaluationDetails } from "src/redux/actions/monthlyEvaluationActions";
// Constants
import { HOTEL_DETAILS_RESET } from "src/redux/constants/hotelConstants";
import { PAYTIMES_DETAILS_RESET } from "src/redux/constants/payTimesConstants";
import { WORKER_MONTHLY_EVALUATION_DETAILS_RESET } from "src/redux/constants/monthlyEvaluationConstants";
import {
  WORKER_DETAILS_RESET,
  WORKER_EVALUATOR_DETAILS_RESET,
} from "src/redux/constants/workerConstants";
// Components
import { Message, SrollDownButtom, Loader } from "src/containers/utils/index";
import GoBackButtonListHeader from "src/containers/utils/GoBackButtonListHeader";
import FormEvaluation from "./options/FormEvaluation";
import EvaluatorContent from "./options/EvaluatorContent";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";

function ShowMonthlyGastronomyEvaluation({ match, history }) {
  const dispatch = useDispatch();
  const hotelId = match.params.hotelId;
  const workerId = match.params.workerId;
  const payTimeId = match.params.payTimeId;
  const evalId = match.params.evalId;

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
  const {
    loading: loadingDetails,
    error: errorDetails,
    monthlyGastronomyEvaluation,
  } = useSelector((state) => state.monthlyEvaluationDetails);


  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (hotelId) {
        dispatch(getHotelDetails(hotelId, true));
      }
      if (workerId) {
        dispatch(getWorkerDetails(workerId));
      }
      if (payTimeId) {
        dispatch(getPayTimeDetails(payTimeId));
      }
      if (evalId) {
        dispatch(getMonthlyGastronomyEvaluationDetails(evalId));
      }
      dispatch(getEvaluatorDetails());
    }
    return () => {
      dispatch({ type: WORKER_DETAILS_RESET });
      dispatch({ type: HOTEL_DETAILS_RESET });
      dispatch({ type: PAYTIMES_DETAILS_RESET });
      dispatch({ type: WORKER_EVALUATOR_DETAILS_RESET });
      dispatch({ type: WORKER_MONTHLY_EVALUATION_DETAILS_RESET });
    };
  }, [userInfo, hotelId, dispatch, history, workerId, payTimeId, evalId]);


  return (
    <React.Fragment>
      {loadingDetails ? (
        <Loader />
      ) : errorDetails ? (
        <Message variant="danger">{errorDetails}</Message>
      ) : (
        monthlyGastronomyEvaluation && (
          <React.Fragment>
            {errorHotel && <Message variant="danger">{errorHotel}</Message>}
            {errorWorker && <Message variant="danger">{errorWorker}</Message>}
            {errorPayTime && <Message variant="danger">{errorPayTime}</Message>}
            {errorEvaluator && (
              <Message variant="danger">{errorEvaluator}</Message>
            )}

            <h3 className="text-muted text-center mb-2">{hotel?.name}</h3>

            <CCard className="shadow">
              <CCardHeader>
                <CRow>
                  <CCol xs="12" sm="8" md="8">
                    <h4 className="text-muted">
                      Evaluación Mensual de Gastronomía
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
                  dateCreation={monthlyGastronomyEvaluation.evaluationDate}
                />

                <CCardFooter>
                  <div className="text-center mb-n3">
                    <SrollDownButtom />
                  </div>
                </CCardFooter>
              </CCardBody>
            </CCard>

            <FormEvaluation
              onSubmitEvaluation={null}
              monthlyGastronomyEvaluation={monthlyGastronomyEvaluation}
              canPrint={true}
            />
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
}

export default ShowMonthlyGastronomyEvaluation;
