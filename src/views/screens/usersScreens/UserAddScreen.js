import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "src/redux/actions/userActions";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import { Visibility, VisibilityOff } from "@material-ui/icons";
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
  CInputGroup,
  CInputGroupAppend,
  CInvalidFeedback,
  CLabel,
  CRow,
  CSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { LinkContainer } from "react-router-bootstrap";
import { useFormik } from "formik";
import {
  validationSchema,
  initialValues,
} from "./options/userValidationSchema";
import { Message, Loader } from "src/containers/utils";
import { USER_CREATE_RESET } from "src/redux/constants/userConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function UserAddScreen({ history }) {
  const dispatch = useDispatch();

  // States
  const [checkNoRolSelectedError, setCheckNoRolSelectedError] = useState(false);
  const [checkAllRolSelectedError, setCheckAllRolSelectedError] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // User create Selector
  const userCreate = useSelector((state) => state.userCreate);
  const { loading, success, error } = userCreate;

  // Use Effect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isAdmin) {
      history.push("/403");
    }
    if (tokenhasExpired(userInfo)) {
      redirectLogin(history, dispatch);
    }
    if (success) {
      dispatch(
        setSnackbar(true, "success", "Usuario insertado satisfactoriamente")
      );
      dispatch({ type: USER_CREATE_RESET });
      history.push("/users/list");
    }

    return () => {
      dispatch({ type: USER_CREATE_RESET });
    };
  }, [userInfo, history, success, dispatch]);

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
        dispatch(createUser(user));
      }
    },
  });

  // Show SnackBar
  const showSnackBar = (type, message) => {
    dispatch(setSnackbar(true, type, message));
  };

  return (
    <CRow>
      <CCol xs="12">
        {error && <Message variant="danger">{error}</Message>}
        <CCard className="shadow">
          <CCardHeader>
            Formulario para Insertar <strong>Usuarios</strong>
            <CButton
              variant="outline"
              color="light"
              className="text-black-50 float-right"
              onClick={(e) => {
                formik.resetForm();
                dispatch(setSnackbar(true, "info", "Formulario reseteado"));
              }}
            >
              Resetear
            </CButton>
          </CCardHeader>
          <form onSubmit={formik.handleSubmit} className="m-3">
            <CCardBody>
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
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    valid={
                      formik.touched.username &&
                      !Boolean(formik.errors.username)
                    }
                    onChange={formik.handleChange}
                  />
                  <CInvalidFeedback>{formik.errors.username}</CInvalidFeedback>
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

              <h5 className="text-muted mb-3 mt-3">Roles de Usuario</h5>

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

              <CDropdownItem divider className="mt-2 mb-2" />

              <h5 className="text-muted mb-3 mt-3">Confirmar Cuenta</h5>

              {/* CONTRASEÑA */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Contraseña</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInputGroup>
                    <CInput
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Contraseña"
                      value={formik.values.password}
                      invalid={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      valid={
                        formik.touched.password &&
                        !Boolean(formik.errors.password)
                      }
                      onChange={formik.handleChange}
                      autoComplete="new-password"
                    />
                    <CInputGroupAppend
                      onClick={() => setShowPassword(!showPassword)}
                      className="mt-1 ml-2"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </CInputGroupAppend>
                    <CInvalidFeedback className="help-block">
                      {formik.touched.password && formik.errors.password}
                    </CInvalidFeedback>
                  </CInputGroup>
                </CCol>
              </CFormGroup>

              {/* CONFIRMAR CONTRASEÑA */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Confirmar Contraseña</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInputGroup>
                    <CInput
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirmar contraseña"
                      value={formik.values.confirmPassword}
                      invalid={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      valid={
                        formik.touched.confirmPassword &&
                        !Boolean(formik.errors.confirmPassword)
                      }
                      onChange={formik.handleChange}
                      autoComplete="new-password"
                    />
                    <CInputGroupAppend
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="mt-1 ml-2"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </CInputGroupAppend>
                    <CInvalidFeedback className="help-block">
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword}
                    </CInvalidFeedback>
                  </CInputGroup>
                </CCol>
              </CFormGroup>
            </CCardBody>

            {/* FOOTER */}
            <CCardFooter>
              {loading && <Loader />}
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
                  <CIcon name="cil-scrubber" /> Insertar
                </CButton>
              </div>
            </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default UserAddScreen;
