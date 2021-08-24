import React, { useEffect } from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import { addHotel } from "src/redux/actions/hotelActions";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow,
} from "@coreui/react";
import { LinkContainer } from "react-router-bootstrap";
import { Loader, Message } from "src/containers/utils";
import {
  initialValues,
  validationSchema,
} from "./options/hotelValidationSchema";
import { HOTEL_ADD_RESET } from "src/redux/constants/hotelConstants";

function HotelAddScreen({ history }) {
  const dispatch = useDispatch();

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Add Hotel Selector
  const addHotelSelector = useSelector((state) => state.addHotel);
  const { loading, error, success } = addHotelSelector;

  // Use Effect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isAdmin) {
      history.push("/403");
    }
    if (success) {
      dispatch(
        setSnackbar(true, "success", "Hotel insertado satisfactoriamente")
      );
      dispatch({ type: HOTEL_ADD_RESET });
      history.push("/hotels");
    }
  }, [userInfo, history, success, dispatch]);

  // Form with the initials values of the user
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(addHotel(values));
    },
  });

  return (
    <CRow>
      <CCol xs="12">
        {error && <Message variant="danger">{error}</Message>}
        <CCard className="shadow">
          <CCardHeader>
            Formulario para Insertar <strong>Hoteles</strong>
            <CButton
              variant="outline"
              color="light"
              className="text-black-50 float-right"
              onClick={(e) => {
                formik.resetForm();
                dispatch(setSnackbar(true, "info", "Formulario reseteado"));
              }}
            >
              Resetear Formulario
            </CButton>
          </CCardHeader>
          <form onSubmit={formik.handleSubmit} className="m-3">
            <CCardBody>
              <h5 className="text-muted mb-4">
                Características del Hotel y sus Bases de Datos
              </h5>

              {/* NOMBRE DEL HOTEL */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Nombre del Hotel</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nombre del hotel"
                    value={formik.values.name}
                    invalid={formik.touched.name && Boolean(formik.errors.name)}
                    valid={formik.touched.name && !Boolean(formik.errors.name)}
                    onChange={formik.handleChange}
                  />
                  <CInvalidFeedback>{formik.errors.name}</CInvalidFeedback>
                </CCol>
              </CFormGroup>

              {/* NOMBRE DE LA BD DEL POS*/}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Nombre de la BD del POS</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="pos_db_name"
                    name="pos_db_name"
                    type="text"
                    placeholder="Nombre de la BD del POS"
                    value={formik.values.pos_db_name}
                    invalid={
                      formik.touched.pos_db_name &&
                      Boolean(formik.errors.pos_db_name)
                    }
                    valid={
                      formik.touched.pos_db_name &&
                      !Boolean(formik.errors.pos_db_name)
                    }
                    onChange={formik.handleChange}
                  />
                  <CInvalidFeedback>
                    {formik.touched.pos_db_name && formik.errors.pos_db_name}
                  </CInvalidFeedback>
                </CCol>
              </CFormGroup>

              {/* NOMBRE DE LA BD DEL PMS */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Nombre de la BD del PMS</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="pms_db_name"
                    name="pms_db_name"
                    type="text"
                    placeholder="Nombre de la BD del PMS"
                    value={formik.values.pms_db_name}
                    invalid={
                      formik.touched.pms_db_name &&
                      Boolean(formik.errors.pms_db_name)
                    }
                    valid={
                      formik.touched.pms_db_name &&
                      !Boolean(formik.errors.pms_db_name)
                    }
                    onChange={formik.handleChange}
                  />
                  <CInvalidFeedback>
                    {formik.touched.pms_db_name && formik.errors.pms_db_name}
                  </CInvalidFeedback>
                </CCol>
              </CFormGroup>

              {/* Id de la Unidad Organizativa del Zun PR */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Id de la Unidad Organizativa del Zun PR</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="zunPrUnidadOrganizativaId"
                    name="zunPrUnidadOrganizativaId"
                    type={"number"}
                    placeholder={'Escribe aquí'}
                    value={formik.values.zunPrUnidadOrganizativaId}
                    invalid={
                      formik.touched.zunPrUnidadOrganizativaId &&
                      Boolean(formik.errors.zunPrUnidadOrganizativaId)
                    }
                    valid={
                      formik.touched.zunPrUnidadOrganizativaId &&
                      !Boolean(formik.errors.zunPrUnidadOrganizativaId)
                    }
                    onChange={formik.handleChange}
                  />
                  <CInvalidFeedback>
                    {formik.touched.zunPrUnidadOrganizativaId &&
                      formik.errors.zunPrUnidadOrganizativaId}
                  </CInvalidFeedback>
                </CCol>
              </CFormGroup>
            </CCardBody>

            {/* FOOTER */}
            <CCardFooter>
              {loading && <Loader />}
              <div className="float-right">
                <LinkContainer to="/hotels">
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

export default HotelAddScreen;
