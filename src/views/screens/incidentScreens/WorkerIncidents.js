import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import GoBackButtonListHeader from "src/containers/utils/GoBackButtonListHeader";
import PaymentsTable from "./tables/PaymentsTable";
import DiscountTabla from "./tables/DiscountTable";
import AbsencesTable from "./tables/AbsencesTable";
import VacationTable from "./tables/VacationTable";
import WithHoldingsTable from "./tables/WithHoldingsTable";
import SubsidyTable from "./tables/SubsidyTable";
// Constants
import { PAYTIMES_DETAILS_RESET } from "src/redux/constants/payTimesConstants";
import { WORKER_DETAILS_RESET } from "src/redux/constants/workerConstants";
import { INCIDENTS } from "src/redux/constants/incidentsConstants";
// Actions
import { getPayTimeDetails } from "src/redux/actions/payTimesActions";
import { getWorkerDetails } from "src/redux/actions/workerActions";
import { getWorkerIncidents } from "src/redux/actions/incidentActions";
import { Message, Loader } from "src/containers/utils";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

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

  // Incidents Selector
  const { loading, error, data } = useSelector((state) => state.incidents);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (tokenhasExpired(userInfo)) {
        redirectLogin(history, dispatch);
      }
      if (workerId) {
        dispatch(getWorkerDetails(workerId));
      }
      if (payTimeId) {
        dispatch(getPayTimeDetails(payTimeId));
      }
      if (workerId && payTimeId) {
        dispatch(getWorkerIncidents({ workerId, payTimeId }));
      }
    }
    return () => {
      dispatch({ type: WORKER_DETAILS_RESET });
      dispatch({ type: PAYTIMES_DETAILS_RESET });
      dispatch({ type: INCIDENTS.INCIDENTS_RESET });
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

          <CCardBody>
            {/* MAIN CONTENT */}
            {loading ? (
              <Loader />
            ) : error ? (
              error && <Message variant="danger">{error}</Message>
            ) : (
              data && (
                <React.Fragment>
                  {data.pagos && <PaymentsTable list={data.pagos} />}
                  <hr />
                  {data.descuentos && <DiscountTabla list={data.descuentos} />}
                  <hr />
                  {data.ausencias && <AbsencesTable list={data.ausencias} />}
                  <hr />
                  {data.vacaciones && <VacationTable list={data.vacaciones} />}
                  <hr />
                  {data.retenciones && (
                    <WithHoldingsTable list={data.retenciones} />
                  )}
                  <hr />
                  {data.subsidios && <SubsidyTable list={data.subsidios} />}
                </React.Fragment>
              )
            )}
          </CCardBody>
        </CCard>
      )}
    </React.Fragment>
  );
}

export default WorkerIncidents;
