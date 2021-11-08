import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  WORKER_IMPORT_FROM_ZUNPR_RESET,
  WORKER_LIST_FROM_ZUNPR_RESET,
} from "src/redux/constants/workerConstants";
import { columnsImport } from "./options/listColumns";
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { Tooltip, IconButton } from "@material-ui/core";
import { FaDownload } from "react-icons/fa";
import GoBackButtonListHeader from "src/containers/utils/GoBackButtonListHeader";
import ImportWorkersModal from "./ImportWorkersModal";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import {
  Loader,
  Message,
  MUIDataTable,
  listOptions,
} from "src/containers/utils/index";
import {
  getWorkerListFromZunPR,
  importWorkerList,
} from "src/redux/actions/workerActions";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function ImportWorkerList({ match, history }) {
  const hotelId = match.params.id;
  const dispatch = useDispatch();

  // State
  const [showConfirmImportModal, setShowConfirmImportModal] = useState(false);
  const [rowsToImport, setRowsToImport] = useState([]);

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);
  // Hotel Details Selector
  const { hotel } = useSelector((state) => state.hotelDetails);
  // Worker List From ZunPR Selector
  const { loading, error, workers } = useSelector(
    (state) => state.workerLisFromZunPR
  );
  // Import Selector
  const {
    loading: loadingImport,
    error: errorImport,
    success: successImport,
  } = useSelector((state) => state.importWorkers);

  const hotelZunPrId = hotel?.zunPrUnidadOrganizativaId;

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
      if (successImport) {
        const message = "Trabajadores Importados satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: WORKER_IMPORT_FROM_ZUNPR_RESET });
        history.push(`/workers/${hotelId}`);
      }
      if (hotelZunPrId) {
        dispatch(getWorkerListFromZunPR({ hotelZunPrId }));
      }
    }
    return () => {
      dispatch({ type: WORKER_LIST_FROM_ZUNPR_RESET });
    };
  }, [dispatch, userInfo, history, hotelId, hotelZunPrId, successImport]);

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "multiple";
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = false;
  listOptions.filter = true;

  // Add Buttom to insert users to the table
  listOptions.customToolbar = () => {
    return (
      <React.Fragment>
        <GoBackButtonListHeader
          title={`Volver al Listado de los Trabajadores del ${hotel?.name}`}
          link={`/workers/${hotelId}`}
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
                items.push(workers[element.dataIndex]);
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
    dispatch(importWorkerList({ hotelId, items }));
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          {loadingImport && <Loader />}
          {errorImport && <Message variant="danger">{errorImport}</Message>}

          <MUIDataTable
            title={`Listado de Trabajadores del ${hotel?.name} (${workers?.length})`}
            data={workers}
            columns={columnsImport}
            options={listOptions}
          />

          <ImportWorkersModal
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

export default ImportWorkerList;
