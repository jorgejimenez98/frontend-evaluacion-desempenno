import { NUMBERS } from "../constants/dashboardConstants";

export const numbersReducers = (
  state = { users: 0, salePlans: 0, salePlaces: 0, families: 0 },
  action
) => {
  switch (action.type) {
    case NUMBERS.GET_DATA:
      return { loading: true };

    case NUMBERS.DATA_SUCCESS:
      const data = JSON.parse(action.payload[1]);
      return {
        loading: false,
        users: data.users,
        salePlans: data.salePlans,
        salePlaces: data.salePlaces,
        families: data.families,
      };

    case NUMBERS.DATA_ERROR:
      return { loading: false, error: action.payload };

    case NUMBERS.DATA_RESET:
      return {};

    default:
      return state;
  }
};
