import { INCIDENTS } from "../constants/incidentsConstants";

export const incidentsReducers = (state = { data: {} }, action) => {
  switch (action.type) {
    case INCIDENTS.INCIDENTS_REQUEST:
      return { loading: true };

    case INCIDENTS.INCIDENTS_SUCCESS:
      return { loading: false, data: action.payload };

    case INCIDENTS.INCIDENTS_ERROR:
      return { loading: false, error: action.payload };

    case INCIDENTS.INCIDENTS_RESET:
      return {};

    default:
      return state;
  }
};
