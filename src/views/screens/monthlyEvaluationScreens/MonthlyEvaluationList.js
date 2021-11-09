import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { HiOutlineDocumentReport } from "react-icons/all";
// Components
import PrintContentPerformanceEvaluation from "./printContent/PrintContentPerformanceEvaluation";
import {
  Message,
  Loader,
  listOptions,
  MUIDataTable,
} from "src/containers/utils/index";
import {
  FormControl,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { Print, ArrowBack } from "@material-ui/icons";
import { BootstrapInput } from "../monthlySalePlanScreens/options/styles";
import {
  CFormGroup,
  CCol,
  CLabel,
  CCardBody,
  CCardFooter,
  CCard,
} from "@coreui/react";
import { columns } from "./options/listColumns";
// Actions
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { getPayTimesList } from "src/redux/actions/payTimesActions";
import { getEvaluatorDetails } from "src/redux/actions/workerActions";
import {
  getMonthlyEvaluations,
  getMonthlyMeliaEvaluationResume,
} from "src/redux/actions/monthlyEvaluationActions";
// Constants
import { HOTEL_DETAILS_RESET } from "src/redux/constants/hotelConstants";
import { PAYTIMES_LIST_RESET } from "src/redux/constants/payTimesConstants";
import { WORKER_MONTHLY_EVALUATION_LIST_RESET } from "src/redux/constants/monthlyEvaluationConstants";
import { WORKER_EVALUATOR_DETAILS_RESET } from "src/redux/constants/workerConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function MonthlyEvaluationList({ match, history }) {
  const hotelId = match.params.hotelId;
  const dispatch = useDispatch();

  // My States
  const [payTimeSelected, setPayTimeSelected] = useState("");
  const [contentDisplay, setContentDisplay] = useState("inline");
  const [printDisplay, setPrintDisplay] = useState("none");

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
  // Pay Time List Selector
  const {
    loading: loadingPayTime,
    error: errorPayTime,
    payTimes,
  } = useSelector((state) => state.payTimesList);
  // Monthly Evaluations Selector
  const {
    loading: loadingEvaluations,
    error: errorEvaluation,
    evaluations,
  } = useSelector((state) => state.monthlyEvaluations);

  // Resume Selector
  const {
    loading: loadingResume,
    error: errorResume,
    evaluations: evaluationsResume,
  } = useSelector((state) => state.monthlyMeliaEvaluationResume);

  // Evaluator Details
  const { error: errorEvaluator, evaluator } = useSelector(
    (state) => state.evaluatorDetails
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
      dispatch(getPayTimesList());
      dispatch(getEvaluatorDetails());
    }
    return () => {
      setPayTimeSelected("");
      setContentDisplay("inline");
      setPrintDisplay("none");
      dispatch({ type: HOTEL_DETAILS_RESET });
      dispatch({ type: PAYTIMES_LIST_RESET });
      dispatch({ type: WORKER_MONTHLY_EVALUATION_LIST_RESET });
      dispatch({ type: WORKER_EVALUATOR_DETAILS_RESET });
    };
  }, [dispatch, history, userInfo, hotelId]);

  const handlePayTimeChangeChange = (e) => {
    const index = e.target.value;
    setPayTimeSelected(index);
    if (index !== "") {
      dispatch(
        getMonthlyEvaluations({
          hotelId: hotelId,
          payTimeId: payTimes[index].id,
        })
      );
    }
  };

  // Init first payTime
  if (
    payTimeSelected === "" &&
    payTimes !== undefined &&
    payTimes.length !== 0
  ) {
    setPayTimeSelected(0);
    dispatch(
      getMonthlyEvaluations({
        hotelId: hotelId,
        payTimeId: payTimes[0].id,
      })
    );
  }

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "none";
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = false;
  listOptions.filter = true;

  listOptions.customToolbar = () => {
    return (
      <React.Fragment>
        <Tooltip title={"Resumen del Desempeño"}>
          <IconButton
            onClick={() => {
              setContentDisplay("none");
              setPrintDisplay("inline");
              dispatch(
                getMonthlyMeliaEvaluationResume({
                  payTimeId: payTimes[payTimeSelected].id,
                  hotelId,
                })
              );
            }}
          >
            <HiOutlineDocumentReport />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };

  // Add method on Rows delete to the table
  listOptions.customToolbarSelect = () => {
    return;
  };

  return (
    <React.Fragment>
      <div style={{ display: contentDisplay }}>
        <h4 className="text-center text-muted mb-3">
          Evaluación Mensual del <strong>{hotel?.name}</strong>
        </h4>

        {!errorEvaluator && (
          <React.Fragment>
            {/* Pay Times */}
            {loadingPayTime ? (
              <Loader />
            ) : errorPayTime ? (
              <Message variant="danger">{errorPayTime}</Message>
            ) : (
              payTimes && (
                <React.Fragment>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel className="mt-2">
                        Seleccione un <strong>Período de Pago</strong>
                      </CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <FormControl style={{ width: "100%" }}>
                        <Select
                          value={payTimeSelected}
                          onChange={handlePayTimeChangeChange}
                          input={<BootstrapInput />}
                        >
                          <MenuItem value="" disabled>
                            <em>Seleccione un Período de Pago</em>
                          </MenuItem>
                          {payTimes.map((item, index) => (
                            <MenuItem value={String(index)} key={index}>
                              {item.year} - {item.month}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </CCol>
                  </CFormGroup>

                  {/* Monthly Evaluations */}
                  {loadingEvaluations ? (
                    <Loader />
                  ) : errorEvaluation ? (
                    <Message variant="danger">{errorEvaluation}</Message>
                  ) : (
                    <div className="mb-3">
                      <MUIDataTable
                        title={`Listado de Evaluaciones Mensuales (${
                          evaluations?.length === undefined
                            ? "0"
                            : evaluations?.length
                        })`}
                        data={evaluations}
                        columns={columns}
                        options={listOptions}
                      />
                    </div>
                  )}
                </React.Fragment>
              )
            )}
          </React.Fragment>
        )}
      </div>

      {errorHotel && <Message variant="danger">{errorHotel}</Message>}
      {errorEvaluator && <Message variant="danger">{errorEvaluator}</Message>}

      {/* Print Content */}
      <div style={{ display: printDisplay }}>
        {loadingResume ? (
          <Loader />
        ) : errorResume ? (
          <Message variant="danger">{errorResume}</Message>
        ) : (
          evaluationsResume &&
          hotel &&
          evaluator &&
          payTimes && (
            <CCard className="shadow">
              <CCardBody>
                <PrintContentPerformanceEvaluation
                  ref={componentRef}
                  evaluations={evaluationsResume}
                  hotel={hotel}
                  payTimes={payTimes}
                  payTimeId={payTimeSelected}
                  evaluator={evaluator}
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
                        setContentDisplay("inline");
                        setPrintDisplay("none");
                      }}
                    >
                      <ArrowBack className="mr-2" /> Volver al listado
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handlePrint}
                    >
                      <Print className="mr-2" /> Imprimir Resumen del Desempeño
                    </Button>
                  </ButtonGroup>
                </div>
              </CCardFooter>
            </CCard>
          )
        )}
      </div>
    </React.Fragment>
  );
}

export default MonthlyEvaluationList;
