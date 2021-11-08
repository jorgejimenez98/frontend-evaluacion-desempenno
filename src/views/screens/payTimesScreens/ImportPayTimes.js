import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip, IconButton } from "@material-ui/core";
import { FaDownload } from "react-icons/fa";
import { zunColumns } from "./listColumns";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import ImportModalConfirmPayTimes from "./ImportModalConfirmPayTimes";
import {
  listOptions,
  MUIDataTable,
  Loader,
  Message,
} from "src/containers/utils/index";
import {
  getPayTimesZunList,
  importSelectedPayTimes,
} from "src/redux/actions/payTimesActions";
import {
  PAYTIMES_IMPORT_RESET,
  PAYTIMES_ZUN_LIST_RESET,
} from "src/redux/constants/payTimesConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function ImportPayTimes({ history }) {
  const dispatch = useDispatch();

  const [rowsSelected, setRowsSelected] = useState([]);
  const [showImportModalConfirm, setShowImportModalConfirm] = useState(false);

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);
  // Pay Times List from Zun Pos Selector
  const { loading, error, payTimes } = useSelector(
    (state) => state.payTimesZunList
  );
  // Import Pay Times Selector
  const {
    loading: loadingImport,
    error: errorImport,
    success: successImport,
  } = useSelector((state) => state.payTimesImport);
  // Add Only de Enable header Buttons
  listOptions.customToolbar = () => {
    return;
  };

  const closeConfirmModal = () => {
    setShowImportModalConfirm(false);
  };

  const importComfirmedItems = (data) => {
    dispatch(importSelectedPayTimes(data));
  };

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
        const message = "Períodos de Pago importados satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: PAYTIMES_IMPORT_RESET });
        history.push("/payTimes");
      }
      dispatch(getPayTimesZunList());
    }
    return () => {
      dispatch({ type: PAYTIMES_IMPORT_RESET });
      dispatch({ type: PAYTIMES_ZUN_LIST_RESET });
    };
  }, [dispatch, userInfo, history, successImport]);

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "multiple";
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = false;
  listOptions.filter = true;

  // Add Only de Enable header Buttons
  listOptions.customToolbarSelect = ({ data }) => {
    return (
      <React.Fragment>
        <Tooltip
          title="Importar Períodos de Pago Seleccionadas"
          className="mr-2"
        >
          <IconButton
            onClick={() => {
              let items = [];
              data.forEach((element) => {
                items.push(payTimes[element.dataIndex]);
              });
              setRowsSelected(items);
              setShowImportModalConfirm(true);
            }}
          >
            <FaDownload />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {loadingImport && <Loader />}
          {errorImport && <Message variant="danger">{errorImport}</Message>}
          <MUIDataTable
            title={`Listado de Períodos de Pago del Zun (${payTimes?.length})`}
            data={payTimes}
            columns={zunColumns}
            options={listOptions}
          />

          <ImportModalConfirmPayTimes
            showModal={showImportModalConfirm}
            items={rowsSelected}
            closeModal={closeConfirmModal}
            importComfirmedItems={importComfirmedItems}
          />
        </div>
      )}
    </div>
  );
}

export default ImportPayTimes;
