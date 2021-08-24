import {
  ANUAL_SALE_PLAN_LIST_REQUEST,
  ANUAL_SALE_PLAN_LIST_SUCCESS,
  ANUAL_SALE_PLAN_LIST_ERROR,
  ANUAL_SALE_PLAN_DETAILS_REQUEST,
  ANUAL_SALE_PLAN_DETAILS_SUCCESS,
  ANUAL_SALE_PLAN_DETAILS_ERROR,
  ANUAL_SALE_PLAN_EDIT_REQUEST,
  ANUAL_SALE_PLAN_EDIT_SUCCESS,
  ANUAL_SALE_PLAN_EDIT_ERROR,
  ANUAL_SALE_PLAN_CREATE_REQUEST,
  ANUAL_SALE_PLAN_CREATE_SUCCESS,
  ANUAL_SALE_PLAN_CREATE_ERROR,
  ANUAL_SALE_PLAN_DELETE_REQUEST,
  ANUAL_SALE_PLAN_DELETE_SUCCESS,
  ANUAL_SALE_PLAN_DELETE_ERROR,
  ANUAL_SALE_PLAN_REPORT_REQUEST,
  ANUAL_SALE_PLAN_REPORT_SUCCESS,
  ANUAL_SALE_PLAN_REPORT_ERROR,
} from "../constants/anuaSalePlanConstants";
import { defaultApi } from "src/publicUrl";
import axios from "axios";

export const getAnualSalePlansList = (value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANUAL_SALE_PLAN_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${defaultApi}/api/salePlans/anual/getHotelAnualSalePlans/`,
      value,
      config
    );

    dispatch({
      type: ANUAL_SALE_PLAN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANUAL_SALE_PLAN_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAnualPlanDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANUAL_SALE_PLAN_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${defaultApi}/api/salePlans/anual/${id}/getMiniDetails/`,
      {},
      config
    );

    dispatch({
      type: ANUAL_SALE_PLAN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANUAL_SALE_PLAN_DETAILS_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editAnualPlan = (id, values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANUAL_SALE_PLAN_EDIT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${defaultApi}/api/salePlans/anual/${id}/editAnualSalePlan/`,
      values,
      config
    );

    dispatch({
      type: ANUAL_SALE_PLAN_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANUAL_SALE_PLAN_EDIT_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createAnualPlan = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANUAL_SALE_PLAN_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${defaultApi}/api/salePlans/anual/`,
      values,
      config
    );

    dispatch({
      type: ANUAL_SALE_PLAN_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANUAL_SALE_PLAN_CREATE_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const deleteAnualPlans = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANUAL_SALE_PLAN_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${defaultApi}/api/salePlans/anual/deleteAnualPlans/`,
      values,
      config
    );

    dispatch({
      type: ANUAL_SALE_PLAN_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANUAL_SALE_PLAN_DELETE_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const getAnualSalePlanReport = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANUAL_SALE_PLAN_REPORT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${defaultApi}/api/salePlans/anual/getYearSalesReport/`,
      id,
      config
    );

    dispatch({
      type: ANUAL_SALE_PLAN_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANUAL_SALE_PLAN_REPORT_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
