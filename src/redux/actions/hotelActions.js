import {
  HOTEL_LIST_REQUEST,
  HOTEL_LIST_SUCCESS,
  HOTEL_LIST_FAIL,
  HOTEL_ADD_REQUEST,
  HOTEL_ADD_SUCCESS,
  HOTEL_ADD_FAIL,
  HOTEL_DELETE_REQUEST,
  HOTEL_DELETE_SUCCESS,
  HOTEL_DELETE_FAIL,
  HOTEL_DETAILS_REQUEST,
  HOTEL_DETAILS_SUCCESS,
  HOTEL_DETAILS_FAIL,
  HOTEL_EDIT_REQUEST,
  HOTEL_EDIT_SUCCESS,
  HOTEL_EDIT_FAIL,
} from "../constants/hotelConstants";
import { defaultApi } from "../../publicUrl";
import axios from "axios";

export const getHotelList = (allowAccess) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOTEL_LIST_REQUEST,
    });

    if (allowAccess) {
      const { data } = await axios.get(`${defaultApi}/api/hotels/allow/`);
      console.log('Data', data);
      dispatch({
        type: HOTEL_LIST_SUCCESS,
        payload: data,
      });
    } else {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${defaultApi}/api/hotels/`, config);

      dispatch({
        type: HOTEL_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: HOTEL_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addHotel = (hotel) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOTEL_ADD_REQUEST,
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

    await axios.post(`${defaultApi}/api/hotels/`, hotel, config);

    dispatch({
      type: HOTEL_ADD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: HOTEL_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteHotels = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOTEL_DELETE_REQUEST,
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

    await axios.post(`${defaultApi}/api/hotels/deleteHotels/`, values, config);

    dispatch({
      type: HOTEL_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: HOTEL_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getHotelDetails =
  (id, allowAccess) => async (dispatch, getState) => {
    try {
      dispatch({
        type: HOTEL_DETAILS_REQUEST,
      });

      if (allowAccess) {
        const { data } = await axios.get(
          `${defaultApi}/api/hotels/allow/${id}/`
        );
        dispatch({
          type: HOTEL_DETAILS_SUCCESS,
          payload: data,
        });
      } else {
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
          `${defaultApi}/api/hotels/${id}/`,
          config
        );

        dispatch({
          type: HOTEL_DETAILS_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: HOTEL_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const editHotel = (id, values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOTEL_EDIT_REQUEST,
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

    const { data } = await axios.put(
      `${defaultApi}/api/hotels/${id}/`,
      values,
      config
    );

    dispatch({
      type: HOTEL_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOTEL_EDIT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
