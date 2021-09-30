import {
  NUMBERS,
  RANGE_EVALUATION,
  ANUAL_EVALUATION,
} from "../constants/dashboardConstants";

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

export const evaluationRangeReducer = (
  state = { evaluationRange: [] },
  action
) => {
  switch (action.type) {
    case RANGE_EVALUATION.GET_EVALUATIONS_RANGE:
      return { loading: true };

    case RANGE_EVALUATION.EVALUATIONS_RANGE_SUCCESS:
      const data = JSON.parse(action.payload[1]);
      return {
        loading: false,
        evaluationRange: data,
      };

    case RANGE_EVALUATION.EVALUATIONS_RANGE_ERROR:
      return { loading: false, error: action.payload };

    case RANGE_EVALUATION.EVALUATIONS_RANGE_RESET:
      return {};

    default:
      return state;
  }
};

export const evaluationAnualRangeReducer = (
  state = { evaluationRange: [] },
  action
) => {
  switch (action.type) {
    case ANUAL_EVALUATION.GET_EVALUATIONS_RANGE:
      return { loading: true };

    case ANUAL_EVALUATION.EVALUATIONS_RANGE_SUCCESS:
      const data = JSON.parse(action.payload[1]);
      return {
        loading: false,
        evaluationRange: data,
      };

    case ANUAL_EVALUATION.EVALUATIONS_RANGE_ERROR:
      return { loading: false, error: action.payload };

    case ANUAL_EVALUATION.EVALUATIONS_RANGE_RESET:
      return {};

    default:
      return state;
  }
};
