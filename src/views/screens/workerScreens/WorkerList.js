import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { columns } from "./options/listColumns";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import ImportButtomListHeader from "src/containers/utils/ImportButtomListHeader";
import { IconButton, Tooltip } from "@material-ui/core";
import { FaTrash } from "react-icons/fa";
import {
  WORKER_DELETE_RESET,
  WORKER_REBUILD_RESET,
  WORKER_SINCRO_RESET,
} from "src/redux/constants/workerConstants";
import {
  DeleteManyItemsModal,
  listOptions,
  Loader,
  Message,
  MUIDataTable,
  ReloadButtonListHeader,
} from "src/containers/utils";
import {
  getWorkerList,
  deleteWorkers,
  sincronizeWorkers,
  rebuildWorkersList,
} from "src/redux/actions/workerActions";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function WorkerList({ match, history }) {
  const hotelId = match.params.id;
  const dispatch = useDispatch();
  // State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);
  // Hotel Details Selector
  const { hotel } = useSelector((state) => state.hotelDetails);
  // Worker List Selector
  const { loading, error, workers } = useSelector((state) => state.workerList);
  // Delete Workers Selector
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.deleteWorkers);
  // Worker Sincro Selector
  const {
    loading: loadingSincro,
    error: errorSincro,
    success: successSincro,
    workers: newData,
  } = useSelector((state) => state.workerSincro);
  // Rebuild Selector
  const {
    loading: loadingRebuild,
    success: successRebuild,
    error: errorRebuild,
  } = useSelector((state) => state.rebuildWorkers);

  if (successSincro) {
    dispatch(rebuildWorkersList({ newData, hotelId }));
    dispatch({ type: WORKER_SINCRO_RESET });
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
        const message = "Trabajadores Eliminados Satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: WORKER_DELETE_RESET });
      }
      if (successRebuild) {
        const message = "Trabajadores Sincronizados Satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: WORKER_REBUILD_RESET });
      }
      if (hotelId) {
        dispatch(getHotelDetails(hotelId, true));
        dispatch(getWorkerList(hotelId));
      }
    }
  }, [
    dispatch,
    userInfo,
    hotelId,
    history,
    successDelete,
    successSincro,
    successRebuild,
  ]);

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "multiple";
  listOptions.download = true;
  listOptions.print = false;
  listOptions.viewColumns = true;
  listOptions.filter = true;

  // Option to the csv download
  listOptions.downloadOptions = {
    filename: `Trabajadores del ${hotel?.name}`,
    filterOptions: {
      useDisplayedColumnsOnly: true,
      useDisplayedRowsOnly: true,
    },
  };

  // Add Buttom to insert users to the table
  listOptions.customToolbar = () => {
    return (
      <React.Fragment>
        <ReloadButtonListHeader
          title="Sincronizar Trabajadores con el ZunPr"
          onClick={() =>
            dispatch(
              sincronizeWorkers({
                workers,
                hotelZunPrId: hotel?.zunPrUnidadOrganizativaId,
              })
            )
          }
        />
        <ImportButtomListHeader
          title="Importar Trabajadoeres del ZunPr"
          link={`/import/workers/${hotelId}`}
        />
      </React.Fragment>
    );
  };

  listOptions.customToolbarSelect = ({ data }) => {
    return (
      <React.Fragment>
        <Tooltip title="Eliminar Trabajadores Seleccionados" className="mr-2">
          <IconButton
            onClick={() => {
              let items = [];
              data.forEach((element) => {
                items.push(workers[element.dataIndex]);
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
    dispatch(deleteWorkers(items));
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
        <React.Fragment>
          {workers?.length === 0 && (
            <Message variant="info">
              Por favor, importe los trabajadores desde el{" "}
              <strong>ZunPr</strong>
            </Message>
          )}

          {loadingDelete && <Loader />}
          {(loadingSincro || loadingRebuild) && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {errorSincro && <Message variant="danger">{errorSincro}</Message>}
          {errorRebuild && <Message variant="danger">{errorRebuild}</Message>}

          <MUIDataTable
            title={`Listado de Trabajadores del ${hotel?.name} (${workers?.length})`}
            data={workers}
            columns={columns}
            options={listOptions}
          />

          <DeleteManyItemsModal
            showModal={showDeleteModal}
            objectType={"Trabajador(es)"}
            items={rowsToDelete}
            deleteComfirmedItems={deleteComfirmedItems}
            closeModal={closeModal}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default WorkerList;
