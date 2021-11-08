import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import { columns } from "./options/listColumns";
import { IconButton, Tooltip } from "@material-ui/core";
import { FaDownload } from "react-icons/fa";
import ImportModalConfirmSellArea from "./ImportModalConfirmSellArea";
import {
  Loader,
  Message,
  MUIDataTable,
  listOptions,
} from "src/containers/utils";
import {
  getSellAreaListFromZunPos,
  importSellAreas,
} from "src/redux/actions/sellAreaActions";
import {
  SELL_AREA_LIST_FROM_ZUNPOS_RESET,
  SELL_AREA_UPDATE_RESET,
} from "src/redux/constants/sellAreaConstants";
import GoBackButtonListHeader from "src/containers/utils/GoBackButtonListHeader";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function SellAreaImport({ match, history }) {
  const hotelId = match.params.id;
  const dispatch = useDispatch();

  // State
  const [showConfirmImportModal, setShowConfirmImportModal] = useState(false);
  const [rowsToImport, setRowsToImport] = useState([]);

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);
  // Hotel Details Selector
  const hotelDetails = useSelector((state) => state.hotelDetails);
  const { hotel } = hotelDetails;
  // Sell Area List Selector
  const { loading, error, sellAreas } = useSelector(
    (state) => state.sellAreaListFromZunPos
  );
  // Sell Area Import Selector
  const {
    loading: loadingImports,
    error: errorImports,
    success: successImport,
  } = useSelector((state) => state.sellAreaUpdate);

  const hotelDbName = hotel?.pos_db_name;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (tokenhasExpired(userInfo)) {
        redirectLogin(history, dispatch);
      }
      if (successImport) {
        const message = "Puntos de Ventas importados satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: SELL_AREA_LIST_FROM_ZUNPOS_RESET });
        dispatch({ type: SELL_AREA_UPDATE_RESET });
        history.push(`/sellArea/${hotelId}`);
      }
      if (hotelId) {
        dispatch(getHotelDetails(hotelId, true));
      }
      if (hotelDbName) {
        dispatch(getSellAreaListFromZunPos(hotelDbName));
      }
    }
  }, [dispatch, userInfo, history, hotelId, hotelDbName, successImport]);

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "multiple";
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = false;
  listOptions.filter = false;

  // Add Buttom to insert users to the table
  listOptions.customToolbar = () => {
    return (
      <React.Fragment>
        <GoBackButtonListHeader
          title={`Volver al Listado de PV del ${hotel?.name}`}
          link={`/sellArea/${hotelId}`}
        />
      </React.Fragment>
    );
  };

  // Add Only de Enable header Buttons
  listOptions.customToolbarSelect = ({ data }) => {
    return (
      <React.Fragment>
        <Tooltip title="Importar Familias Seleccionadas" className="mr-2">
          <IconButton
            onClick={() => {
              let items = [];
              data.forEach((element) => {
                items.push(sellAreas[element.dataIndex]);
              });
              setRowsToImport(items);
              setShowConfirmImportModal(true);
            }}
          >
            <FaDownload />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };

  // Function to Close The Modal
  const closeModal = () => {
    setShowConfirmImportModal(false);
  };

  // Functions To Import the sell areas after confirmed
  const importConfirmedItems = (items) => {
    dispatch(importSellAreas(items, hotelId));
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          {loadingImports && <Loader />}
          {errorImports && <Message variant="danger">{errorImports}</Message>}

          <MUIDataTable
            title={`Listado de Puntos de Ventas del ${hotel?.name} desde El ${hotel?.pos_db_name} (${sellAreas?.length})`}
            data={sellAreas}
            columns={columns}
            options={listOptions}
          />

          <ImportModalConfirmSellArea
            showModal={showConfirmImportModal}
            closeModal={closeModal}
            items={rowsToImport}
            importComfirmedItems={importConfirmedItems}
            hotelName={hotel?.name}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default SellAreaImport;
