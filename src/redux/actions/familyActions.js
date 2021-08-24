import {
  FAMILY_LIST_REQUEST,
  FAMILY_LIST_SUCCESS,
  FAMILY_LIST_ERROR,
  FAMILY_LIST_FROM_ZUNPOS_REQUEST,
  FAMILY_LIST_FROM_ZUNPOS_SUCCESS,
  FAMILY_LIST_FROM_ZUNPOS_ERROR,
  FAMILY_LIST_UPDATE_FROM_ZUNPOS_REQUEST,
  FAMILY_LIST_UPDATE_FROM_ZUNPOS_SUCCESS,
  FAMILY_LIST_UPDATE_FROM_ZUNPOS_ERROR,
  FAMILY_DELETE_REQUEST,
  FAMILY_DELETE_SUCCESS,
  FAMILY_DELETE_ERROR,
  FAMILY_SINCRONIZE_REQUEST,
  FAMILY_SINCRONIZE_SUCCESS,
  FAMILY_SINCRONIZE_ERROR,
} from "src/redux/constants/familyConstants";
import axios from "axios";
import { zunPos_Api, defaultApi } from "src/publicUrl";

export const getFamilyList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FAMILY_LIST_REQUEST,
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

    const url = `${defaultApi}/api/families/`;
    const { data } = await axios.get(url, config);

    dispatch({
      type: FAMILY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAMILY_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getFamilyListFromZunPos = () => async (dispatch) => {
  try {
    dispatch({
      type: FAMILY_LIST_FROM_ZUNPOS_REQUEST,
    });

    const { data } = await axios.get(`${zunPos_Api}/familia/`);

    dispatch({
      type: FAMILY_LIST_FROM_ZUNPOS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAMILY_LIST_FROM_ZUNPOS_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateFamilyListFromZunPos =
  (items) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FAMILY_LIST_UPDATE_FROM_ZUNPOS_REQUEST,
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
        `${defaultApi}/api/families/updateFamilies/`,
        items,
        config
      );

      dispatch({
        type: FAMILY_LIST_UPDATE_FROM_ZUNPOS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAMILY_LIST_UPDATE_FROM_ZUNPOS_ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteSelectedFamilies = (items) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FAMILY_DELETE_REQUEST,
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

    const url = `${defaultApi}/api/families/deleteSelectedFamilies/`;
    const { data } = await axios.post(url, items, config);

    dispatch({
      type: FAMILY_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAMILY_DELETE_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const sincronizeFamilies =
  (myFamilies, zunPosFamilies) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FAMILY_SINCRONIZE_REQUEST,
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

      const url = `${defaultApi}/api/families/sincronizeFamilies/`;
      const { data } = await axios.post(
        url,
        { myFamilies, zunPosFamilies },
        config
      );

      dispatch({
        type: FAMILY_SINCRONIZE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAMILY_SINCRONIZE_ERROR,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
