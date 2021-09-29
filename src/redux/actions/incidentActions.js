import { INCIDENTS } from "../constants/incidentsConstants";
import { hotelMeliaServerApi } from "../../publicUrl";
import axios from "axios";

export const getWorkerIncidents = (values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INCIDENTS.INCIDENTS_REQUEST,
    });

    const { data } = await axios.post(`${hotelMeliaServerApi}/zunpr/incidencias/`, {
      values,
    });
    dispatch({
      type: INCIDENTS.INCIDENTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: INCIDENTS.INCIDENTS_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
