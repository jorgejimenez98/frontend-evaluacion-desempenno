import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PASSWORD_REQUEST,
  USER_UPDATE_PASSWORD_SUCCESS,
  USER_UPDATE_PASSWORD_FAIL,
  USER_EDIT_UPDATE_PASSWORD_REQUEST,
  USER_EDIT_UPDATE_PASSWORD_SUCCESS,
  USER_EDIT_UPDATE_PASSWORD_FAIL,
} from "../constants/userConstants";
import { HOTEL_LIST_RESET } from "../constants/hotelConstants";
import {
  FAMILY_LIST_FROM_ZUNPOS_RESET,
  FAMILY_LIST_RESET,
} from "../constants/familyConstants";
import {
  SELL_AREA_LIST_FROM_ZUNPOS_RESET,
  SELL_AREA_LIST_RESET,
} from "../constants/sellAreaConstants";
import {
  CATEGORY_LIST_RESET,
  CATEGORY_SINCRO_RESET,
} from "../constants/categoryConstants";
import {
  CHARGE_LIST_RESET,
  CHARGE_LIST_ZUNPR_RESET,
} from "../constants/chargeConstants";
import {
  COIN_LIST_FROM_PMS_RESET,
  COIN_LIST_RESET,
} from "../constants/coinConstants";
import {
  OPERATOR_LIST_RESET,
  WORKER_LIST_FROM_ZUNPR_RESET,
  WORKER_LIST_RESET,
} from "../constants/workerConstants";
import { ANUAL_SALE_PLAN_LIST_RESET } from "../constants/anuaSalePlanConstants";
import { MONTHLY_SALE_PLAN_LIST_RESET } from "../constants/monthlySalePlanConstants";
import { defaultApi } from "../../publicUrl";
import axios from "axios";
import {
  PAYTIMES_LIST_RESET,
  PAYTIMES_SINCRO_RESET,
  PAYTIMES_ZUN_LIST_RESET,
} from "../constants/payTimesConstants";
import {
  MONTHLY_MELIA_EVALUATION_DETAILS_RESET,
  MONTHLY_MELIA_EVALUATION_RESUME_RESET,
  WORKER_MONTHLY_EVALUATION_DETAILS_RESET,
  WORKER_MONTHLY_EVALUATION_LIST_RESET,
} from "../constants/monthlyEvaluationConstants";
import { ANUAL_EVALUATION_LIST_RESET } from "../constants/anualEvaluationConstants";

export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: FAMILY_LIST_RESET });
  dispatch({ type: FAMILY_LIST_FROM_ZUNPOS_RESET });
  dispatch({ type: HOTEL_LIST_RESET });
  dispatch({ type: SELL_AREA_LIST_FROM_ZUNPOS_RESET });
  dispatch({ type: SELL_AREA_LIST_RESET });
  dispatch({ type: CATEGORY_LIST_RESET });
  dispatch({ type: CATEGORY_SINCRO_RESET });
  dispatch({ type: CHARGE_LIST_RESET });
  dispatch({ type: CHARGE_LIST_ZUNPR_RESET });
  dispatch({ type: COIN_LIST_RESET });
  dispatch({ type: COIN_LIST_FROM_PMS_RESET });
  dispatch({ type: OPERATOR_LIST_RESET });
  dispatch({ type: WORKER_LIST_RESET });
  dispatch({ type: WORKER_LIST_FROM_ZUNPR_RESET });
  dispatch({ type: ANUAL_SALE_PLAN_LIST_RESET });
  dispatch({ type: MONTHLY_SALE_PLAN_LIST_RESET });
  dispatch({ type: PAYTIMES_LIST_RESET });
  dispatch({ type: PAYTIMES_ZUN_LIST_RESET });
  dispatch({ type: PAYTIMES_SINCRO_RESET });
  dispatch({ type: WORKER_MONTHLY_EVALUATION_LIST_RESET });
  dispatch({ type: WORKER_MONTHLY_EVALUATION_DETAILS_RESET });
  dispatch({ type: MONTHLY_MELIA_EVALUATION_DETAILS_RESET });
  dispatch({ type: MONTHLY_MELIA_EVALUATION_RESUME_RESET });
  dispatch({ type: ANUAL_EVALUATION_LIST_RESET });
  localStorage.removeItem("userInfo");
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${defaultApi}/api/users/login/`,
      { username: email, password: password },
      config
    );

    if (data.detail) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: data.detail,
      });
    } else {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
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

    const { data } = await axios.get(`${defaultApi}/api/users/`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteUsers = (users) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
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

    await axios.post(`${defaultApi}/api/users/deleteUsers/`, users, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createUser = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    await axios.post(`${defaultApi}/api/users/`, data, config);

    dispatch({
      type: USER_CREATE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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

    const url =
      id === "profile"
        ? `${defaultApi}/api/users/profile/`
        : `${defaultApi}/api/users/${id}/`;
    const { data } = await axios.get(url, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUser = (id, newUser) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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

    const url =
      id === "profile"
        ? `${defaultApi}/api/users/profile/update/`
        : `${defaultApi}/api/users/${id}/`;
    const { data } = await axios.put(url, newUser, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });

    if (id === "profile") {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUserPassword = (password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PASSWORD_REQUEST,
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

    const url = `${defaultApi}/api/users/changePassword/profile/`;
    const { data } = await axios.put(url, password, config);

    dispatch({
      type: USER_UPDATE_PASSWORD_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editUupdateUserPassword =
  (userId, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_EDIT_UPDATE_PASSWORD_REQUEST,
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

      const url = `${defaultApi}/api/users/${userId}/changePassword/`;
      const { data } = await axios.put(url, { password }, config);

      dispatch({
        type: USER_EDIT_UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_EDIT_UPDATE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
