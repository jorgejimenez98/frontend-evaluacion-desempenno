import {
  WORKER_MONTHLY_EVALUATION_LIST_REQUEST,
  WORKER_MONTHLY_EVALUATION_LIST_SUCCESS,
  WORKER_MONTHLY_EVALUATION_LIST_ERROR,
  WORKER_MONTHLY_EVALUATION_LIST_RESET,
  WORKER_MONTHLY_EVALUATION_ADD_REQUEST,
  WORKER_MONTHLY_EVALUATION_ADD_SUCCESS,
  WORKER_MONTHLY_EVALUATION_ADD_ERROR,
  WORKER_MONTHLY_EVALUATION_ADD_RESET,
  WORKER_MONTHLY_EVALUATION_DETAILS_REQUEST,
  WORKER_MONTHLY_EVALUATION_DETAILS_SUCCESS,
  WORKER_MONTHLY_EVALUATION_DETAILS_ERROR,
  WORKER_MONTHLY_EVALUATION_DETAILS_RESET,
  WORKER_MONTHLY_EVALUATION_EDIT_REQUEST,
  WORKER_MONTHLY_EVALUATION_EDIT_SUCCESS,
  WORKER_MONTHLY_EVALUATION_EDIT_ERROR,
  WORKER_MONTHLY_EVALUATION_EDIT_RESET,
  MONTHLY_MELIA_EVALUATION_ADD_REQUEST,
  MONTHLY_MELIA_EVALUATION_ADD_SUCCESS,
  MONTHLY_MELIA_EVALUATION_ADD_ERROR,
  MONTHLY_MELIA_EVALUATION_ADD_RESET,
  MONTHLY_MELIA_EVALUATION_DETAILS_REQUEST,
  MONTHLY_MELIA_EVALUATION_DETAILS_SUCCESS,
  MONTHLY_MELIA_EVALUATION_DETAILS_ERROR,
  MONTHLY_MELIA_EVALUATION_DETAILS_RESET,
  MONTHLY_MELIA_EVALUATION_EDIT_REQUEST,
  MONTHLY_MELIA_EVALUATION_EDIT_SUCCESS,
  MONTHLY_MELIA_EVALUATION_EDIT_ERROR,
  MONTHLY_MELIA_EVALUATION_EDIT_RESET,
  MONTHLY_MELIA_EVALUATION_RESUME_REQUEST,
  MONTHLY_MELIA_EVALUATION_RESUME_SUCCESS,
  MONTHLY_MELIA_EVALUATION_RESUME_ERROR,
  MONTHLY_MELIA_EVALUATION_RESUME_RESET,
} from "../constants/monthlyEvaluationConstants";

export const monthlyEvaluationsReducers = (
  state = { evaluations: [] },
  action
) => {
  switch (action.type) {
    case WORKER_MONTHLY_EVALUATION_LIST_REQUEST:
      return { loading: true };

    case WORKER_MONTHLY_EVALUATION_LIST_SUCCESS:
      return { loading: false, evaluations: action.payload };

    case WORKER_MONTHLY_EVALUATION_LIST_ERROR:
      return { loading: false, error: action.payload };

    case WORKER_MONTHLY_EVALUATION_LIST_RESET:
      return {};

    default:
      return state;
  }
};

export const monthlyEvaluationAddReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKER_MONTHLY_EVALUATION_ADD_REQUEST:
      return { loading: true };

    case WORKER_MONTHLY_EVALUATION_ADD_SUCCESS:
      return { loading: false, success: true };

    case WORKER_MONTHLY_EVALUATION_ADD_ERROR:
      return { loading: false, error: action.payload };

    case WORKER_MONTHLY_EVALUATION_ADD_RESET:
      return {};

    default:
      return state;
  }
};

export const monthlyEvaluationDetailsReducer = (
  state = {
    monthlyGastronomyEvaluation: {},
  },
  action
) => {
  switch (action.type) {
    case WORKER_MONTHLY_EVALUATION_DETAILS_REQUEST:
      return { loading: true };

    case WORKER_MONTHLY_EVALUATION_DETAILS_SUCCESS:
      return { loading: false, monthlyGastronomyEvaluation: action.payload };

    case WORKER_MONTHLY_EVALUATION_DETAILS_ERROR:
      return { loading: false, error: action.payload };

    case WORKER_MONTHLY_EVALUATION_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const monthlyEvaluationEditReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKER_MONTHLY_EVALUATION_EDIT_REQUEST:
      return { loading: true };

    case WORKER_MONTHLY_EVALUATION_EDIT_SUCCESS:
      return { loading: false, success: true };

    case WORKER_MONTHLY_EVALUATION_EDIT_ERROR:
      return { loading: false, error: action.payload };

    case WORKER_MONTHLY_EVALUATION_EDIT_RESET:
      return {};

    default:
      return state;
  }
};

export const monthlyMeliaEvaluationAddReducer = (state = {}, action) => {
  switch (action.type) {
    case MONTHLY_MELIA_EVALUATION_ADD_REQUEST:
      return { loading: true };

    case MONTHLY_MELIA_EVALUATION_ADD_SUCCESS:
      return { loading: false, success: true };

    case MONTHLY_MELIA_EVALUATION_ADD_ERROR:
      return { loading: false, error: action.payload };

    case MONTHLY_MELIA_EVALUATION_ADD_RESET:
      return {};

    default:
      return state;
  }
};

export const monthlyMeliaEvaluationDetailsReducer = (
  state = {
    monthlyMeliaEvaluation: {},
  },
  action
) => {
  switch (action.type) {
    case MONTHLY_MELIA_EVALUATION_DETAILS_REQUEST:
      return { loading: true };

    case MONTHLY_MELIA_EVALUATION_DETAILS_SUCCESS:
      return { loading: false, monthlyMeliaEvaluation: action.payload };

    case MONTHLY_MELIA_EVALUATION_DETAILS_ERROR:
      return { loading: false, error: action.payload };

    case MONTHLY_MELIA_EVALUATION_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const monthlyMeliaEvaluationEditReducer = (state = {}, action) => {
  switch (action.type) {
    case MONTHLY_MELIA_EVALUATION_EDIT_REQUEST:
      return { loading: true };

    case MONTHLY_MELIA_EVALUATION_EDIT_SUCCESS:
      return { loading: false, success: true };

    case MONTHLY_MELIA_EVALUATION_EDIT_ERROR:
      return { loading: false, error: action.payload };

    case MONTHLY_MELIA_EVALUATION_EDIT_RESET:
      return {};

    default:
      return state;
  }
};

export const monthlyMeliaEvaluationResumeReducer = (
  state = { evaluations: [] },
  action
) => {
  switch (action.type) {
    case MONTHLY_MELIA_EVALUATION_RESUME_REQUEST:
      return { loading: true };

    case MONTHLY_MELIA_EVALUATION_RESUME_SUCCESS:
      return { loading: false, evaluations: action.payload };

    case MONTHLY_MELIA_EVALUATION_RESUME_ERROR:
      return { loading: false, error: action.payload };

    case MONTHLY_MELIA_EVALUATION_RESUME_RESET:
      return {};

    default:
      return state;
  }
};
