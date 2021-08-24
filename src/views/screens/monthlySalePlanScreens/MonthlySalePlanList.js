import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector, useDispatch } from "react-redux";
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { columns } from "./options/listColumns";
import { Tooltip, IconButton, ButtonGroup, Button } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import { FaTrash } from "react-icons/fa";
import GoBackButtonListHeader from "src/containers/utils/GoBackButtonListHeader";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import { MONTHLY_SALE_PLAN_DELETE_RESET } from "src/redux/constants/monthlySalePlanConstants";
import {
  Loader,
  Message,
  listOptions,
  MUIDataTable,
  AddButtomListHeader,
  DeleteManyItemsModal,
} from "src/containers/utils/index";
import {
  getMonthlySalePlansByYear,
  deleteMonthlySalePlans,
} from "src/redux/actions/monthlySalePlansActions";
import { getAnualSalePlanReport } from "src/redux/actions/anualSalePlansActions";
import MonthtlySalePlansPrintContent from "./options/MonthtlySalePlansPrintContent";
import { ANUAL_SALE_PLAN_REPORT_RESET } from "src/redux/constants/anuaSalePlanConstants";
import { HOTEL_DETAILS_RESET } from "src/redux/constants/hotelConstants";
import { ArrowBack, Print } from "@material-ui/icons";
import { CCard, CCardBody, CCardFooter } from "@coreui/react";

function MonthlySalePlanList({ match, history }) {
  const hotelId = match.params.hotelId;
  const anualSalePlanId = match.params.anualSalePlanId;
  const dispatch = useDispatch();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // My States
  const [showModal, setShowModal] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);
  const [contentDisplay, setContentDisplay] = useState("inline");
  const [printDisplay, setPrintDisplay] = useState("none");

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);
  // Hotel Details Selector
  const { error: errorHotel, hotel } = useSelector(
    (state) => state.hotelDetails
  );
  // Monthly Sale Plan List Selector
  const { loading, error, monhtlySalePlans } = useSelector(
    (state) => state.monthlySalePlanList
  );
  // Delete Monthly Plans Selector
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.monthlySalePlanDelete);
  // Anual Sale Report Selector
  const { error: errorReport, data: reportData } = useSelector(
    (state) => state.anualSalePlanReport
  );

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "multiple";
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = true;
  listOptions.filter = true;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (successDelete) {
        const message =
          "Planes de Venta Menuales eliminados satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: MONTHLY_SALE_PLAN_DELETE_RESET });
      }
      if (hotelId) {
        dispatch(getHotelDetails(hotelId, true));
      }
      if (anualSalePlanId) {
        dispatch(getMonthlySalePlansByYear(anualSalePlanId));
        dispatch(getAnualSalePlanReport(anualSalePlanId));
      }
    }
    return () => {
      dispatch({ type: MONTHLY_SALE_PLAN_DELETE_RESET });
      dispatch({ type: ANUAL_SALE_PLAN_REPORT_RESET });
      dispatch({ type: HOTEL_DETAILS_RESET });
    };
  }, [dispatch, userInfo, hotelId, history, anualSalePlanId, successDelete]);

  // Add Buttom to insert users to the table
  listOptions.customToolbar = () => {
    return (
      <React.Fragment>
        <Tooltip title={"Imprimir Reporte"}>
          <IconButton
            onClick={() => {
              setContentDisplay("none");
              setPrintDisplay("inline");
            }}
          >
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <GoBackButtonListHeader
          title={`Volver al Listado de Planes de Venta anuales del ${hotel?.name}`}
          link={`/sellPlans/${hotelId}`}
        />
        <AddButtomListHeader
          addLink={`/monthlySalePlan/${hotelId}/add/${anualSalePlanId}`}
          title="Insertar Plan de Venta Mensual"
        />
      </React.Fragment>
    );
  };

  // Add method on Rows delete to the table
  listOptions.customToolbarSelect = ({ data }) => {
    return (
      <React.Fragment>
        <Tooltip
          title="Eliminar Planes de Venta Seleccionados"
          className="mr-2"
        >
          <IconButton
            onClick={() => {
              let items = [];
              data.forEach((element) => {
                items.push(
                  monhtlySalePlans?.monthlySalePlans[element.dataIndex]
                );
              });
              setRowsToDelete(items);
              setShowModal(true);
            }}
          >
            <FaTrash />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };

  // Close Modal To delete Users
  const closeModal = () => {
    setShowModal(false);
  };

  // Delete Users after confirmed
  const deleteComfirmedItems = (items) => {
    dispatch(deleteMonthlySalePlans(items));
  };

  // Option to the csv download
  listOptions.downloadOptions = {
    filename: `Planes de Ventas del ${hotel?.name} del año ${monhtlySalePlans?.year}`,
    filterOptions: {
      useDisplayedColumnsOnly: true,
      useDisplayedRowsOnly: true,
    },
  };

  // Theme for the MUI-datatable
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiTableCell: {
          root: {
            padding: "3px",
          },
        },
      },
    });

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          {loadingDelete && <Loader />}
          {errorHotel && <Message variant="danger">{errorHotel}</Message>}
          {errorReport && <Message variant="danger">{errorReport}</Message>}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}

          <div style={{ display: contentDisplay }}>
            <h3 className="text-center text-muted mb-3">
              Planes de Venta Mensuales del <strong>{hotel?.name}</strong> del
              año <strong>{monhtlySalePlans?.year}</strong>. Moneda:{" "}
              <strong> {monhtlySalePlans?.currency}</strong>
            </h3>
            <MuiThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title={`Listado de planes de venta (${monhtlySalePlans?.monthlySalePlans?.length})`}
                data={monhtlySalePlans?.monthlySalePlans}
                columns={columns}
                options={listOptions}
              />
            </MuiThemeProvider>

            <DeleteManyItemsModal
              showModal={showModal}
              objectType={"Planes de venta Mensuales(s)"}
              items={rowsToDelete}
              deleteComfirmedItems={deleteComfirmedItems}
              closeModal={closeModal}
            />
          </div>

          {/* Print Content */}
          <div style={{ display: printDisplay }}>
            {monhtlySalePlans?.monthlySalePlans &&
              reportData &&
              hotel &&
              monhtlySalePlans && (
                <CCard className="shadow">
                  <CCardBody>
                    <MonthtlySalePlansPrintContent
                      ref={componentRef}
                      data={reportData}
                      coin={monhtlySalePlans?.currency}
                      year={monhtlySalePlans?.year}
                      hotelName={hotel?.name}
                    />
                  </CCardBody>

                  <CCardFooter>
                    <div className="text-center mb-4 mt-4">
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
                          <Print className="mr-2" /> Imprimir
                        </Button>
                      </ButtonGroup>
                    </div>
                  </CCardFooter>
                </CCard>
              )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default MonthlySalePlanList;
