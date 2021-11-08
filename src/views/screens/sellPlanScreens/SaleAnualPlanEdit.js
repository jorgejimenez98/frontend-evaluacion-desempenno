import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loader, Message } from "src/containers/utils/index";
import { useFormik } from "formik";
import * as yup from "yup";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import {
  CFormGroup,
  CLabel,
  CCol,
  CBadge,
  CInput,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CInputGroup,
  CInvalidFeedback,
} from "@coreui/react";
import {
  getAnualPlanDetails,
  editAnualPlan,
} from "src/redux/actions/anualSalePlansActions";
import { ANUAL_SALE_PLAN_EDIT_RESET } from "src/redux/constants/anuaSalePlanConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

const initialValues = {
  year: -1,
};

function SaleAnualPlanEdit({ match, history }) {
  const hotelId = match.params.hotelId;
  const salePlanId = match.params.id;
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(true);

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);
  // Sale Plan Details Selector
  const { loading, error, anualSalePlan } = useSelector(
    (state) => state.anualSalePlanDetails
  );
  // Edit Sale Plan Edit Selector
  const {
    loading: loadingEdit,
    success: successEdit,
    error: errorEdit,
  } = useSelector((state) => state.anualSalePlanEdit);

  initialValues.year = anualSalePlan?.year;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (tokenhasExpired(userInfo)) {
        redirectLogin(history, dispatch);
      }
      if (successEdit) {
        const message = "Plan de Venta Anual Editado Satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: ANUAL_SALE_PLAN_EDIT_RESET });
        history.push(`/sellPlans/${hotelId}`);
        setShowModal(false);
      }
      if (salePlanId) {
        dispatch(getAnualPlanDetails(salePlanId));
      }
    }
    return () => {
      dispatch({ type: ANUAL_SALE_PLAN_EDIT_RESET });
    };
  }, [dispatch, userInfo, history, salePlanId, successEdit, hotelId]);

  const validationSchema = yup.object({
    year: yup
      .number()
      .required("El año es obligatorio")
      .test(
        "Es positivo?",
        "El valor del año no puede ser negativo!",
        (value) => value > 0
      )
      .test(
        "len",
        "El valor del año debe tener 4 dígitos",
        (val) => val?.toString()?.length === 4
      ),
  });

  // Form with the initials values of the user
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      const year = values.year;
      const hotel = anualSalePlan?.hotel?.name;
      const coin = anualSalePlan?.currency;
      dispatch(editAnualPlan(salePlanId, { year, hotel, coin }));
    },
  });

  const closeModal = () => {
    dispatch({ type: ANUAL_SALE_PLAN_EDIT_RESET });
    history.push(`/sellPlans/${hotelId}`);
    setShowModal(false);
  };

  return (
    <CModal show={showModal} onClose={() => closeModal()} centered color="info">
      <CModalHeader closeButton>
        <CModalTitle>
          Editar Plan de venta Anual del{" "}
          <strong>{anualSalePlan?.hotel?.name}</strong>
        </CModalTitle>
      </CModalHeader>
      <form onSubmit={formik.handleSubmit} className="m-3">
        <CModalBody>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div>
              {errorEdit && <Message variant="danger">{errorEdit}</Message>}
              <CFormGroup row>
                <CCol md="5">
                  <CLabel>Nombre del Hotel</CLabel>
                </CCol>
                <CCol xs="12" md="7">
                  <CBadge color={"success"}>
                    <h5>{anualSalePlan?.hotel?.name}</h5>
                  </CBadge>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="5">
                  <CLabel>Año del Plan de Venta</CLabel>
                </CCol>
                <CCol xs="12" md="7">
                  <CInputGroup>
                    <CInput
                      id="year"
                      name="year"
                      type={"number"}
                      placeholder={"Escribe el año aquí"}
                      value={formik.values.year}
                      invalid={
                        formik.touched.year && Boolean(formik.errors.year)
                      }
                      valid={
                        formik.touched.year && !Boolean(formik.errors.year)
                      }
                      onChange={formik.handleChange}
                    />
                    <CInvalidFeedback className="help-block">
                      {formik.touched.year && formik.errors.year}
                    </CInvalidFeedback>
                  </CInputGroup>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="5">
                  <CLabel>Moneda</CLabel>
                </CCol>
                <CCol xs="12" md="7">
                  <h5>{anualSalePlan?.currency}</h5>
                </CCol>
              </CFormGroup>
            </div>
          )}
        </CModalBody>

        <CModalFooter>
          {loadingEdit && <Loader />}
          <CButton color="primary" type="submit">
            Editar
          </CButton>{" "}
          <CButton color="secondary" onClick={() => closeModal()}>
            Cancelar
          </CButton>
        </CModalFooter>
      </form>
    </CModal>
  );
}

export default SaleAnualPlanEdit;
