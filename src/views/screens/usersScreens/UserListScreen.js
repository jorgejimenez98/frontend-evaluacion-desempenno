import React, { useState, useEffect } from "react";
import {
  getUserList,
  deleteUsers,
  logout,
} from "src/redux/actions/userActions";
import {
  FormControlLabel,
  Switch,
  createMuiTheme,
  MuiThemeProvider,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import {
  AddButtomListHeader,
  Loader,
  Message,
  listOptions,
  MUIDataTable,
  DeleteManyItemsModal,
} from "src/containers/utils/index";
import { USER_DELETE_RESET } from "src/redux/constants/userConstants";
import WarningAdminDeletionModal from "./options/warnigAdminDeletionModal";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import { useSelector, useDispatch } from "react-redux";
import { columns } from "./options/columns";
import { FaTrash } from "react-icons/fa";

function UserListScreen({ history }) {
  const dispatch = useDispatch();
  // States
  const [dense, setDense] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);
  const [showWarningError, setShowWarningError] = useState(false);

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // User List Selector
  const { users, loading, error } = useSelector((state) => state.userList);
  // User Delete Selector
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, error: errorDelete } = userDelete;

  // Use Effect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isAdmin) {
      history.push("/403");
    } else {
      dispatch(getUserList());
    }
    if (successDelete) {
      dispatch(
        setSnackbar(
          true,
          "success",
          "Usuario(s) eliminado(s) satisfactoriamente"
        )
      );
      dispatch({ type: USER_DELETE_RESET });
    }
  }, [dispatch, userInfo, history, successDelete]);

  // Start Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "multiple";
  listOptions.download = true;
  listOptions.print = false;
  listOptions.viewColumns = true;
  listOptions.filter = true;

  // Theme for the MUI-datatable
  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiTableCell: {
          root: {
            padding: dense ? "-2px" : "7px",
          },
        },
      },
    });

  // Add method on Rows delete to the table
  listOptions.customToolbarSelect = ({ data }) => {
    return (
      <React.Fragment>
        <Tooltip title="Eliminar Usuarios Seleccionados" className="mr-2">
          <IconButton
            onClick={() => {
              let items = [];
              data.forEach((element) => {
                items.push(users[element.dataIndex]);
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
    const administratorCount = getAdministratorsCount(users);
    const administratorsToDelete = getAdministratorsCount(items);

    if (administratorCount === administratorsToDelete) {
      showShackBar(
        "error",
        "Lo sentimos, no puede dejar el sistema sin administradores"
      );
      setShowWarningError(false);
    } else if (
      items.find((user) => user.username === userInfo.username) &&
      administratorCount !== administratorsToDelete
    ) {
      setShowWarningError(true);
    } else {
      setShowWarningError(false);
      dispatch(deleteUsers(items));
    }
  };

  // Get Count Of Administrators on table
  const getAdministratorsCount = (array) => {
    let count = 0;
    array?.forEach((user) => {
      if (user.rol === "Administrador") {
        count += 1;
      }
    });
    return count;
  };

  // Add Buttom to insert users to the table
  listOptions.customToolbar = () => {
    return (
      <AddButtomListHeader addLink="/users/list/add" title="Insertar Usuario" />
    );
  };

  // Option to the csv download
  listOptions.downloadOptions = {
    filename: `Usuarios ED`,
    filterOptions: {
      useDisplayedColumnsOnly: true,
      useDisplayedRowsOnly: true,
    },
  };

  // Close Warning Modal
  const closeWarningModal = () => {
    setShowWarningError(false);
  };

  // Show Snackbar
  const showShackBar = (type, message) => {
    dispatch(setSnackbar(true, type, message));
  };

  // Confirm Delete After User Login Warning
  const confirmDelete = (items) => {
    dispatch({ type: USER_DELETE_RESET });
    dispatch(deleteUsers(items));
    dispatch(logout());
  };

  return (
    <React.Fragment>
      {/* Error a la hora de eliminar un item del listado */}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {/* En caso de q el admin se valla a autoeliminar mostrar mensaje de advertencia */}
      <WarningAdminDeletionModal
        closeModal={closeWarningModal}
        showModal={showWarningError}
        items={rowsToDelete}
        confirmDelete={confirmDelete}
      />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={`Listado de Usuarios (${users?.length})`}
              data={users}
              columns={columns}
              options={listOptions}
            />
          </MuiThemeProvider>

          <FormControlLabel
            className="mt-3"
            control={
              <Switch
                checked={dense}
                onChange={(event) => setDense(event.target.checked)}
              />
            }
            label="Disminuir tamaño de la tabla"
          />

          <DeleteManyItemsModal
            showModal={showModal}
            objectType={"Usuario(s)"}
            items={rowsToDelete}
            deleteComfirmedItems={deleteComfirmedItems}
            closeModal={closeModal}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default UserListScreen;
