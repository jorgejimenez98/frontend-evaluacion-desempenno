import {
  WORKER_MONTHLY_EVALUATION_LIST_REQUEST,
  WORKER_MONTHLY_EVALUATION_LIST_SUCCESS,
  WORKER_MONTHLY_EVALUATION_LIST_ERROR,
  WORKER_MONTHLY_EVALUATION_ADD_REQUEST,
  WORKER_MONTHLY_EVALUATION_ADD_SUCCESS,
  WORKER_MONTHLY_EVALUATION_ADD_ERROR,
  WORKER_MONTHLY_EVALUATION_DETAILS_REQUEST,
  WORKER_MONTHLY_EVALUATION_DETAILS_SUCCESS,
  WORKER_MONTHLY_EVALUATION_DETAILS_ERROR,
  WORKER_MONTHLY_EVALUATION_EDIT_REQUEST,
  WORKER_MONTHLY_EVALUATION_EDIT_SUCCESS,
  WORKER_MONTHLY_EVALUATION_EDIT_ERROR,
  MONTHLY_MELIA_EVALUATION_ADD_REQUEST,
  MONTHLY_MELIA_EVALUATION_ADD_SUCCESS,
  MONTHLY_MELIA_EVALUATION_ADD_ERROR,
  MONTHLY_MELIA_EVALUATION_DETAILS_REQUEST,
  MONTHLY_MELIA_EVALUATION_DETAILS_SUCCESS,
  MONTHLY_MELIA_EVALUATION_DETAILS_ERROR,
  MONTHLY_MELIA_EVALUATION_EDIT_REQUEST,
  MONTHLY_MELIA_EVALUATION_EDIT_SUCCESS,
  MONTHLY_MELIA_EVALUATION_EDIT_ERROR,
  MONTHLY_MELIA_EVALUATION_RESUME_REQUEST,
  MONTHLY_MELIA_EVALUATION_RESUME_SUCCESS,
  MONTHLY_MELIA_EVALUATION_RESUME_ERROR,
} from "../constants/monthlyEvaluationConstants";

import axios from "axios";
import { defaultApi } from "src/publicUrl";

export const getMonthlyEvaluations = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKER_MONTHLY_EVALUATION_LIST_REQUEST,
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
      `${defaultApi}/api/evaluations/monthly/melia/getWorkersMonthlyEvaluationByHotelAndPayTime/`,
      values,
      config
    );

    dispatch({
      type: WORKER_MONTHLY_EVALUATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKER_MONTHLY_EVALUATION_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addMonthlyGastronomyEvaluation =
  (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: WORKER_MONTHLY_EVALUATION_ADD_REQUEST,
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
        `${defaultApi}/api/evaluations/monthly/gastronomy/createMonthlyGastronomyEvaluation/`,
        values,
        config
      );

      dispatch({
        type: WORKER_MONTHLY_EVALUATION_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: WORKER_MONTHLY_EVALUATION_ADD_ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getMonthlyGastronomyEvaluationDetails =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: WORKER_MONTHLY_EVALUATION_DETAILS_REQUEST,
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
        `${defaultApi}/api/evaluations/monthly/gastronomy/${id}/`,
        config
      );

      dispatch({
        type: WORKER_MONTHLY_EVALUATION_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: WORKER_MONTHLY_EVALUATION_DETAILS_ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const editMonthlyGastronomyEvaluation =
  (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: WORKER_MONTHLY_EVALUATION_EDIT_REQUEST,
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

      const { data } = await axios.put(
        `${defaultApi}/api/evaluations/monthly/gastronomy/editMonthlyGastronomyEvaluation/`,
        values,
        config
      );

      dispatch({
        type: WORKER_MONTHLY_EVALUATION_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: WORKER_MONTHLY_EVALUATION_EDIT_ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const addMonthlyMeliaEvaluation =
  (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MONTHLY_MELIA_EVALUATION_ADD_REQUEST,
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
        `${defaultApi}/api/evaluations/monthly/melia/createEvaluation/`,
        values,
        config
      );

      dispatch({
        type: MONTHLY_MELIA_EVALUATION_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MONTHLY_MELIA_EVALUATION_ADD_ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getMonthlyMeliaEvaluationDetails =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MONTHLY_MELIA_EVALUATION_DETAILS_REQUEST,
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
        `${defaultApi}/api/evaluations/monthly/melia/${id}/`,
        config
      );

      dispatch({
        type: MONTHLY_MELIA_EVALUATION_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MONTHLY_MELIA_EVALUATION_DETAILS_ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const editMonthlyMeliaEvaluation =
  (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MONTHLY_MELIA_EVALUATION_EDIT_REQUEST,
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

      const { data } = await axios.put(
        `${defaultApi}/api/evaluations/monthly/melia/editEvaluation/`,
        values,
        config
      );

      dispatch({
        type: MONTHLY_MELIA_EVALUATION_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MONTHLY_MELIA_EVALUATION_EDIT_ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getMonthlyMeliaEvaluationResume =
  (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MONTHLY_MELIA_EVALUATION_RESUME_REQUEST,
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
        `${defaultApi}/api/evaluations/monthly/melia/resume/`,
        values,
        config
      );

      dispatch({
        type: MONTHLY_MELIA_EVALUATION_RESUME_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MONTHLY_MELIA_EVALUATION_RESUME_ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
