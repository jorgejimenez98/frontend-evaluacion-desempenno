import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loader, Message } from "src/containers/utils/index";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import GoBackButtonListHeader from "src/containers/utils/GoBackButtonListHeader";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import {
  CFormGroup,
  CLabel,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CBadge,
  CRow,
} from "@coreui/react";
import {
  getWorkerDetails,
  getOperatorList,
  setOperatorToWorker,
  deleteOperatorToWorker,
} from "src/redux/actions/workerActions";
import {
  OPERATOR_DELETE_RESET,
  SET_OPERATOR_RESET,
} from "src/redux/constants/workerConstants";
import { FaTrash } from "react-icons/all";
import DeleteOperatorModal from "./DeleteOperatorModal";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

const initialState = {
  descripcion: "",
  id_oper: -1,
  nombre: "",
};

function WorkerEditOperator({ match, history }) {
  const workerId = match.params.workerId;
  const hotelId = match.params.hotelId;
  const dispatch = useDispatch();

  const [operator, setOperator] = useState(initialState);
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);
  // Worker Details Selector
  const { loading, error, worker } = useSelector(
    (state) => state.workerDetails
  );
  // Operator List Selector
  const {
    loading: loadingOperators,
    error: errorOperator,
    operators,
  } = useSelector((state) => state.operatorList);
  // SET OPERATOR SELECTOR
  const {
    loading: loadingSetOperator,
    error: errorSetOperator,
    success: successSetOperator,
  } = useSelector((state) => state.setOperator);
  // Delete Operator Selector
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.deleteOperator);

  initialState.descripcion = worker?.operador
    ? worker?.operador?.descripcion
    : "";
  initialState.id_oper = worker?.operador ? worker?.operador?.id_oper : -1;
  initialState.nombre = worker?.operador ? worker?.operador?.nombre : "";

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (tokenhasExpired(userInfo)) {
        redirectLogin(history, dispatch);
      }
      if (successSetOperator) {
        const message = "Operador Cargado Satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: SET_OPERATOR_RESET });
        history.push(`/workers/${hotelId}`);
      }
      if (successDelete) {
        const message = "Operador Eliminado Satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: OPERATOR_DELETE_RESET });
        history.push(`/workers/${hotelId}`);
      }
      if (workerId) {
        dispatch(getWorkerDetails(workerId));
        dispatch(getOperatorList());
      }
    }
    return () => {
      dispatch({ type: SET_OPERATOR_RESET });
    };
  }, [
    dispatch,
    workerId,
    history,
    userInfo,
    successSetOperator,
    hotelId,
    successDelete,
  ]);

  const handleDelete = () => {
    dispatch(
      deleteOperatorToWorker({
        workerId,
        operatorId: worker?.operador?.id_oper,
      })
    );
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          {loadingSetOperator && <Loader />}
          {loadingDelete && <Loader />}
          {errorOperator && <Message variant="danger">{errorOperator}</Message>}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {errorSetOperator && (
            <Message variant="danger">{errorSetOperator}</Message>
          )}
          {showError && (
            <Message variant="danger">
              Debe Seleccionar un <strong>Operador de Usuario</strong>
            </Message>
          )}

          <DeleteOperatorModal
            showModal={showModal}
            closeModal={closeModal}
            deleteComfirmedItem={handleDelete}
            operatorName={worker?.operador?.descripcion}
            workerName={worker?.nombreCompleto}
          />

          <CCard className="shadow">
            <CCardHeader>
              <CRow>
                <CCol xs="12" sm="8" md="8">
                  <h5>
                    <Person /> Selección de Operador
                  </h5>
                </CCol>
                <CCol xs="12" sm="4" md="4">
                  <div className="card-header-actions">
                    <GoBackButtonListHeader
                      title={`Volver al Listado`}
                      link={`/workers/${worker?.hotel}`}
                    />

                    {worker && worker?.operador && (
                      <Tooltip
                        title={`Eliminar Operador al Trabajador ${worker?.nombreCompleto}`}
                      >
                        <IconButton onClick={() => setShowModal(true)}>
                          <FaTrash />
                        </IconButton>
                      </Tooltip>
                    )}
                  </div>
                </CCol>
              </CRow>
            </CCardHeader>

            <CCardBody>
              {/* Cargo */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Nombre del Trabajador</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <h5>{worker?.nombreCompleto}</h5>
                </CCol>
              </CFormGroup>

              {/* Cargo */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Cargo del Trabajador</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CBadge>
                    <h5>
                      <CBadge color={"success"}>{worker?.cargo}</CBadge>
                    </h5>
                  </CBadge>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Operador de Usuario</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  {loadingOperators ? (
                    <Loader />
                  ) : (
                    operators && (
                      <Autocomplete
                        options={operators}
                        getOptionLabel={(option) => option.descripcion}
                        noOptionsText={"No hay resultados"}
                        value={operator}
                        onChange={(event, newValue) => {
                          if (newValue === null) {
                            setOperator({
                              descripcion: "",
                              id_oper: -1,
                              nombre: "",
                            });
                          } else {
                            setOperator(newValue);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Seleccione aquí" />
                        )}
                      />
                    )
                  )}
                </CCol>
              </CFormGroup>
            </CCardBody>
            <CCardFooter className="text-center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (
                    operator.descripcion === "" &&
                    operator.id_oper === -1 &&
                    operator.nombre === ""
                  ) {
                    setShowError(true);
                  } else {
                    setShowError(false);
                    dispatch(setOperatorToWorker({ workerId, operator }));
                  }
                }}
              >
                Completar Selección
              </Button>
            </CCardFooter>
          </CCard>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default WorkerEditOperator;
