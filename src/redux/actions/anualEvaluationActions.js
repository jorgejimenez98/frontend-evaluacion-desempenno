import {
  ANUAL_EVALUATION_LIST_REQUEST,
  ANUAL_EVALUATION_LIST_SUCCESS,
  ANUAL_EVALUATION_LIST_ERROR,
  ANUAL_EVALUATION_ADD_REQUEST,
  ANUAL_EVALUATION_ADD_SUCCESS,
  ANUAL_EVALUATION_ADD_ERROR,
  ANUAL_EVALUATION_DETAILS_REQUEST,
  ANUAL_EVALUATION_DETAILS_SUCCESS,
  ANUAL_EVALUATION_DETAILS_ERROR,
  ANUAL_EVALUATION_EDIT_REQUEST,
  ANUAL_EVALUATION_EDIT_SUCCESS,
  ANUAL_EVALUATION_EDIT_ERROR,
} from "../constants/anualEvaluationConstants";
import axios from "axios";
import { defaultApi } from "src/publicUrl";

export const getAnualEvaluationList = (value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANUAL_EVALUATION_LIST_REQUEST,
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
      `${defaultApi}/api/evaluations/anual/getAnualEvaluationsByYearAndHotel/`,
      value,
      config
    );

    dispatch({
      type: ANUAL_EVALUATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANUAL_EVALUATION_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addAnualEvaluation = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANUAL_EVALUATION_ADD_REQUEST,
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
      `${defaultApi}/api/evaluations/anual/createEvaluation/`,
      values,
      config
    );

    dispatch({
      type: ANUAL_EVALUATION_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANUAL_EVALUATION_ADD_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editAnualEvaluation = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANUAL_EVALUATION_EDIT_REQUEST,
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
      `${defaultApi}/api/evaluations/anual/editEvaluation/`,
      values,
      config
    );

    dispatch({
      type: ANUAL_EVALUATION_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANUAL_EVALUATION_EDIT_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAnualEvaluationDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANUAL_EVALUATION_DETAILS_REQUEST,
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
      `${defaultApi}/api/evaluations/anual/${id}/`,
      config
    );

    dispatch({
      type: ANUAL_EVALUATION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANUAL_EVALUATION_DETAILS_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
