import {
  ANUAL_EVALUATION_LIST_REQUEST,
  ANUAL_EVALUATION_LIST_SUCCESS,
  ANUAL_EVALUATION_LIST_ERROR,
  ANUAL_EVALUATION_LIST_RESET,
  ANUAL_EVALUATION_ADD_REQUEST,
  ANUAL_EVALUATION_ADD_SUCCESS,
  ANUAL_EVALUATION_ADD_ERROR,
  ANUAL_EVALUATION_ADD_RESET,
  ANUAL_EVALUATION_DETAILS_REQUEST,
  ANUAL_EVALUATION_DETAILS_SUCCESS,
  ANUAL_EVALUATION_DETAILS_ERROR,
  ANUAL_EVALUATION_DETAILS_RESET,
  ANUAL_EVALUATION_EDIT_REQUEST,
  ANUAL_EVALUATION_EDIT_SUCCESS,
  ANUAL_EVALUATION_EDIT_ERROR,
  ANUAL_EVALUATION_EDIT_RESET,
} from "../constants/anualEvaluationConstants";

export const anualEvaluationsListReducer = (
  state = { anualEvaluations: [] },
  action
) => {
  switch (action.type) {
    case ANUAL_EVALUATION_LIST_REQUEST:
      return { loading: true };

    case ANUAL_EVALUATION_LIST_SUCCESS:
      return { loading: false, anualEvaluations: action.payload };

    case ANUAL_EVALUATION_LIST_ERROR:
      return { loading: false, error: action.payload };

    case ANUAL_EVALUATION_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const anualEvaluationsAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ANUAL_EVALUATION_ADD_REQUEST:
      return { loading: true };

    case ANUAL_EVALUATION_ADD_SUCCESS:
      return { loading: false, success: true };

    case ANUAL_EVALUATION_ADD_ERROR:
      return { loading: false, error: action.payload };

    case ANUAL_EVALUATION_ADD_RESET:
      return {};

    default:
      return state;
  }
};

export const anualEvaluationsDetailsReducer = (
  state = { anualEvaluation: {} },
  action
) => {
  switch (action.type) {
    case ANUAL_EVALUATION_DETAILS_REQUEST:
      return { loading: true };

    case ANUAL_EVALUATION_DETAILS_SUCCESS:
      return { loading: false, anualEvaluation: action.payload };

    case ANUAL_EVALUATION_DETAILS_ERROR:
      return { loading: false, error: action.payload };

    case ANUAL_EVALUATION_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const anualEvaluationsEditReducer = (state = {}, action) => {
  switch (action.type) {
    case ANUAL_EVALUATION_EDIT_REQUEST:
      return { loading: true };

    case ANUAL_EVALUATION_EDIT_SUCCESS:
      return { loading: false, success: true };

    case ANUAL_EVALUATION_EDIT_ERROR:
      return { loading: false, error: action.payload };

    case ANUAL_EVALUATION_EDIT_RESET:
      return {};

    default:
      return state;
  }
};
