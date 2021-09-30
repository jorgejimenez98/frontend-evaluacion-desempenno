import {
  NUMBERS,
  RANGE_EVALUATION,
  ANUAL_EVALUATION,
} from "../constants/dashboardConstants";

import axios from "axios";
import { defaultApi } from "src/publicUrl";

export const getMainNumbers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NUMBERS.GET_DATA,
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
      `${defaultApi}/api/getMainNumbers/`,
      config
    );

    dispatch({
      type: NUMBERS.DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NUMBERS.DATA_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getRangeEvaluation = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RANGE_EVALUATION.GET_EVALUATIONS_RANGE,
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
      `${defaultApi}/api/getRangeOfMelyaEvaluations/`,
      config
    );

    dispatch({
      type: RANGE_EVALUATION.EVALUATIONS_RANGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RANGE_EVALUATION.EVALUATIONS_RANGE_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAnualRangeEvaluation = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANUAL_EVALUATION.GET_EVALUATIONS_RANGE,
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
      `${defaultApi}/api/getRangeOfAnualEvaluations/`,
      config
    );

    dispatch({
      type: ANUAL_EVALUATION.EVALUATIONS_RANGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANUAL_EVALUATION.EVALUATIONS_RANGE_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
