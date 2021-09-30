import { NUMBERS } from "../constants/dashboardConstants";

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
