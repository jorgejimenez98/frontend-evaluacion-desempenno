import {
  SET_OPERATOR_REQUEST,
  SET_OPERATOR_SUCCESS,
  SET_OPERATOR_ERROR,
  OPERATOR_LIST_REQUEST,
  OPERATOR_LIST_SUCCESS,
  OPERATOR_LIST_ERROR,
  OPERATOR_DELETE_REQUEST,
  OPERATOR_DELETE_SUCCESS,
  OPERATOR_DELETE_ERROR,
  WORKER_LIST_REQUEST,
  WORKER_LIST_SUCCESS,
  WORKER_LIST_ERROR,
  WORKER_DELETE_REQUEST,
  WORKER_DELETE_SUCCESS,
  WORKER_DELETE_ERROR,
  WORKER_LIST_FROM_ZUNPR_REQUEST,
  WORKER_LIST_FROM_ZUNPR_SUCCESS,
  WORKER_LIST_FROM_ZUNPR_ERROR,
  WORKER_IMPORT_FROM_ZUNPR_REQUEST,
  WORKER_IMPORT_FROM_ZUNPR_SUCCESS,
  WORKER_IMPORT_FROM_ZUNPR_ERROR,
  WORKER_SINCRO_REQUEST,
  WORKER_SINCRO_SUCCESS,
  WORKER_SINCRO_ERROR,
  WORKER_REBUILD_REQUEST,
  WORKER_REBUILD_SUCCESS,
  WORKER_REBUILD_ERROR,
  WORKER_DETAILS_REQUEST,
  WORKER_DETAILS_SUCCESS,
  WORKER_DETAILS_ERROR,
  WORKER_EVALUATOR_DETAILS_REQUEST,
  WORKER_EVALUATOR_DETAILS_SUCCESS,
  WORKER_EVALUATOR_DETAILS_ERROR,
} from "../constants/workerConstants";
import axios from "axios";
import { defaultApi, hotelMeliaServerApi } from "src/publicUrl";

export const deleteOperatorToWorker = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OPERATOR_DELETE_REQUEST,
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

    const url = `${defaultApi}/api/workers/deleteOperator/`;
    await axios.post(url, data, config);

    dispatch({
      type: OPERATOR_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: OPERATOR_DELETE_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const setOperatorToWorker = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_OPERATOR_REQUEST,
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

    const url = `${defaultApi}/api/workers/setOperator/`;
    await axios.post(url, data, config);

    dispatch({
      type: SET_OPERATOR_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SET_OPERATOR_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getOperatorList = () => async (dispatch) => {
  try {
    dispatch({
      type: OPERATOR_LIST_REQUEST,
    });

    const url = `${hotelMeliaServerApi}/IHSecurity/operadores/`;
    const { data } = await axios.get(url);

    dispatch({
      type: OPERATOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OPERATOR_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getWorkerList = (hotelId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKER_LIST_REQUEST,
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

    const url = `${defaultApi}/api/workers/getWorkersByHotel/`;
    const { data } = await axios.post(url, hotelId, config);

    dispatch({
      type: WORKER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKER_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getWorkerListFromZunPR = (hotelId) => async (dispatch) => {
  try {
    dispatch({
      type: WORKER_LIST_FROM_ZUNPR_REQUEST,
    });

    const url = `${hotelMeliaServerApi}/zunpr/empleados/obtenerTrabajadoresPorHotel/`;
    const { data } = await axios.post(url, hotelId);

    dispatch({
      type: WORKER_LIST_FROM_ZUNPR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKER_LIST_FROM_ZUNPR_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const importWorkerList = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKER_IMPORT_FROM_ZUNPR_REQUEST,
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

    const url = `${defaultApi}/api/workers/importWorkers/`;
    const { data } = await axios.post(url, values, config);

    dispatch({
      type: WORKER_IMPORT_FROM_ZUNPR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKER_IMPORT_FROM_ZUNPR_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteWorkers = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKER_DELETE_REQUEST,
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

    const url = `${defaultApi}/api/workers/deleteWorkers/`;
    await axios.post(url, values, config);

    dispatch({
      type: WORKER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: WORKER_DELETE_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const sincronizeWorkers = (data) => async (dispatch) => {
  try {
    dispatch({
      type: WORKER_SINCRO_REQUEST,
    });

    const url = `${hotelMeliaServerApi}/zunpr/empleados/sincronizarEmpleados/`;
    const newData = await axios.post(url, data);

    dispatch({
      type: WORKER_SINCRO_SUCCESS,
      payload: newData.data,
    });
  } catch (error) {
    dispatch({
      type: WORKER_SINCRO_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const rebuildWorkersList = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKER_REBUILD_REQUEST,
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

    const url = `${defaultApi}/api/workers/rebuildList/`;
    await axios.post(url, data, config);

    dispatch({
      type: WORKER_REBUILD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: WORKER_REBUILD_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getWorkerDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKER_DETAILS_REQUEST,
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

    const url = `${defaultApi}/api/workers/${id}/`;
    const { data } = await axios.get(url, config);

    dispatch({
      type: WORKER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKER_DETAILS_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getEvaluatorDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKER_EVALUATOR_DETAILS_REQUEST,
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

    const url = `${defaultApi}/api/workers/getEvaluatorDetails/`;
    const { data } = await axios.get(url, config);

    dispatch({
      type: WORKER_EVALUATOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKER_EVALUATOR_DETAILS_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
