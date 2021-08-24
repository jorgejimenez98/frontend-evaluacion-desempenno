import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFamilyList,
  deleteSelectedFamilies,
  sincronizeFamilies,
  getFamilyListFromZunPos,
} from "src/redux/actions/familyActions";
import {
  Loader,
  Message,
  listOptions,
  MUIDataTable,
  DeleteManyItemsModal,
  ReloadButtonListHeader,
} from "src/containers/utils/index";
import {
  FAMILY_DELETE_RESET,
  FAMILY_SINCRONIZE_RESET,
} from "src/redux/constants/familyConstants";
import { columns } from "./options/listColumns";
import ImportButtomListHeader from "src/containers/utils/ImportButtomListHeader";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import { IconButton, Tooltip } from "@material-ui/core";
import { FaTrash } from "react-icons/fa";

function FamilyListScreen({ history }) {
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // family List Selector
  const familyList = useSelector((state) => state.familyList);
  const { loading, error, families } = familyList;
  // Delete Family Selector
  const deletefamilySelector = useSelector((state) => state.deletefamily);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = deletefamilySelector;
  // Family List from Zun Pos Selector
  const { families: familiesFromZunPos } = useSelector(
    (state) => state.familyListFromZunPos
  );
  // Sincronize Selector
  const {
    loading: loadingSincro,
    error: errorSincro,
    success: successSincro,
  } = useSelector((state) => state.sincronizefamily);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (successDelete) {
        const message = "Familias eliminadas satifactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: FAMILY_DELETE_RESET });
      }
      if (successSincro) {
        const message = "Familias sincronizadas satifactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: FAMILY_SINCRONIZE_RESET });
      }
      dispatch(getFamilyList());
      dispatch(getFamilyListFromZunPos());
    }
    return () => {
      dispatch({ type: FAMILY_DELETE_RESET });
      dispatch({ type: FAMILY_SINCRONIZE_RESET });
    }
  }, [userInfo, history, dispatch, successDelete, successSincro]);

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = 'multiple';
  listOptions.download = false;
  listOptions.print = false;
  listOptions.viewColumns = false;
  listOptions.filter = false;

  // Close Modal To delete Users
  const closeModal = () => {
    setShowDeleteModal(false);
  };

  // Delete Users after confirmed
  const deleteComfirmedItems = (items) => {
    dispatch(deleteSelectedFamilies(items));
  };

  // On Reload Items
  const onClickReload = () => {
    if (familiesFromZunPos) {
      dispatch(sincronizeFamilies(families, familiesFromZunPos));
    } else {
      const message =
        "Las Familias del Zunpos no estan preparadas para sincronizarse";
      dispatch(setSnackbar(true, "warning", message));
    }
  };

  // Add Buttom to insert users to the table
  listOptions.customToolbar = () => {
    return (
      <React.Fragment>
        <ReloadButtonListHeader
          title="Sincronizar Familias del ZunPos"
          onClick={onClickReload}
        />
        <ImportButtomListHeader
          title="Importar Familias del ZunPos"
          link={"/families/import"}
        />
      </React.Fragment>
    );
  };

  listOptions.customToolbarSelect = ({ data }) => {
    return (
      <React.Fragment>
        <Tooltip title="Eliminar Familias Seleccionadas" className="mr-2">
          <IconButton
            onClick={() => {
              let items = [];
              data.forEach((element) => {
                items.push(families[element.dataIndex]);
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
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {errorSincro && <Message variant="danger">{errorSincro}</Message>}
          {loadingDelete && <Loader />}
          {loadingSincro && <Loader />}

          <MUIDataTable
            title={`Listado de familias (${families?.length})`}
            data={families}
            columns={columns}
            options={listOptions}
          />

          <DeleteManyItemsModal
            showModal={showDeleteModal}
            objectType={"Familia(s)"}
            items={rowsToDelete}
            deleteComfirmedItems={deleteComfirmedItems}
            closeModal={closeModal}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default FamilyListScreen;
