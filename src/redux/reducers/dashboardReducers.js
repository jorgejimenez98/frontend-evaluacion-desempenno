import {
  NUMBERS,
  RANGE_EVALUATION,
  ANUAL_EVALUATION,
  TABLE_EVALUAIIONS,
} from "../constants/dashboardConstants";

export const numbersReducers = (
  state = { users: 0, salePlans: 0, salePlaces: 0, families: 0 },
  action
) => {
  switch (action.type) {
    case NUMBERS.GET_DATA:
      return { loading: true };

    case NUMBERS.DATA_SUCCESS:
      const data = action.payload;
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
      return { users: 0, salePlans: 0, salePlaces: 0, families: 0 };

    default:
      return state;
  }
};

export const evaluationRangeReducer = (
  state = { evaluationRange: { veryGood: 0, good: 0, regular: 0, bad: 0 } },
  action
) => {
  switch (action.type) {
    case RANGE_EVALUATION.GET_EVALUATIONS_RANGE:
      return { loading: true };

    case RANGE_EVALUATION.EVALUATIONS_RANGE_SUCCESS:
      const data = action.payload;
      return {
        loading: false,
        evaluationRange: {
          veryGood: data.veryGood,
          good: data.good,
          regular: data.regular,
          bad: data.bad,
        },
      };

    case RANGE_EVALUATION.EVALUATIONS_RANGE_ERROR:
      return { loading: false, error: action.payload };

    case RANGE_EVALUATION.EVALUATIONS_RANGE_RESET:
      return { evaluationRange: { veryGood: 0, good: 0, regular: 0, bad: 0 } };

    default:
      return state;
  }
};

export const evaluationAnualRangeReducer = (
  state = { evaluationRange: { veryGood: 0, good: 0, bad: 0 } },
  action
) => {
  switch (action.type) {
    case ANUAL_EVALUATION.GET_EVALUATIONS_RANGE:
      return { loading: true };

    case ANUAL_EVALUATION.EVALUATIONS_RANGE_SUCCESS:
      const data = action.payload;
      return {
        loading: false,
        evaluationRange: {
          veryGood: data.veryGood,
          good: data.good,
          bad: data.bad,
        },
      };

    case ANUAL_EVALUATION.EVALUATIONS_RANGE_ERROR:
      return { loading: false, error: action.payload };

    case ANUAL_EVALUATION.EVALUATIONS_RANGE_RESET:
      return { evaluationRange: { veryGood: 0, good: 0, bad: 0 } };

    default:
      return state;
  }
};

export const evaluationTableReducer = (state = { evaluations: [] }, action) => {
  switch (action.type) {
    case TABLE_EVALUAIIONS.GET:
      return { loading: true };

    case TABLE_EVALUAIIONS.SUCCESS:
      const data = action.payload;
      return { evaluations: data };

    case TABLE_EVALUAIIONS.ERROR:
      return { loading: false, error: action.payload };

    case TABLE_EVALUAIIONS.RESET:
      return { evaluations: [] };

    default:
      return state;
  }
};
