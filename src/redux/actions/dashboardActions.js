import { NUMBERS } from "../constants/dashboardConstants";

import axios from "axios";
import { defaultApi } from "src/publicUrl";

export const getMainNumbers = () => async (dispatch) => {
  try {
    dispatch({
      type: NUMBERS.GET_DATA,
    });

    const { data } = await axios.get(
      `${defaultApi}/api/getMainNumbers/`,
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
