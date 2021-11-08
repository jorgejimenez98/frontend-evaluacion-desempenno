import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Tooltip } from "@material-ui/core";
import { FaTrash } from "react-icons/fa";
import ImportButtomListHeader from "src/containers/utils/ImportButtomListHeader";
import { columns } from "./listColumns";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import {
  Loader,
  Message,
  listOptions,
  MUIDataTable,
  ReloadButtonListHeader,
  DeleteManyItemsModal,
} from "src/containers/utils/index";
import {
  getPayTimesList,
  deleteSelectedPayTimes,
  sincronizePayTimes,
  rebuildPayTimes,
} from "src/redux/actions/payTimesActions";
import {
  PAYTIMES_DELETE_RESET,
  PAYTIMES_LIST_RESET,
  PAYTIMES_REBUILD_RESET,
  PAYTIMES_SINCRO_RESET,
} from "src/redux/constants/payTimesConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function PayTimeList({ history }) {
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);

  // Pay Times List Selector
  const { loading, error, payTimes } = useSelector(
    (state) => state.payTimesList
  );

  // Delete Selector
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.payTimesDelete);

  // Sincro Selector
  const {
    loading: loadingSincro,
    error: errorSincro,
    success: successSincro,
    newData,
  } = useSelector((state) => state.payTimesZunSincro);

  // Rebuild Selector
  const {
    loading: loadingRebuild,
    error: errorRebuild,
    success: successRebuild,
  } = useSelector((state) => state.payTimesRebuild);

  if (successSincro) {
    dispatch(rebuildPayTimes(newData));
    dispatch({ type: PAYTIMES_SINCRO_RESET });
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
        const message = "Períodos de Pago eliminados satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: PAYTIMES_DELETE_RESET });
      }
      if (successRebuild) {
        const message = "Períodos de Pago sincronizados satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: PAYTIMES_REBUILD_RESET });
      }
      dispatch(getPayTimesList());
    }
    return () => {
      dispatch({ type: PAYTIMES_LIST_RESET });
      dispatch({ type: PAYTIMES_DELETE_RESET });
      dispatch({ type: PAYTIMES_SINCRO_RESET });
      dispatch({ type: PAYTIMES_REBUILD_RESET });
    };
  }, [
    userInfo,
    history,
    dispatch,
    successDelete,
    successSincro,
    successRebuild,
  ]);

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "multiple";
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = false;
  listOptions.filter = true;

  // Close Modal To delete Users
  const closeModal = () => {
    setShowDeleteModal(false);
  };

  // Delete Users after confirmed
  const deleteComfirmedItems = (items) => {
    dispatch(deleteSelectedPayTimes(items));
  };

  // On Reload Items
  const onClickReload = () => {
    if (payTimes) {
      dispatch(sincronizePayTimes(payTimes));
    }
  };

  // Add Buttom to insert users to the table
  listOptions.customToolbar = () => {
    return (
      <React.Fragment>
        <ReloadButtonListHeader
          title="Sincronizar Períodos de Pago del Zun"
          onClick={onClickReload}
        />
        <ImportButtomListHeader
          title="Importar Períodos de Pago del Zun"
          link={"/payTimes/import"}
        />
      </React.Fragment>
    );
  };

  listOptions.customToolbarSelect = ({ data }) => {
    return (
      <React.Fragment>
        <Tooltip
          title="Eliminar Períodos de Pago Seleccionadas"
          className="mr-2"
        >
          <IconButton
            onClick={() => {
              let items = [];
              data.forEach((element) => {
                items.push(payTimes[element.dataIndex]);
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

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {(loadingDelete || loadingRebuild) && <Loader />}
          {loadingSincro && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {errorSincro && <Message variant="danger">{errorSincro}</Message>}
          {errorRebuild && <Message variant="danger">{errorRebuild}</Message>}

          <MUIDataTable
            title={`Listado de Períodos de Pago (${payTimes?.length})`}
            data={payTimes}
            columns={columns}
            options={listOptions}
          />

          <DeleteManyItemsModal
            showModal={showDeleteModal}
            objectType={"Períodos de Pago"}
            items={rowsToDelete}
            deleteComfirmedItems={deleteComfirmedItems}
            closeModal={closeModal}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default PayTimeList;
