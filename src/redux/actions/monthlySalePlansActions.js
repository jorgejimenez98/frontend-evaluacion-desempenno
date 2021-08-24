import {
  MONTHLY_SALE_PLAN_LIST_REQUEST,
  MONTHLY_SALE_PLAN_LIST_SUCCESS,
  MONTHLY_SALE_PLAN_LIST_ERROR,
  MONTHLY_SALE_PLAN_DELETE_REQUEST,
  MONTHLY_SALE_PLAN_DELETE_SUCCESS,
  MONTHLY_SALE_PLAN_DELETE_ERROR,
  MONTHLY_SALE_PLAN_CREATE_REQUEST,
  MONTHLY_SALE_PLAN_CREATE_SUCCESS,
  MONTHLY_SALE_PLAN_CREATE_ERROR,
  MONTHLY_SALE_PLAN_DETAILS_REQUEST,
  MONTHLY_SALE_PLAN_DETAILS_SUCCESS,
  MONTHLY_SALE_PLAN_DETAILS_ERROR,
  MONTHLY_SALE_PLAN_EDIT_REQUEST,
  MONTHLY_SALE_PLAN_EDIT_SUCCESS,
  MONTHLY_SALE_PLAN_EDIT_ERROR,
} from "../constants/monthlySalePlanConstants";
import axios from "axios";
import { defaultApi } from "src/publicUrl";

export const getMonthlySalePlansByYear = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MONTHLY_SALE_PLAN_LIST_REQUEST,
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
    const { data } = await axios.get(
      `${defaultApi}/api/salePlans/anual/${id}/`,
      config
    );

    dispatch({
      type: MONTHLY_SALE_PLAN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MONTHLY_SALE_PLAN_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getMonthlySalePlanDetails =
  (id, monthlySalePlanId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MONTHLY_SALE_PLAN_DETAILS_REQUEST,
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
        `${defaultApi}/api/salePlans/anual/${id}/getMonthlySalePlanDetails/`,
        monthlySalePlanId,
        config
      );

      dispatch({
        type: MONTHLY_SALE_PLAN_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MONTHLY_SALE_PLAN_DETAILS_ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteMonthlySalePlans = (items) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MONTHLY_SALE_PLAN_DELETE_REQUEST,
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
      `${defaultApi}/api/salePlans/anual/deleteMonthlySalePlans/`,
      items,
      config
    );

    dispatch({
      type: MONTHLY_SALE_PLAN_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MONTHLY_SALE_PLAN_DELETE_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createMonthlySalePlans =
  (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MONTHLY_SALE_PLAN_CREATE_REQUEST,
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
        `${defaultApi}/api/salePlans/anual/createMonthlySalePlan/`,
        values,
        config
      );

      dispatch({
        type: MONTHLY_SALE_PLAN_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MONTHLY_SALE_PLAN_CREATE_ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const editMonthlySalePlans =
  (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MONTHLY_SALE_PLAN_EDIT_REQUEST,
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
        `${defaultApi}/api/salePlans/anual/editMonthlySalePlan/`,
        values,
        config
      );

      dispatch({
        type: MONTHLY_SALE_PLAN_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MONTHLY_SALE_PLAN_EDIT_ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
