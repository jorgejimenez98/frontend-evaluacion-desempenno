import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
// Components
import { Button } from "@material-ui/core";
import { Print } from "@material-ui/icons";
import GoBackButtonListHeader from "src/containers/utils/GoBackButtonListHeader";
import PrintContent from "./PrintContent";
// Constants
import { HOTEL_DETAILS_RESET } from "src/redux/constants/hotelConstants";
import { PAYTIMES_DETAILS_RESET } from "src/redux/constants/payTimesConstants";
import { WORKER_DETAILS_RESET } from "src/redux/constants/workerConstants";
// Actions
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { getPayTimeDetails } from "src/redux/actions/payTimesActions";
import { getWorkerDetails } from "src/redux/actions/workerActions";
import { Message } from "src/containers/utils";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function ShowPerformanceBook({ match, history }) {
  const dispatch = useDispatch();
  const hotelId = match.params.hotelId;
  const workerId = match.params.workerId;
  const payTimeId = match.params.payTimeId;

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

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
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
      if (payTimeId) {
        dispatch(getPayTimeDetails(payTimeId));
      }
    }
    return () => {
      dispatch({ type: WORKER_DETAILS_RESET });
      dispatch({ type: HOTEL_DETAILS_RESET });
      dispatch({ type: PAYTIMES_DETAILS_RESET });
    };
  }, [userInfo, hotelId, dispatch, history, workerId, payTimeId]);

  return (
    <React.Fragment>
      {errorHotel && <Message variant="danger">{errorHotel}</Message>}
      {errorWorker && <Message variant="danger">{errorWorker}</Message>}
      {errorPayTime && <Message variant="danger">{errorPayTime}</Message>}

      <CCard className="shadow">
        <CCardHeader>
          <CRow>
            <CCol xs="12" sm="8" md="8">
              <h4 className="text-muted">Portada del Libro del Desempeño</h4>
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
          <PrintContent payTime={payTime} worker={worker} ref={componentRef} />
        </CCardBody>

        <CCardFooter className="text-center">
          <Button variant="contained" color="primary" onClick={handlePrint}>
            <Print className="mr-2" /> Imprimir
          </Button>
        </CCardFooter>
      </CCard>
    </React.Fragment>
  );
}

export default ShowPerformanceBook;
