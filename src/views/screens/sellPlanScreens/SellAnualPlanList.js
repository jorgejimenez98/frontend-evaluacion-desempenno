import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { columns } from "./listColumns";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { IconButton, Tooltip } from "@material-ui/core";
import { FaTrash } from "react-icons/fa";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import { ANUAL_SALE_PLAN_DELETE_RESET } from "src/redux/constants/anuaSalePlanConstants";
import {
  Loader,
  Message,
  MUIDataTable,
  listOptions,
  AddButtomListHeader,
  DeleteManyItemsModal,
} from "src/containers/utils/index";
import {
  getAnualSalePlansList,
  deleteAnualPlans,
} from "src/redux/actions/anualSalePlansActions";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function SellAnualPlanList({ match, history }) {
  const hotelId = match.params.id;
  const dispatch = useDispatch();

  // States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);
  // Hotel Details Selector
  const { hotel } = useSelector((state) => state.hotelDetails);
  // Anual Sale Plan List Selector
  const { loading, error, anualSalePlans } = useSelector(
    (state) => state.anualSalePlanList
  );
  // Delete Selector
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = useSelector((state) => state.anualSalePlanDelete);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (tokenhasExpired(userInfo)) {
        redirectLogin(history, dispatch);
      }
      if (successDelete) {
        const message = "Planes de Venta Anuales eliminados satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: ANUAL_SALE_PLAN_DELETE_RESET });
      }
      if (hotelId) {
        dispatch(getHotelDetails(hotelId, true));
        dispatch(getAnualSalePlansList({ hotelId }));
      }
    }
    return () => {
      dispatch({ type: ANUAL_SALE_PLAN_DELETE_RESET });
    };
  }, [dispatch, userInfo, hotelId, history, successDelete]);

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "multiple";
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = false;
  listOptions.filter = true;

  listOptions.customToolbarSelect = ({ data }) => {
    return (
      <React.Fragment>
        <Tooltip title="Eliminar Familias Seleccionadas" className="mr-2">
          <IconButton
            onClick={() => {
              let items = [];
              data.forEach((element) => {
                items.push(anualSalePlans[element.dataIndex]);
              });
              setRowsToDelete(items);
              setShowDeleteModal(true);
            }}
          >
            <FaTrash />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };

  // Theme for the MUI-datatable
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiTableCell: {
          root: {
            padding: "8px",
          },
        },
      },
    });

  // Add Buttom to insert users to the table
  listOptions.customToolbar = () => {
    return (
      <AddButtomListHeader
        addLink={`/sellPlan/${hotelId}/add`}
        title={`Insertar Plan anual de Ventas al ${hotel?.name}`}
      />
    );
  };

  // Delete Users after confirmed
  const deleteComfirmedItems = (items) => {
    dispatch(deleteAnualPlans(items));
  };

  // Close Modal To delete Users
  const closeModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={`Listado de Planes de ventas del ${hotel?.name} (${anualSalePlans?.length})`}
              data={anualSalePlans}
              columns={columns}
              options={listOptions}
            />

            <DeleteManyItemsModal
              showModal={showDeleteModal}
              objectType={"Planes de venta Anual(es)"}
              items={rowsToDelete}
              deleteComfirmedItems={deleteComfirmedItems}
              closeModal={closeModal}
            />
          </MuiThemeProvider>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default SellAnualPlanList;
