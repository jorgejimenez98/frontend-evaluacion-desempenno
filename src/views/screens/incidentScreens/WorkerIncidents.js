import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
// Components
import GoBackButtonListHeader from "src/containers/utils/GoBackButtonListHeader";
// Constants
import { PAYTIMES_DETAILS_RESET } from "src/redux/constants/payTimesConstants";
import { WORKER_DETAILS_RESET } from "src/redux/constants/workerConstants";
// Actions
import { getPayTimeDetails } from "src/redux/actions/payTimesActions";
import { getWorkerDetails } from "src/redux/actions/workerActions";
import { Message } from "src/containers/utils";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

function WorkerIncidents({ match, history }) {
  const dispatch = useDispatch();
  const workerId = match.params.workerId;
  const payTimeId = match.params.payTimeId;
  const hotelId = match.params.hotelId;

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);

  // Worker Details Selector
  const { error: errorWorker, worker } = useSelector(
    (state) => state.workerDetails
  );

  // Pay Time Details
  const { error: errorPayTime, payTime } = useSelector(
    (state) => state.payTimesDetails
  );

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (workerId) {
        dispatch(getWorkerDetails(workerId));
      }
      if (payTimeId) {
        dispatch(getPayTimeDetails(payTimeId));
      }
    }
    return () => {
      dispatch({ type: WORKER_DETAILS_RESET });
      dispatch({ type: PAYTIMES_DETAILS_RESET });
    };
  }, [userInfo, dispatch, history, workerId, payTimeId]);

  return (
    <React.Fragment>
      {errorWorker && <Message variant="danger">{errorWorker}</Message>}
      {errorPayTime && <Message variant="danger">{errorPayTime}</Message>}

      {worker && payTime && (
        <CCard className="shadow">
          <CCardHeader>
            <CRow>
              <CCol xs="12" sm="8" md="8">
                <h4 className="text-muted">
                  Incidencias de <strong>{worker.nombreCompleto}</strong> -{" "}
                  {payTime.month} {payTime.year}
                </h4>
              </CCol>
              <CCol xs="12" sm="4" md="4">
                <div className="card-header-actions">
                  <GoBackButtonListHeader
                    link={`/evaluations/monthly/${hotelId}`}
                    title={`Volver al Listado de Evaluaciones Mensuales`}
                  />
                </div>
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>La cosa va aqui adentro</CCardBody>
        </CCard>
      )}
    </React.Fragment>
  );
}

export default WorkerIncidents;
