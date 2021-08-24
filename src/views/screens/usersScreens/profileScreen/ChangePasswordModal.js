import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserPassword } from "src/redux/actions/userActions";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  CButton,
  CCol,
  CDropdownItem,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInvalidFeedback,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import {
  validationSchema,
  initialValues,
} from "./userChangePasswordValidation";
import { useFormik } from "formik";
import { Loader, Message } from "src/containers/utils";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import { USER_UPDATE_PASSWORD_RESET } from "src/redux/constants/userConstants";

function ChangePasswordModal({ showPasswordModal, closeModal }) {
  const dispatch = useDispatch();

  // States
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // User Update Password Selector
  const updateUserPasswordSelector = useSelector(
    (state) => state.userUpdatePassword
  );
  const { loading, error, success } = updateUserPasswordSelector;

  useEffect(() => {
    if (success) {
      dispatch(
        setSnackbar(
          true,
          "success",
          "Contraseña actualizada satisdactoriamente"
        )
      );
      dispatch({ type: USER_UPDATE_PASSWORD_RESET });
      closeModal();
    }
  }, [success, dispatch, closeModal]);

  // Form with the initials values of the user
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(updateUserPassword(values));
    },
  });

  const callCloseModal = () => {
    formik.resetForm();
    closeModal();
  };

  return (
    <CModal
      show={showPasswordModal}
      onClose={() => callCloseModal()}
      size="lg"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Cambiar Contraseña</CModalTitle>
      </CModalHeader>
      <form onSubmit={formik.handleSubmit} className="m-3">
        <CModalBody>
          {error && <Message variant="danger">{error}</Message>}
          {/* CONTRASEÑA VIEJA */}
          <CFormGroup row>
            <CCol md="3">
              <CLabel>Contraseña actual</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInputGroup>
                <CInput
                  id="oldPassword"
                  name="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={formik.values.oldPassword}
                  invalid={
                    formik.touched.oldPassword &&
                    Boolean(formik.errors.oldPassword)
                  }
                  valid={
                    formik.touched.oldPassword &&
                    !Boolean(formik.errors.oldPassword)
                  }
                  onChange={formik.handleChange}
                  autoComplete="new-password"
                />
                <CInputGroupAppend
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="mt-1 ml-2"
                >
                  {showOldPassword ? <Visibility /> : <VisibilityOff />}
                </CInputGroupAppend>
                <CInvalidFeedback className="help-block">
                  {formik.touched.oldPassword && formik.errors.oldPassword}
                </CInvalidFeedback>
              </CInputGroup>
            </CCol>
          </CFormGroup>

          <CDropdownItem divider className="mt-2 mb-4" />

          {/* CONTRASEÑA NUEVA*/}
          <CFormGroup row>
            <CCol md="3">
              <CLabel>Nueva contraseña</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInputGroup>
                <CInput
                  id="newPassword"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={formik.values.newPassword}
                  invalid={
                    formik.touched.newPassword &&
                    Boolean(formik.errors.newPassword)
                  }
                  valid={
                    formik.touched.newPassword &&
                    !Boolean(formik.errors.newPassword)
                  }
                  onChange={formik.handleChange}
                  autoComplete="new-password"
                />
                <CInputGroupAppend
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="mt-1 ml-2"
                >
                  {showNewPassword ? <Visibility /> : <VisibilityOff />}
                </CInputGroupAppend>
                <CInvalidFeedback className="help-block">
                  {formik.touched.newPassword && formik.errors.newPassword}
                </CInvalidFeedback>
              </CInputGroup>
            </CCol>
          </CFormGroup>

          {/* CONFIRMAR CONTRASEÑA */}
          <CFormGroup row>
            <CCol md="3">
              <CLabel>Confirmar nueva contraseña</CLabel>
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
        </CModalBody>
        <CModalFooter>
          {loading && <Loader />}
          <CButton color="primary" type="submit">
            Actualizar Contraseña
          </CButton>{" "}
          <CButton color="secondary" onClick={() => callCloseModal()}>
            Cancelar
          </CButton>
        </CModalFooter>
      </form>
    </CModal>
  );
}

export default ChangePasswordModal;
