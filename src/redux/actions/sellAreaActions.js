import {
  SELL_AREA_LIST_REQUEST,
  SELL_AREA_LIST_SUCCESS,
  SELL_AREA_LIST_ERROR,
  SELL_AREA_LIST_FROM_ZUNPOS_REQUEST,
  SELL_AREA_LIST_FROM_ZUNPOS_SUCCESS,
  SELL_AREA_LIST_FROM_ZUNPOS_ERROR,
  SELL_AREA_UPDATE_REQUEST,
  SELL_AREA_UPDATE_SUCCESS,
  SELL_AREA_UPDATE_ERROR,
  SELL_AREA_DELETE_REQUEST,
  SELL_AREA_DELETE_SUCCESS,
  SELL_AREA_DELETE_ERROR,
  SELL_AREA_SINCRONIZE_REQUEST,
  SELL_AREA_SINCRONIZE_SUCCESS,
  SELL_AREA_SINCRONIZE_ERROR,
  SELL_AREA_REBUILD_LIST_REQUEST,
  SELL_AREA_REBUILD_LIST_SUCCESS,
  SELL_AREA_REBUILD_LIST_ERROR,
} from "../constants/sellAreaConstants";
import axios from "axios";
import { zunPos_Api, defaultApi } from "src/publicUrl";

export const getSellAreaList = (hotelId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SELL_AREA_LIST_REQUEST,
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

    const url = `${defaultApi}/api/puntoDeVentas/getSellAreasByHotel/`;
    const { data } = await axios.post(url, { hotelId }, config);

    dispatch({
      type: SELL_AREA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELL_AREA_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getSellAreaListFromZunPos = (pos_db_name) => async (dispatch) => {
  try {
    dispatch({
      type: SELL_AREA_LIST_FROM_ZUNPOS_REQUEST,
    });

    const url = `${zunPos_Api}/puntoDeVentas/getSellAreFromDB/`;
    const { data } = await axios.post(url, { pos_db_name });

    dispatch({
      type: SELL_AREA_LIST_FROM_ZUNPOS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SELL_AREA_LIST_FROM_ZUNPOS_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const importSellAreas =
  (sellAreas, hotelId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SELL_AREA_UPDATE_REQUEST,
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

      const url = `${defaultApi}/api/puntoDeVentas/importSellAreas/`;
      await axios.post(url, { sellAreas, hotelId }, config);

      dispatch({
        type: SELL_AREA_UPDATE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: SELL_AREA_UPDATE_ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteSelectedAreas = (items) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SELL_AREA_DELETE_REQUEST,
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

    const url = `${defaultApi}/api/puntoDeVentas/deleteSelectedAreas/`;
    await axios.post(url, { items }, config);

    dispatch({
      type: SELL_AREA_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SELL_AREA_DELETE_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const sincronizeSellAreas = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SELL_AREA_SINCRONIZE_REQUEST,
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

    const url = `${zunPos_Api}/puntoDeVentas/sincronizeSellAreas/`;
    const newData = await axios.post(url, data, config);

    dispatch({
      type: SELL_AREA_SINCRONIZE_SUCCESS,
      payload: newData.data,
    });
  } catch (error) {
    dispatch({
      type: SELL_AREA_SINCRONIZE_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const rebuildSellAreaList = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SELL_AREA_REBUILD_LIST_REQUEST,
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

    const url = `${defaultApi}/api/puntoDeVentas/rebuildSellAreaList/`;
    const newData = await axios.post(url, data, config);

    dispatch({
      type: SELL_AREA_REBUILD_LIST_SUCCESS,
      payload: newData.data,
    });
  } catch (error) {
    dispatch({
      type: SELL_AREA_REBUILD_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
