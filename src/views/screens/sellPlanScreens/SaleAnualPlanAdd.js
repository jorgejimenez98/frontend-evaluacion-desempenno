import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Message, Loader } from "src/containers/utils/index";
import { getHotelDetails } from "src/redux/actions/hotelActions";
import { getActiveCoin } from "src/redux/actions/coinActions";
import { createAnualPlan } from "src/redux/actions/anualSalePlansActions";
import { setSnackbar } from "src/redux/reducers/snackbarReducer";
import { useFormik } from "formik";
import * as yup from "yup";
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
import { ANUAL_SALE_PLAN_CREATE_RESET } from "src/redux/constants/anuaSalePlanConstants";
import { HOTEL_DETAILS_RESET } from "src/redux/constants/hotelConstants";
import { GET_COIN_RESET } from "src/redux/constants/coinConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "src/containers/utils/userloginsettings.js";

function SaleAnualPlanAdd({ match, history }) {
  const hotelId = match.params.hotelId;
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(true);

  // User Login Selector
  const { userInfo } = useSelector((state) => state.userLogin);
  // Hotel Details Selector
  const { error: errorHotel, hotel } = useSelector(
    (state) => state.hotelDetails
  );
  // Active Coin Selector
  const { error: errorCoin, coin } = useSelector((state) => state.activeCoin);
  // Create Anual Plan Selector
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = useSelector((state) => state.anualSalePlanCreate);

  const initialValues = {
    year: new Date().getFullYear(),
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isFoodAndDrinkBoss) {
      history.push("/403");
    } else {
      if (tokenhasExpired(userInfo)) {
        redirectLogin(history, dispatch);
      }
      if (successCreate) {
        const message = "Plan de Venta Anual creado satisfactoriamente";
        dispatch(setSnackbar(true, "success", message));
        dispatch({ type: ANUAL_SALE_PLAN_CREATE_RESET });
        history.push(`/sellPlans/${hotelId}`);
        setShowModal(false);
      }
      if (hotelId) {
        dispatch(getHotelDetails(hotelId, true));
      }
      dispatch(getActiveCoin());
    }
    return () => {
      dispatch({ type: HOTEL_DETAILS_RESET });
      dispatch({ type: GET_COIN_RESET });
    };
  }, [dispatch, userInfo, history, hotelId, successCreate]);

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
      dispatch(createAnualPlan({ year, hotel, coin }));
    },
  });

  const closeModal = () => {
    dispatch({ type: ANUAL_SALE_PLAN_CREATE_RESET });
    history.push(`/sellPlans/${hotelId}`);
    setShowModal(false);
  };

  return (
    <CModal show={showModal} onClose={() => closeModal()} centered color="info">
      <CModalHeader closeButton>
        <CModalTitle>Insertar Plan de venta Anual</CModalTitle>
      </CModalHeader>
      <form onSubmit={formik.handleSubmit} className="m-3">
        <CModalBody>
          {errorHotel && <Message variant="danger">{errorHotel}</Message>}
          {errorCoin && <Message variant="danger">{errorCoin}</Message>}
          {errorCreate && <Message variant="danger">{errorCreate}</Message>}

          <CFormGroup row>
            <CCol md="5">
              <CLabel>Nombre del Hotel</CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CBadge color={"success"}>
                <h5>{hotel ? hotel.name : "No disponible"}</h5>
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
                  invalid={formik.touched.year && Boolean(formik.errors.year)}
                  valid={formik.touched.year && !Boolean(formik.errors.year)}
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
              <h5>{coin ? coin.name : "No disponible"}</h5>
            </CCol>
          </CFormGroup>
        </CModalBody>

        <CModalFooter>
          {loadingCreate && <Loader />}
          <CButton color="primary" type="submit" disabled={!coin || !hotel}>
            Ingresar
          </CButton>{" "}
          <CButton color="secondary" onClick={() => closeModal()}>
            Cancelar
          </CButton>
        </CModalFooter>
      </form>
    </CModal>
  );
}

export default SaleAnualPlanAdd;
