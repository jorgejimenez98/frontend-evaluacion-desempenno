import {
  COIN_LIST_REQUEST,
  COIN_LIST_SUCCESS,
  COIN_LIST_ERROR,
  GET_COIN_REQUEST,
  GET_COIN_SUCCESS,
  GET_COIN_ERROR,
  COIN_LIST_FROM_PMS_REQUEST,
  COIN_LIST_FROM_PMS_SUCCESS,
  COIN_LIST_FROM_PMS_ERROR,
  COIN_LIST_REBUILD_REQUEST,
  COIN_LIST_REBUILD_SUCCESS,
  COIN_LIST_REBUILD_ERROR,
} from "src/redux/constants/coinConstants";
import axios from "axios";
import { hotelMeliaServerApi, defaultApi } from "src/publicUrl";

export const getCoinList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COIN_LIST_REQUEST,
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
      `${defaultApi}/api/currency/getActiveCoins/`,
      config
    );

    dispatch({
      type: COIN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COIN_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getActiveCoin = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_COIN_REQUEST,
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
      `${defaultApi}/api/currency/getActiveCoin/`,
      config
    );

    dispatch({
      type: GET_COIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COIN_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getCoinListFromPms = () => async (dispatch) => {
  try {
    dispatch({
      type: COIN_LIST_FROM_PMS_REQUEST,
    });

    const { data } = await axios.get(`${hotelMeliaServerApi}/getActiveCoins/`);

    dispatch({
      type: COIN_LIST_FROM_PMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COIN_LIST_FROM_PMS_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const rebuilMyCoinList = (newData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COIN_LIST_REBUILD_REQUEST,
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
      `${defaultApi}/api/currency/rebuildCoins/`,
      newData,
      config
    );

    dispatch({
      type: COIN_LIST_REBUILD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: COIN_LIST_REBUILD_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
