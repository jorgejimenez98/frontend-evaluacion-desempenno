import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GetpAppIcon from "@material-ui/icons/GetApp";
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { HOTEL_DETAILS_RESET } from "src/redux/constants/hotelConstants";
import { columns } from "./options/listColumns";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import ImportButtomListHeader from "src/containers/utils/ImportButtomListHeader";
import { IconButton, Tooltip } from "@material-ui/core";
import { FaTrash } from "react-icons/fa";
import {
  DeleteManyItemsModal,
  listOptions,
  Loader,
  Message,
  MUIDataTable,
  ReloadButtonListHeader,
} from "src/containers/utils";
import {
  getSellAreaList,
  deleteSelectedAreas,
  sincronizeSellAreas,
  rebuildSellAreaList,
} from "src/redux/actions/sellAreaActions";
import {
  SELL_AREA_DELETE_RESET,
  SELL_AREA_SINCRONIZE_RESET,
  SELL_AREA_REBUILD_LIST_RESET,
} from "src/redux/constants/sellAreaConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function SellAreaList({ match, history }) {
  const hotelId = match.params.id;
  const dispatch = useDispatch();

  // State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);
  // Hotel Details Selector
  const hotelDetails = useSelector((state) => state.hotelDetails);
  const { hotel } = hotelDetails;
  // Sell Area List Selector
  const { loading, error, sellAreas } = useSelector(
    (state) => state.sellAreaList
  );
  // Sell Area Delete Selector
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.sellAreaDelete);
  // Sell Area Sincronize Selector
  const {
    loading: loadingSincro,
    error: errorSincro,
    newData,
    success: successSincro,
  } = useSelector((state) => state.sellAreaSincronize);
  // Rebuild List Area Selector
  const {
    loading: loadingRebuild,
    error: errorRebuild,
    success: successRebuild,
  } = useSelector((state) => state.sellAreaRebuildList);

  if (successSincro) {
    dispatch(rebuildSellAreaList({ newData, hotelId }));
    dispatch({ type: SELL_AREA_SINCRONIZE_RESET });
  }

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
        const message = "Puntos de ventas eliminados satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: SELL_AREA_DELETE_RESET });
      }
      if (successRebuild) {
        const message =
          "Los Puntos de ventas han sido sincronizados satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: SELL_AREA_REBUILD_LIST_RESET });
      }
      if (hotelId) {
        dispatch(getHotelDetails(hotelId, true));
      }
      dispatch(getSellAreaList(hotelId));
    }

    return () => {
      dispatch({ type: HOTEL_DETAILS_RESET });
      dispatch({ type: SELL_AREA_DELETE_RESET });
      dispatch({ type: SELL_AREA_REBUILD_LIST_RESET });
    };
  }, [
    dispatch,
    userInfo,
    history,
    hotelId,
    successDelete,
    successRebuild,
    successSincro,
  ]);

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "multiple";
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = false;
  listOptions.filter = false;

  // Add Buttom to insert users to the table
  listOptions.customToolbar = () => {
    const hotelDbName = hotel?.pos_db_name;
    return (
      <React.Fragment>
        <ReloadButtonListHeader
          title="Sincronizar Puntos de Venta del ZunPos"
          onClick={() =>
            dispatch(sincronizeSellAreas({ sellAreas, hotelDbName }))
          }
        />
        <ImportButtomListHeader
          title="Importar Familias del ZunPos"
          link={`/import/sellArea/${hotelId}`}
        />
      </React.Fragment>
    );
  };

  listOptions.customToolbarSelect = ({ data }) => {
    return (
      <React.Fragment>
        <Tooltip
          title="Eliminar Puntos de Venta Seleccionados"
          className="mr-2"
        >
          <IconButton
            onClick={() => {
              let items = [];
              data.forEach((element) => {
                items.push(sellAreas[element.dataIndex]);
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

  // Function to Delete The selected Items after Confirmed
  const deleteComfirmedItems = (items) => {
    dispatch(deleteSelectedAreas(items));
  };

  // Function to Close de Delete Modal
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
        sellAreas && (
          <React.Fragment>
            {sellAreas.length === 0 && (
              <Message variant="info">
                Por favor, presione el botón <GetpAppIcon /> para importar las{" "}
                <strong>Puntos de Ventas</strong> del hotel{" "}
                <strong>{hotel?.name}</strong> desde el ZUN PR
              </Message>
            )}

            {(loadingSincro || loadingRebuild || loadingDelete) && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {errorSincro && <Message variant="danger">{errorSincro}</Message>}
            {errorRebuild && <Message variant="danger">{errorRebuild}</Message>}

            <MUIDataTable
              title={`Listado de Puntos de Ventas del ${hotel?.name} (${sellAreas.length})`}
              data={sellAreas}
              columns={columns}
              options={listOptions}
            />

            <DeleteManyItemsModal
              showModal={showDeleteModal}
              objectType={"Punto de venta(s)"}
              items={rowsToDelete}
              deleteComfirmedItems={deleteComfirmedItems}
              closeModal={closeModal}
            />
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
}

export default SellAreaList;
