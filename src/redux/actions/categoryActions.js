import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_ERROR,
  CATEGORY_SINCRO_REQUEST,
  CATEGORY_SINCRO_SUCCESS,
  CATEGORY_SINCRO_ERROR,
  CATEGORY_REBUILD_LIST_REQUEST,
  CATEGORY_REBUILD_LIST_SUCCESS,
  CATEGORY_REBUILD_LIST_ERROR,
} from "../constants/categoryConstants";

import axios from "axios";
import { defaultApi, hotelMeliaServerApi } from "src/publicUrl";

export const getCategoryList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
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
      `${defaultApi}/api/ocuppationalCategories/`,
      config
    );

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const sincroCategoryList = () => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_SINCRO_REQUEST,
    });

    const { data } = await axios.get(
      `${hotelMeliaServerApi}/zunpr/categoriasOcupacionales/`
    );

    dispatch({
      type: CATEGORY_SINCRO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_SINCRO_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const rebuildCategoryList = (newData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_REBUILD_LIST_REQUEST,
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
      `${defaultApi}/api/ocuppationalCategories/rebuildList/`,
      newData,
      config
    );

    dispatch({
      type: CATEGORY_REBUILD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_REBUILD_LIST_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};