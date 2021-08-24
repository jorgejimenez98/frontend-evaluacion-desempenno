import {
  CHARGE_LIST_REQUEST,
  CHARGE_LIST_SUCCESS,
  CHARGE_LIST_ERROR,
  CHARGE_LIST_ZUNPR_REQUEST,
  CHARGE_LIST_ZUNPR_SUCCESS,
  CHARGE_LIST_ZUNPR_ERROR,
  CHARGE_LIST_REBUILD_REQUEST,
  CHARGE_LIST_REBUILD_SUCCESS,
  CHARGE_LIST_REBUILD_ERROR,
} from "../constants/chargeConstants";
import axios from "axios";
import { defaultApi, hotelMeliaServerApi } from "src/publicUrl";


export const getChargesList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHARGE_LIST_REQUEST,
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

    const { data } = await axios.get(`${defaultApi}/api/charges/`, config);

    dispatch({
      type: CHARGE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHARGE_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getChargeListFromZunPr = () => async (dispatch) => {
  try {
    dispatch({
      type: CHARGE_LIST_ZUNPR_REQUEST,
    });

    const { data } = await axios.get(
      `${hotelMeliaServerApi}/zunpr/cargos/`
    );

    dispatch({
      type: CHARGE_LIST_ZUNPR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHARGE_LIST_ZUNPR_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const rebuildChargeList = (newData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHARGE_LIST_REBUILD_REQUEST,
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
      `${defaultApi}/api/charges/rebuildList/`,
      newData,
      config
    );

    dispatch({
      type: CHARGE_LIST_REBUILD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHARGE_LIST_REBUILD_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};