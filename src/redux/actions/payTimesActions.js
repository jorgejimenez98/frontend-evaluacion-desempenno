import {
  PAYTIMES_LIST_REQUEST,
  PAYTIMES_LIST_SUCCESS,
  PAYTIMES_LIST_ERROR,
  PAYTIMES_ZUN_LIST_REQUEST,
  PAYTIMES_ZUN_LIST_SUCCESS,
  PAYTIMES_ZUN_LIST_ERROR,
  PAYTIMES_DELETE_REQUEST,
  PAYTIMES_DELETE_SUCCESS,
  PAYTIMES_DELETE_ERROR,
  PAYTIMES_IMPORT_REQUEST,
  PAYTIMES_IMPORT_SUCCESS,
  PAYTIMES_IMPORT_ERROR,
  PAYTIMES_SINCRO_REQUEST,
  PAYTIMES_SINCRO_SUCCESS,
  PAYTIMES_SINCRO_ERROR,
  PAYTIMES_REBUILD_REQUEST,
  PAYTIMES_REBUILD_SUCCESS,
  PAYTIMES_REBUILD_ERROR,
  PAYTIMES_DETAILS_REQUEST,
  PAYTIMES_DETAILS_SUCCESS,
  PAYTIMES_DETAILS_ERROR,
} from "../constants/payTimesConstants";
import axios from "axios";
import { defaultApi, hotelMeliaServerApi } from "src/publicUrl";

export const getPayTimesList = (allow = "") => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYTIMES_LIST_REQUEST,
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

    const { data } = await axios.get(`${defaultApi}/api/payTimes/${allow}`, config);

    dispatch({
      type: PAYTIMES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYTIMES_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPayTimesZunList = () => async (dispatch) => {
  try {
    dispatch({
      type: PAYTIMES_ZUN_LIST_REQUEST,
    });

    const { data } = await axios.get(
      `${hotelMeliaServerApi}/zunpr/periodosDePago/`
    );

    dispatch({
      type: PAYTIMES_ZUN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYTIMES_ZUN_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteSelectedPayTimes = (items) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYTIMES_DELETE_REQUEST,
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

    await axios.post(
      `${defaultApi}/api/payTimes/deleteSelectedItems/`,
      items,
      config
    );

    dispatch({
      type: PAYTIMES_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PAYTIMES_DELETE_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const importSelectedPayTimes = (items) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYTIMES_IMPORT_REQUEST,
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

    await axios.post(
      `${defaultApi}/api/payTimes/importSelectedItems/`,
      items,
      config
    );

    dispatch({
      type: PAYTIMES_IMPORT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PAYTIMES_IMPORT_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const sincronizePayTimes = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYTIMES_SINCRO_REQUEST,
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

    const url = `${hotelMeliaServerApi}/zunpr/periodosDePago/sincronizeItems/`;
    const newData = await axios.post(url, data, config);

    dispatch({
      type: PAYTIMES_SINCRO_SUCCESS,
      payload: newData.data,
    });
  } catch (error) {
    dispatch({
      type: PAYTIMES_SINCRO_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const rebuildPayTimes = (items) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYTIMES_REBUILD_REQUEST,
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

    await axios.post(`${defaultApi}/api/payTimes/rebuildList/`, items, config);

    dispatch({
      type: PAYTIMES_REBUILD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PAYTIMES_REBUILD_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPayTimeDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYTIMES_DETAILS_REQUEST,
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

    const { data } = await axios.get(`${defaultApi}/api/payTimes/${id}/`, config);

    dispatch({
      type: PAYTIMES_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYTIMES_DETAILS_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};