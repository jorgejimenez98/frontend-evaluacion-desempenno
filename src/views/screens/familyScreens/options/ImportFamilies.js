import {
  Loader,
  Message,
  MUIDataTable,
  listOptions,
} from "src/containers/utils";
import {
  getFamilyListFromZunPos,
  updateFamilyListFromZunPos,
} from "src/redux/actions/familyActions";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { columns } from "./listColumns";
import { IconButton, Tooltip } from "@material-ui/core";
import { FaDownload } from "react-icons/fa";
import ImportModalConfirm from "./ImportModalConfirm";
import { FAMILY_LIST_UPDATE_FROM_ZUNPOS_RESET } from "src/redux/constants/familyConstants";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";

function ImportFamilies({ history }) {
  const dispatch = useDispatch();

  const [rowsSelected, setRowsSelected] = useState([]);
  const [showImportModalConfirm, setShowImportModalConfirm] = useState(false);

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);
  // Family List from Zun Pos Selector
  const { loading, error, families } = useSelector(
    (state) => state.familyListFromZunPos
  );
  // Update Family from Zun Pos Selector
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.updatefamilyListFromZunPos);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (successUpdate) {
        const message = "Las familias se han importado satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: FAMILY_LIST_UPDATE_FROM_ZUNPOS_RESET });
        history.push("/families");
      }
      dispatch(getFamilyListFromZunPos());
    }
  }, [dispatch, userInfo, history, successUpdate]);

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = 'multiple';
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = false;
  listOptions.filter = false;

  // Add Only de Enable header Buttons
  listOptions.customToolbar = () => {
    return;
  };

  const closeConfirmModal = () => {
    setShowImportModalConfirm(false);
  };

  const importComfirmedItems = (data) => {
    dispatch(updateFamilyListFromZunPos(data));
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
                items.push(families[element.dataIndex]);
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
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

          <MUIDataTable
            title={`Listado de familias del Zun Pos (${families?.length})`}
            data={families}
            columns={columns}
            options={listOptions}
          />

          <ImportModalConfirm
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

export default ImportFamilies;
