import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUser } from "src/redux/actions/userActions";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDropdownItem,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow,
  CSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { LinkContainer } from "react-router-bootstrap";
import { useFormik } from "formik";
import { validationSchema } from "../options/userEditValidationSchema";
import { Message, Loader } from "src/containers/utils";
import { USER_UPDATE_RESET } from "src/redux/constants/userConstants";
import { IconButton, Tooltip } from "@material-ui/core";
import ChangeUserPasswordModal from "../editScreens/resetUserPasswordModal";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

const initialValues = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  isAdmin: false,
  isFoodAndDrinkBoss: false,
};

function UserEditScreen({ history, match }) {
  const dispatch = useDispatch();
  const userId = match.params.id;
  /* STATES */
  const [checkNoRolSelectedError, setCheckNoRolSelectedError] = useState(false);
  const [checkAllRolSelectedError, setCheckAllRolSelectedError] =
    useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // User Update Selector
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: updateError,
  } = userUpdate;
  // User Details Selector
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading: loadingUser, error: userDetailError } = userDetails;

  // Initialize the formik values
  initialValues.username = user?.username;
  initialValues.first_name = user?.first_name;
  initialValues.last_name = user?.last_name;
  initialValues.email = user?.email;
  initialValues.isAdmin = user?.isAdmin;
  initialValues.isFoodAndDrinkBoss = user?.isFoodAndDrinkBoss;

  // Use Effect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isAdmin) {
      history.push("/403");
    } else {
      if (tokenhasExpired(userInfo)) {
        redirectLogin(history, dispatch);
      }
      if (successUpdate) {
        dispatch(
          setSnackbar(true, "success", "Usuario editado satisfactoriamente")
        );
        dispatch({ type: USER_UPDATE_RESET });
        history.push("/users/list");
      }
      if (userId) {
        dispatch(getUserDetails(userId));
      }
    }
    return () => {
      dispatch({ type: USER_UPDATE_RESET });
    };
  }, [userInfo, history, dispatch, userId, successUpdate]);

  // Form with the initials values of the user
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (user) => {
      if (!user.isAdmin && !user.isFoodAndDrinkBoss) {
        showSnackBar("error", "Debes seleccionar al menos un Rol de Usuario");
        setCheckNoRolSelectedError(true);
        window.scrollTo(0, 0);
      } else if (user.isAdmin && user.isFoodAndDrinkBoss) {
        setCheckAllRolSelectedError(true);
        showSnackBar("error", "Solo de debe seleccionar un Rol de Usuario");
        window.scrollTo(0, 0);
      } else {
        setCheckAllRolSelectedError(false);
        setCheckNoRolSelectedError(false);
        dispatch(updateUser(userId, user));
      }
    },
  });

  // Show SnackBar
  const showSnackBar = (type, message) => {
    dispatch(setSnackbar(true, type, message));
  };

  /* Close Modal */
  const closeModal = () => {
    setShowPasswordModal(false);
  };

  /* Show Modal Changing the State */
  const handleShowPasswordModal = () => {
    setShowPasswordModal(true);
  };

  return (
    <CRow>
      <CCol xs="12">
        {/* Show Modal Change User Password */}
        <ChangeUserPasswordModal
          showPasswordModal={showPasswordModal}
          closeModal={closeModal}
          userId={userId}
        />

        {/* Show Error if exists when the admin update the User */}
        {updateError && <Message variant="danger">{updateError}</Message>}

        {/* Show Spinner When The App is Loading the user from the server */}
        {loadingUser ? (
          <Loader />
        ) : /* Show Error message if exist when the admin loads the user */
        userDetailError ? (
          <Message variant="danger">{userDetailError}</Message>
        ) : (
          <CCard className="shadow">
            {/* Card Header Title */}
            <CCardHeader>
              Formulario para Editar <strong>Usuarios</strong>
              {/* Change Pasword Button */}
              <Tooltip
                title="Cambiar Contraseña"
                className="float-right"
                onClick={handleShowPasswordModal}
              >
                <IconButton>
                  <CIcon name="cil-settings" />
                </IconButton>
              </Tooltip>
              {/* Button To reset the Form */}
              <CButton
                variant="outline"
                color="light"
                className="text-black-50 float-right mr-3"
                onClick={(e) => {
                  formik.resetForm();
                  dispatch(setSnackbar(true, "info", "Formulario reseteado"));
                }}
              >
                Resetear Formulario
              </CButton>
            </CCardHeader>
            {/* Initialize The Formik Form */}
            <form onSubmit={formik.handleSubmit} className="m-3">
              <CCardBody>
                {/* Form Title */}
                <h5 className="text-muted mb-4">Características del Usuario</h5>

                {/* NOMBRE DE USUARIO */}
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Nombre de Usuario</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Nombre de usuario"
                      value={formik.values.username}
                      invalid={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      valid={
                        formik.touched.username &&
                        !Boolean(formik.errors.username)
                      }
                      onChange={formik.handleChange}
                    />
                    <CInvalidFeedback>
                      {formik.errors.username}
                    </CInvalidFeedback>
                  </CCol>
                </CFormGroup>

                {/* PRIMER NOMBRE */}
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Primer nombre</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="Primer nombre"
                      value={formik.values.first_name}
                      invalid={
                        formik.touched.first_name &&
                        Boolean(formik.errors.first_name)
                      }
                      valid={
                        formik.touched.first_name &&
                        !Boolean(formik.errors.first_name)
                      }
                      onChange={formik.handleChange}
                    />
                    <CInvalidFeedback>
                      {formik.touched.first_name && formik.errors.first_name}
                    </CInvalidFeedback>
                  </CCol>
                </CFormGroup>

                {/* APELLIDOS */}
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Apellidos</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="last_name"
                      name="last_name"
                      type="text"
                      placeholder="Apellidos"
                      value={formik.values.last_name}
                      invalid={
                        formik.touched.last_name &&
                        Boolean(formik.errors.last_name)
                      }
                      valid={
                        formik.touched.last_name &&
                        !Boolean(formik.errors.last_name)
                      }
                      onChange={formik.handleChange}
                    />
                    <CInvalidFeedback>
                      {formik.touched.last_name && formik.errors.last_name}
                    </CInvalidFeedback>
                  </CCol>
                </CFormGroup>

                {/* CORREO */}
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Correo Electrónico</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Correo"
                      autoComplete="email"
                      value={formik.values.email}
                      invalid={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      valid={
                        formik.touched.email && !Boolean(formik.errors.email)
                      }
                      onChange={formik.handleChange}
                    />
                    <CInvalidFeedback>
                      {formik.touched.email && formik.errors.email}
                    </CInvalidFeedback>
                  </CCol>
                </CFormGroup>

                <CDropdownItem divider className="mt-2 mb-2" />

                {/* User Rols */}
                <h5 className="text-muted mb-3 mt-3">Roles de Usuario</h5>

                {/* Check Box Validators */}
                {checkNoRolSelectedError && (
                  <Message variant="danger">
                    Lo sentimos. Debes seleccionar al menos un rol de Usuario
                  </Message>
                )}

                {checkAllRolSelectedError && (
                  <Message variant="danger">
                    Lo sentimos. Solo se debe seleccionar un Rol de Usuario
                  </Message>
                )}

                {/* Es Administrador? */}
                <CFormGroup row>
                  <CCol tag="label" sm="6" className="col-form-label">
                    ¿Es Administrador?
                  </CCol>
                  <CCol xs="12" md="6">
                    <CSwitch
                      id="isAdmin"
                      name="isAdmin"
                      checked={formik.values.isAdmin}
                      onChange={formik.handleChange}
                      className={"mx-1"}
                      variant={"3d"}
                      color={"primary"}
                      labelOn={"\u2713"}
                      labelOff={"\u2715"}
                    />
                  </CCol>
                </CFormGroup>

                {/* FOOD AND DRINK BOSSS */}
                <CFormGroup row>
                  <CCol tag="label" sm="6" className="col-form-label">
                    ¿Es Jefe de Alimentos y Bebidas del complejo?
                  </CCol>
                  <CCol xs="12" md="6">
                    <CSwitch
                      id="isFoodAndDrinkBoss"
                      name="isFoodAndDrinkBoss"
                      checked={formik.values.isFoodAndDrinkBoss}
                      onChange={formik.handleChange}
                      className={"mx-1"}
                      variant={"3d"}
                      color={"primary"}
                      labelOn={"\u2713"}
                      labelOff={"\u2715"}
                    />
                  </CCol>
                </CFormGroup>

                {/* DIVIDER INTERFACE */}
                <CDropdownItem divider className="mt-2 mb-2" />
              </CCardBody>
              <CCardFooter>
                {/* SHOW SPINNER WHEN THE UPDATE BUTTON IS CLICKED */}
                {loadingUpdate && <Loader />}
                {/* SUBMIT BUTTONS */}
                <div className="float-right">
                  <LinkContainer to="/users/list">
                    <CButton
                      variant="outline"
                      color="light"
                      className="text-black-50 mr-2"
                    >
                      <CIcon name="cil-x" /> Cancelar
                    </CButton>
                  </LinkContainer>
                  <CButton color="success" type="submit">
                    <CIcon name="cil-scrubber" /> Actualizar
                  </CButton>
                </div>
              </CCardFooter>
            </form>
          </CCard>
        )}
      </CCol>
    </CRow>
  );
}

export default UserEditScreen;
